// app/api/houses/[houseId]/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { houseId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Kiểm tra xem chủ nhà có phải là chủ sở hữu của nhà/phòng không
    const house = await db.house.findUnique({
      where: { id: params.houseId },
    });

    if (house?.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    // Cập nhật nhà/phòng
    const updatedHouse = await db.house.update({
      where: { id: params.houseId },
      data,
    });

    return NextResponse.json(updatedHouse);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }

  
}


export async function DELETE(req: Request, { params }: { params: { houseId: string } }) {
    try {
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Kiểm tra xem chủ nhà có phải là chủ sở hữu của nhà/phòng không
      const house = await db.house.findUnique({
        where: { id: params.houseId },
      });
  
      if (house?.userId !== userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Xóa nhà/phòng
      const deletedHouse = await db.house.delete({
        where: { id: params.houseId },
      });
  
      return NextResponse.json(deletedHouse);
    } catch (error) {
      console.error(error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }