import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { formatPrice } from "@/lib/format";
import { formatDistanceToNow } from "date-fns";

interface HouseDetailsProps {
  house: any;
}

const HouseDetails = ({ house }: HouseDetailsProps) => {
  const postedDate = new Date(house.createdAt);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  const getGoogleMapsLink = (address: string) => {
    const encodedAddress = encodeURIComponent(address); // Encode address for use in URL
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  return (
    <div>
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
      <a
        href={getGoogleMapsLink(house.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-6 cursor-pointer hover:underline text-blue-500"
      >
        <FaMapMarkerAlt className="text-lg text-red-500" />
        <span className="text-lg">{house.address}</span>
      </a>

      {/* Time of Posting */}
      <div className="flex items-center gap-2 mt-4 text-gray-500">
        <FaClock className="text-lg" />
        <span>{timeAgo}</span>
      </div>
    </div>
  );
};

export default HouseDetails;
