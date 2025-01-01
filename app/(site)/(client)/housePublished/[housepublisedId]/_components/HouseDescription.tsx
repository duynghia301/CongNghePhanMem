// components/HouseDescription.tsx
"use client";

import { useState } from "react";
import Preview from "@/app/components/preview";

interface HouseDescriptionProps {
  description: string;
}

const HouseDescription = ({ description }: HouseDescriptionProps) => {
  const [isFullDescription, setIsFullDescription] = useState(false);

  const toggleDescription = () => {
    setIsFullDescription(!isFullDescription);
  };

  const truncateDescription = (description: string) => {
    if (description.length > 150) {
      return `${description.slice(0, 500)}...`; // Truncate at 150 characters
    }
    return description;
  };

  return (
    <div className="mt-6">
      {/* Use Preview component to show the description with formatting */}
      <p className="font-semibold">Mô tả chi tiết</p>
      <Preview value={isFullDescription ? description : truncateDescription(description)} />
      
      {description && description.length > 150 && (
        <button 
          className="text-blue-500 mt-2"
          onClick={toggleDescription}
        >
          {isFullDescription ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default HouseDescription;
