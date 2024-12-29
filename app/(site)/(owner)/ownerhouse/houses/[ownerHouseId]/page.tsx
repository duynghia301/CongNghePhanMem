import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { AddressForm } from "./_components/adress_form";
import { CategoryForm } from "./category-form";
import { LocationForm } from "./_components/location_form";
import { PhoneForm } from "./_components/PhoneForm";
import { PriceForm } from "./_components/price_form";
import { AreaForm } from "./_components/roomArea_form";

const HouseIdPage = async ({ params }: { params: { houseId: string } }) => {
  const { houseId } = params;
  
  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    redirect("/"); // Redirect if user is not authenticated
  }

  // Fetch the house by houseId and userId
 const house = await db.house.findFirst({
  where: {
    id: houseId,
    userId: userId,
  },
  include: {
    attachments: {
      orderBy: { createdAt: "desc" },
    },
  },
});

  if (!house) {
    redirect("/"); // Redirect if no house found
  }

  // Fetch categories for the form dropdown
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  // Calculate the completion status for the form
  const requiredFields = [
    house.address,
    house.description || "",
    house.imageURL,
    house.latitude,
    house.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  // Define status options for dropdown
  const statusOptions = [
    { value: "PENDING", label: "Chờ duyệt" },
    { value: "APPROVED", label: "Công khai" },
    { value: "REJECTED", label: "Riêng tư" },
  ];
  const currentStatus =
    statusOptions.find((opt) => opt.value === house.status)?.label || "Không xác định";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Chỉnh sửa bài đăng</h1>
          <span className="text-sm text-slate-700">
            Hoàn thành tất cả các mục {completionText}
          </span>
        </div>
        <div className="flex items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{currentStatus}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map((option) => (
                <DropdownMenuItem key={option.value}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <AddressForm initialData={house} houseId={house.id} />
          <DescriptionForm initialData={house} houseId={house.id} />
          <ImageForm initialData={house} houseId={house.id} />
          <CategoryForm 
            initialData={house}
            houseId={house.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Vị trí</h2>
            </div>
            <AreaForm initialData={house} houseId={house.id}/>
            <LocationForm initialData={house} houseId={house.id} />
            <PhoneForm initialData={house} houseId={house.id}/>
            <PriceForm  initialData={house} houseId={house.id} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseIdPage;
