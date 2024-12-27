import React, { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu House
interface House {
  id: number;
  name: string;
  address: string;
  description: string;
  phone: string;
}

const ManageHousesPage = () => {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    // Giả sử bạn gọi API để lấy danh sách nhà/phòng
    fetch("/api/houses")
      .then((res) => res.json())
      .then((data: House[]) => {
        setHouses(data); // Cập nhật trạng thái với kiểu dữ liệu phù hợp
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Manage Houses</h1>
      {houses.map((house) => (
        <div key={house.id}>
          <h2>{house.name}</h2>
          <p>{house.address}</p>
          <p>{house.description}</p>
          <p>{house.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageHousesPage;
