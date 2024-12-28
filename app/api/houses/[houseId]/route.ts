// app/api/houses/[houseId]/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { houseId: string } }) {
  try {
    if (!params.houseId) {
        return new NextResponse("House ID is required", { status: 400 });
    }

    const { userId } = await auth();
    const { houseId } = params;  // Get houseId from params

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const house = await db.house.findUnique({
      where: { id: houseId },  // Ensure houseId is passed correctly
    });

    if (!house) {
      return new NextResponse("House not found", { status: 404 });
    }

    if (house.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    const updatedHouse = await db.house.update({
      where: { id: params.houseId },
      data,
    });

    return NextResponse.json(updatedHouse);
  } catch (error) {
    console.error("[HOUSE PUT ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { houseId: string } }) {
    try {
      if (!params.houseId) {
          return new NextResponse("House ID is required", { status: 400 });
      }

      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const house = await db.house.findUnique({
        where: { id: params.houseId },
      });
  
      if (!house) {
        return new NextResponse("House not found", { status: 404 });
      }
  
      if (house.userId !== userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await db.house.delete({
        where: { id: params.houseId },
      });
  
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      console.error("[HOUSE DELETE ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}