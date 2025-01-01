"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/components/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (urls: string[]) => void; // Sửa để nhận danh sách URL
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const uploadedUrls = res?.map((file) => file.url) || [];
        if (uploadedUrls.length > 0) {
          onChange(uploadedUrls);
          console.log("Uploaded URLs:", uploadedUrls);
          toast.success("Upload Completed");
        } else {
          toast.error("Upload failed. No URLs received.");
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
        toast.error(`Error: ${error.message}`);
      }}
    />
  );
};
