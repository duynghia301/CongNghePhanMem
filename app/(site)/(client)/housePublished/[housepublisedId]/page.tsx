// pages/housePublished/[housepublisedId].tsx
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import CopyPhoneNumber from "./_components/CoppyPhone";
import HouseDetails from "./_components/HouseDetails";
import HouseDescription from "./_components/HouseDescription";
import HouseAttachments from "./_components/HouseAttachments";
import Slideshow from "./_components/Slideshow";

const HouseDetailPage = async ({ params }: { params: { housepublisedId: string } }) => {
  const {housepublisedId} = await params
  const house = await db.house.findUnique({
    where: {
      id: housepublisedId,
      status: "APPROVED", // Only approved houses
    },
    include: {
      category: true, 
      images: true,  
      attachments: {
        orderBy: {
          createdAt: "desc", 
        },   
      },
    },
  });

  if (!house) {
    return redirect("/"); 
  }
  const phoneNumber = house.phone || "None"; 
  return (
    <div className="container mx-auto p-6 pt-[100px] pl-[100px] space-y-8 border"> 
      
      {/* Image Section */}
      <div>
      <Slideshow images={house.images.map((img) => ({ url: img.url, id: img.id }))} />

      </div>

      {/* Name and Category Section */}
      <div>
        <h1 className="text-3xl font-semibold">{house.name}</h1>
        <div className="text-xl text-gray-700">{house.category?.name}</div>
      </div>

      {/* House Details */}
      <HouseDetails house={house} />

      {/* Phone Number Section */}
      <CopyPhoneNumber phoneNumber={phoneNumber} />

      {/* House Description */}
      <HouseDescription description={house.description || ""} />

      {/* Attachments Section */}
      {house.attachments.length > 0 && (
        <HouseAttachments attachments={house.attachments} />
      )}
    </div>
  );
};

export default HouseDetailPage;
