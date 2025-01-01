"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/app/components/file-upload";

// Define types for ImageFormProps
interface ImageFormProps {
  houseId: string;
  initialImages: string[];
}

const formSchema = z.object({
  images: z.array(z.string().url()).min(1, "At least one image is required."),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const ImageForm = ({ houseId, initialImages }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { images: initialImages || [] },
  });

  const images = watch("images");

  const onSubmit = async (values: FormSchemaType) => {
    try {
// Ensure the URL is correct
const response = await axios.post(`/api/houses/${houseId}/images`, { images: values.images });

          
      if (response.status === 200) {
        toast.success("Images updated successfully!");
        toggleEdit();
        router.refresh();
      } else {
        toast.error("Failed to update images.");
      }
    } catch (error) {
      console.error("Error updating images:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Ảnh phòng trọ
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Hủy" : <><PlusCircle className="h-4 w-4 mr-2" />Chỉnh sửa</>}
        </Button>
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                alt={`Image ${index + 1}`}
                src={url}
                width={300}
                height={300}
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FileUpload
            endpoint="houseImage"
            onChange={(urls) => {
              setValue("images", [...images, ...urls]);
            }}
          />
          {errors.images && <p className="text-red-600">{errors.images.message}</p>}

          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  alt={`Image ${index + 1}`}
                  src={url}
                  width={300}
                  height={300}
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setValue("images", images.filter((_, i) => i !== index))}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-4">
            Tỉ lệ hình ảnh đề xuất: 16:9
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : "Lưu ảnh"}
          </Button>
        </form>
      )}
    </div>
  );
};
