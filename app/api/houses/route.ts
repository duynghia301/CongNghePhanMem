import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Lấy danh sách tất cả nhà/phòng
export async function GET() {
  const houses = await db.house.findMany();
  return NextResponse.json(houses);
}

// Thêm nhà/phòng mới
export async function POST(req: Request) {
  const {
    name,
    rating,
    address,
    description,
    phone,
    allowedVehicles,
    latitude,
    longitude,
    closeTime,
    ownerId,
  } = await req.json();

  if (!name || !address || !phone || !ownerId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const house = await db.house.create({
    data: {
      name,
      rating: rating || 0,
      address,
      description,
      phone,
      allowedVehicles,
      latitude,
      longitude,
      closeTime,
      ownerId,
    },
  });

  return NextResponse.json(house, { status: 201 });
}
