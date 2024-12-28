// app/api/houses/[houseId]/facilities/[facilityId]/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { houseId: string, facilityId: string } }) {
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

    // Cập nhật tiện nghi
    const updatedFacility = await db.facility.update({
      where: { id: params.facilityId },
      data,
    });

    return NextResponse.json(updatedFacility);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { houseId: string, facilityId: string } }) {
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

    // Xóa tiện nghi
    const deletedFacility = await db.facility.delete({
      where: { id: params.facilityId },
    });

    return NextResponse.json(deletedFacility);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}