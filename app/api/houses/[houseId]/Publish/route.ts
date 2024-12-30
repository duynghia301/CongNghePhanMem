import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { houseId: string} }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const house = await db.house.findUnique({
            where: {
            id: params.houseId,
            userId,
            },
            
        });
        if (!house) {
            return new NextResponse("Not Found", { status: 404 });
        } 

        const publicHouse = await db.house.update({
            where:{
                id:params.houseId,
                userId,
            },
            data:{
                status:"PENDING",
            }
        })
        return NextResponse.json(publicHouse)
    } catch (error) {
          console.log("HOURSE_ID_PUBLISH",error)
            return new NextResponse("Internal Error", { status: 500 });
    }
    
}