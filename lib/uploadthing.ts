import {
    generateUploadButton,
    generateUploadDropzone,
    generateUploader,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "@/app/components/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  export const UploadLoader = generateUploader<OurFileRouter>();
