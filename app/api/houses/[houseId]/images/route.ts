import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { houseId: string } }
) {
  try {
    // Authenticate the user
    const { userId } = await auth();
    const { images } = await req.json();  // Get the list of image URLs from the request body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the house exists and belongs to the authenticated user
    const houseOwner = await db.house.findUnique({
      where: {
        id: params.houseId,
        userId: userId,
      },
    });

    if (!houseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create new records for each image in the database
    const imageAttachments = await Promise.all(
      images.map((imageUrl: string) =>
        db.houseImage.create({
          data: {
            houseId: params.houseId,
            url: imageUrl,
          },
        })
      )
    );

    return NextResponse.json(imageAttachments);  // Return the created image records
  } catch (error) {
    console.error("Error processing image upload:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
