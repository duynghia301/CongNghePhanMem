import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ImageForm } from "./_components/image-form";
import { AddressForm } from "./_components/adress_form";
import { PhoneForm } from "./_components/PhoneForm";
import { PriceForm } from "./_components/price_form";
import { AreaForm } from "./_components/roomArea_form";
import { NameForm } from "./_components/name_form";
import { DescriptionForm } from "./_components/description_form";
import { AttachmnetForm } from "./_components/attachment-form";
import { CategoryForm } from "./_components/category-form";
import { Actions } from "./_components/actions";

const HouseIdPage = async ({ params }: { params: { ownerHouseId: string } }) => {
  const { ownerHouseId } = params;
  if (!ownerHouseId) {
    console.error("Invalid houseId in URL params", params);
    redirect("/"); 
    
  }

  const { userId } = await auth();
  const isAuth = !!userId;

  if (!isAuth) {
    return redirect("/"); // Redirect if user is not authenticated
  }

  const house = await db.house.findUnique({
    where: {
      id: ownerHouseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: { createdAt: "desc" },
      },
      images: true,  // Include images
    },
  });

  if (!house) {
    console.error("Invalid houseId or userId", { userId });
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
    house.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

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
          <Actions 
            disable={!isComplete } 
            houseId={house.id} 
            currentStatus={house.status} 
          />        
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <NameForm initialData={house} houseId={house.id} />
          <DescriptionForm initialData={house} houseId={house.id} />
          <PhoneForm initialData={house} houseId={house.id} />
          <PriceForm initialData={house} houseId={house.id} />
        </div>
        <div className="space-y-6">
          <AddressForm initialData={house} houseId={house.id} />
          <ImageForm
            houseId={house.id}
            initialImages={house.images.map((image) => image.url)}
            />          
            <CategoryForm
            initialData={house}
            houseId={house.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <AreaForm initialData={house} houseId={house.id} />
          <AttachmnetForm initialData={house} houseId={house.id} />
        </div>
      </div>
    </div>
  );
};

export default HouseIdPage;
