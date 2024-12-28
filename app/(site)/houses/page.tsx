import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    console.log("Received data:", data);  // Log the received data

    if (!data || Object.keys(data).length === 0) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // Check if required fields are missing
    if (!data.name || !data.address || !data.rating) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create the new house record
    const newHouse = await db.house.create({
      data: {
        ...data,
        ownerId: userId,
      },
    });

    return NextResponse.json(newHouse);
  } catch (error) {
    console.error("Error while creating a house:", error);
    return new NextResponse("Internal Error: ", { status: 500 });
  }
}
