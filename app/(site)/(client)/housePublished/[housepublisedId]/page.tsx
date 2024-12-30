import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import CopyPhoneNumber from "./_components/CoppyPhone";

const HouseDetailPage = async ({ params }: { params: { housepublisedId: string } }) => {
  const house = await db.house.findUnique({
    where: {
      id: params.housepublisedId,
      status: "APPROVED", // Only approved houses
    },
    include: {
      category: true, // Include category relation
      attachments: {
        orderBy: {
          createdAt: "desc", // Order attachments by created date
        },
      },
    },
  });

  if (!house) {
    return redirect("/"); // Redirect if no house found
  }
  const phoneNumber = house.phone || "None"; // Default phone number

  // Format the time of posting
  const postedDate = new Date(house.createdAt);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  // Truncate description if it's too long
  const truncateDescription = (description: string) => {
    if (description.length > 150) {
      return `${description.slice(0, 150)}...`; // Truncate at 150 characters
    }
    return description;
  };
  const handleCopyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    alert("Số điện thoại đã được sao chép!");
  };
  return (
    <div className="container mx-auto p-6 pt-[100px] pl-[100px] space-y-8 border"> 
      {/* Image Section */}
      <div>
        <Image
          src={house.imageURL || "/default-image.jpg"} 
          alt={house.name}
          width={600}
          height={600}
          className="w-100 h-96 object-cover rounded-md"
        />
      </div>

      {/* Name Section */}
      <div>
        <h1 className="text-3xl font-semibold">{house.name}</h1>
      </div>

      {/* Category Section */}
      <div className="text-xl text-gray-700">{house.category?.name}</div>

      {/* Price, Area, and Deposit Section */}
      <div className="flex items-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-rose-600">{formatPrice(house.rentalPrice!)} VNĐ</span>
          <span className="text-sm text-gray-500">/ tháng</span>
        </div>
        
        <div className="flex items-center gap-2">
          Tiền cọc<span className="text-xl font-bold">{formatPrice(house.depositPrice!)} VNĐ</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
          Diện tích<span className="text-xl font-bold">{house.roomArea} m²</span>
        </div>

      {/* Address Section */}
      <div className="flex items-center gap-2 mt-6">
        <FaMapMarkerAlt className="text-lg text-red-500" />
        <span className="text-lg">{house.address}</span>
      </div>

      {/* Time of Posting */}
      <div className="flex items-center gap-2 mt-4 text-gray-500">
        <FaClock className="text-lg" />
        <span>{timeAgo}</span>
      </div>

      {/* Features Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Đặc điểm nổi bật</h2>
        <table className="table-auto w-[600px] mt-4 border border-gray-300">
          <tbody>
            <tr className="border-t border-gray-300">
              <td className="px-4 py-2 font-semibold">Tình trạng nội thất</td>
              <td className="px-4 py-2">{house.category?.name}</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="px-4 py-2 font-semibold">Diện tích</td>
              <td className="px-4 py-2">{house.roomArea} m²</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="px-4 py-2 font-semibold">Tiền cho thuê</td>
              <td className="px-4 py-2">{formatPrice(house.rentalPrice!)} VNĐ</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Description Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Mô tả chi tiết</h2>
        <CopyPhoneNumber phoneNumber={phoneNumber} />

        <div className="mt-6">

      </div>
        <p className="text-lg">{truncateDescription(house.description || "")}</p>
        {house.description && house.description.length > 150 && (
          <button className="text-blue-500 mt-2">See More</button>
        )}
      </div>

      {/* Attachments Section */}
      {house.attachments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Attachments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {house.attachments.map((attachment) => (
              <div key={attachment.id} className="border p-4 rounded-md">
                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={attachment.url}
                    alt={attachment.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                </a>
                <p className="text-sm text-gray-700">{attachment.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseDetailPage;
