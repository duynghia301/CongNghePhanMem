import { db } from "@/lib/db";
import { boolean } from "zod";

interface GetHousesParams {
  name?: string;
  categoryId?: string;
}

export const getHouses = async ({ name, categoryId }: GetHousesParams) => {
  try {
    const houses = await db.house.findMany({
      where: {
        status: "APPROVED",
        name: { 
          contains: name 
        },
        categoryId,
        
        
      },
      
      include: {
        category: true,
        images:true
      },
      
      orderBy: {
        createdAt: "desc",
      },
    });
    return houses;
  } catch (error) {
    console.error("[GET_HOUSES_ERROR]", error);
    throw new Error("Failed to fetch houses");
  }
};
