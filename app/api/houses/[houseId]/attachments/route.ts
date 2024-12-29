import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(
    req:Request, 
    {params} : {params: {houseId:string}}
) {
    try {
        const {userId} =await auth();
        const {url} = await req.json();

        if (!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const courseOwner = await db.house.findUnique({
            where:{
                id:params.houseId,
                userId: userId,
            }
        });
        if (!courseOwner){
            return new NextResponse("Unauthorized", {status:401});
        }

        const attachment = await db.attachment.create({
            data:{
                url,
                name:url.split("/").pop(),
                houseId:params.houseId,
            }
        });

        return NextResponse.json(attachment)
    } catch (error) {
        console.log("HOUSE_ID_ATTACHMENTS",error)
        return new NextResponse("Internal Error", {status:500});
    }
    
}