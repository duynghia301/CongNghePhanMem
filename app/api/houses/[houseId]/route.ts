// app/api/houses/[houseId]/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server"; 


export async function DELETE(
  req: Request,
  { params }: { params: { houseId: string } }
){
    try {

      const { userId } = await auth();
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const houseOwner = await db.house.findUnique({
        where: { 
          id: params.houseId,
          userId,
         },
      });
      if (!houseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      
      const deleteHome = await db.house.delete({
        where: { 
          id: params.houseId,
         
        },
      });
      return NextResponse.json(deleteHome);

    } catch (error) {
      return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function PATCH(
  req: NextRequest, 
  { params }: { params: { houseId: string } }
) {
  try {
    const { houseId } = params;
    const authResult = await auth(); 
    const userId = authResult.userId; 

    if (!userId) {
      return NextResponse.redirect('/'); 
    }

    const values = await req.json();
    console.log("PATCH request received with values:", values);
    
    const course = await db.house.update({
      where: {
        id: houseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[HOME_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}