// pages/housePublished/[housepublisedId].tsx
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import HouseDetails from "./_components/_components/HouseDetails";
import CopyPhoneNumber from "./_components/_components/CoppyPhone";
import HouseDescription from "./_components/_components/HouseDescription";
import HouseAttachments from "./_components/_components/HouseAttachments";


const HouseDetailPeddingPage = async ({ params }: { params: { adminId: string } }) => {
    const {adminId}= await params
  const house = await db.house.findUnique({
    where: {
      id: adminId,
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

      {/* Name and Category Section */}
      <div>
        <h1 className="text-3xl font-semibold">{house.name}</h1>
        <div className="text-xl text-gray-700">{house.category?.name}</div>
      </div>

      {/* House Details */}
      <HouseDetails house={house} />

      {/* Phone Number Section */}
      <CopyPhoneNumber phoneNumber={phoneNumber} />

      {/* House Description */}
      <HouseDescription description={house.description || ""} />

      {/* Attachments Section */}
      {house.attachments.length > 0 && (
        <HouseAttachments attachments={house.attachments} />
      )}
    </div>
  );
};

export default HouseDetailPeddingPage;
