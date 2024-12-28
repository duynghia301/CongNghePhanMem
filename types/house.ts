// types/house.ts

export interface House {
    id: number;
    name: string;
    rating: number;  // Đánh giá nhà/phòng
    address: string;
    description: string;
    phone: string;
    acceptedMethods: string[];  // Các phương tiện chấp nhận
    latitude: number;
    longitude: number;
    closingTime: string;
    userId: string;  // Mã người dùng (chủ nhà)
  }
  