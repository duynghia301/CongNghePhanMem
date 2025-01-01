// components/HouseDetails.tsx
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { formatPrice } from "@/lib/format";
import { formatDistanceToNow } from "date-fns";


import "leaflet/dist/leaflet.css";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { LatLngExpression } from "leaflet";


interface HouseDetailsProps {
  house: any;
}

const HouseDetails = ({ house }: HouseDetailsProps) => {
  const postedDate = new Date(house.createdAt);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  // const position: LatLngExpression = [house.latitude, house.longitude]; // Sử dụng lat/lng từ house

  // Function to encode the address for use in a URL
  const encodeAddressForGoogleMaps = (address: string) => {
    return encodeURIComponent(address);
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
      <div className="flex items-center gap-2 mt-6">
        <FaMapMarkerAlt className="text-lg text-red-500" />
        {/* Wrap the address in a link to open Google Maps */}
        <a
          href={`https://www.google.com/maps?q=${encodeAddressForGoogleMaps(house.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-blue-500 hover:underline"
        >
          {house.address}
        </a>
      </div>

      {/* Time of Posting */}
      <div className="flex items-center gap-2 mt-4 text-gray-500">
        <FaClock className="text-lg" />
        <span>{timeAgo}</span>
      </div>
    </div>
  );
};

export default HouseDetails;
