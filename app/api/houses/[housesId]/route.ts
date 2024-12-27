import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Lấy thông tin chi tiết một nhà/phòng
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const house = await db.house.findUnique({
    where: { id: parseInt(id) },
  });

  if (!house) {
    return NextResponse.json({ error: "House not found" }, { status: 404 });
  }

  return NextResponse.json(house);
}

// Sửa thông tin nhà/phòng
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();

  const updatedHouse = await db.house.update({
    where: { id: parseInt(id) },
    data,
  });

  return NextResponse.json(updatedHouse);
}

// Xóa nhà/phòng
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await db.house.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "House deleted successfully" });
}
