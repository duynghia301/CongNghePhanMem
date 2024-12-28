// app/api/houses/[houseId]/facilities/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { houseId: string } }) {
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

    // Thêm tiện nghi cho nhà/phòng
    const newFacility = await db.facility.create({
      data: {
        ...data,
        houseId: params.houseId,
      },
    });

    return NextResponse.json(newFacility);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
