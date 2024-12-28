import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId:userId };
}

export const ourFileRouter = {

  houseImage:f({image:{maxFileSize:"4MB", maxFileCount :1}})
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{}),
  houseAttachment: f(["text","image","video","audio","pdf"])
    .middleware(()=> handleAuth())
    .onUploadComplete(()=>{}),
  houseVideo: f({video:{maxFileCount: 1,maxFileSize:"512GB"}})
    .middleware(()=> handleAuth())
    .onUploadComplete(()=>{}),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
