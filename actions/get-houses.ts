import { db } from "@/lib/db";
import { House } from "@prisma/client";

// Lấy thông tin tất cả các nhà/phòng
export const getHouses = async () => {
  try {
    const houses = await db.house.findMany();
    return houses;
  } catch (error) {
    console.error("[GET_HOUSES_ERROR]", error);
    throw new Error("Failed to fetch houses");
  }
};

// Lấy thông tin chi tiết một nhà/phòng theo ID
export const getHouseById = async (id: string) => {
  try {
    const house = await db.house.findUnique({
      where: { id },
    });

    if (!house) {
      throw new Error("House not found");
    }

    return house;
  } catch (error) {
    console.error("[GET_HOUSE_BY_ID_ERROR]", error);
    throw new Error("Failed to fetch house details");
  }
};
