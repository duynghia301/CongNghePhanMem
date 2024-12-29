import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params}: {params :{houseId:string, attachmentId:string}}
) {
    const paramss = await params
    try {
        const {userId} =await auth();

        if (!userId){
            return new NextResponse("Unauthorized", {status:401});
        }
        const courseOwner = await db.house.findUnique({
            where:{
                id:paramss.houseId,
                userId: userId,
            }
        });
        if (!courseOwner){
            return new NextResponse("Unauthorized", {status:401});
        }

        const attachment = await db.attachment.delete({
            where:{
                houseId:paramss.houseId,
                id:params.attachmentId
            }
        });

        return NextResponse.json(attachment)


    } catch (error) {
        console.log("ATTACHMENT_ID",error);
        return new NextResponse("Internal Error", {status:500});
    }
}