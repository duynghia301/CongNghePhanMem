// app/api/houses/route.ts
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server"; 
import { NextResponse, NextRequest } from "next/server"; 

export async function POST(req: NextRequest) { 
    try {
        const { userId } = getAuth(req); 
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name } = await req.json(); 

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const house = await db.house.create({
            data: {
              userId: userId,
              name,
              status: 'REJECTED',
            }
        });

        return NextResponse.json(house);
    } catch (error) {
        console.log("[HOUSE POST ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
