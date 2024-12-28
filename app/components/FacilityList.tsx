// app/components/FacilityList.tsx
"use client";  // Thêm dòng này để chỉ định đây là client component

import React from "react";

interface FacilityListProps {
  facilities: Array<{ id: string; name: string; type: string; value: string }>;
  onEdit: (facilityId: string) => void;
  onDelete: (facilityId: string) => void;
}

export const FacilityList: React.FC<FacilityListProps> = ({ facilities, onEdit, onDelete }) => {
  
    return (
    <div className="space-y-4">
      {facilities.map((facility) => (
        <div key={facility.id} className="flex justify-between items-center">
          <div>
            <h4>{facility.name}</h4>
            <p>{facility.type}</p>
            <p>{facility.value}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(facility.id)} className="btn">Edit</button>
            <button onClick={() => onDelete(facility.id)} className="btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
