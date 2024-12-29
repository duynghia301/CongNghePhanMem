import { Category, House } from "@prisma/client";
import { HouseCard } from "./house-card"; // Ensure this path is correct

type HouseWithCategory = House & {
  category: Category | null;
};

interface HousesListProps {
  items: HouseWithCategory[];
}

export const HousesList = ({ items }: HousesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <HouseCard
            key={item.id}
            id={item.id}
            name={item.name!}
            imageUrl={item.imageURL!}
            price={item.rentalPrice!}
            category={item.category?.name!}
            address={item.address!}
            roomArea={item.roomArea!}
            createdAt={item.createdAt.toString()}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          Không tìm thấy bài đăng nào.
        </div>
      )}
    </div>
  );
};
