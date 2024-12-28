// "use client" phải được đặt ở đầu file để Next.js biết đây là component client-side
"use client";

import React, { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu House ngay trong file
interface House {
  id: number;
  name: string;
  address: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
  closeTime: string;
  rating: number;
  allowedVehicles: string;
}

const ManageHousesPage = () => {
  const [houses, setHouses] = useState<House[]>([]); // Sử dụng kiểu House[]

  useEffect(() => {
    fetch("/api/houses")
      .then((res) => res.json())
      .then((data: House[]) => {
        setHouses(data);
      })
      .catch((err) => console.error("Error fetching houses:", err));
  }, []);

  return (
    <div>
      <h1>Manage Houses</h1>
      {houses.length > 0 ? (
        houses.map((house) => (
          <div key={house.id} className="house-item">
            <h2>{house.name}</h2>
            <p>{house.address}</p>
            <p>{house.description}</p>
            <p>Phone: {house.phone}</p>
            <p>Rating: {house.rating}</p>
            <p>Close Time: {house.closeTime}</p>
            <p>Allowed Vehicles: {house.allowedVehicles}</p>
          </div>
        ))
      ) : (
        <p>No houses found.</p>
      )}
    </div>
  );
};

export default ManageHousesPage;
