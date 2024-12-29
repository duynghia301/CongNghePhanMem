import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getHouses } from "@/actions/get-houses";
import { HousesList } from "@/components/houses-list";
import { SearchInput } from "@/app/components/searchI-input";

interface SearchParamsProps {
  searchParams: {
    name?: string;
    categoryId?: string;
  };
}

const Housess = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const searchParam = await searchParams
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const houses = await getHouses({
    userId,
    ...searchParam,
  });

  return (
    <div className="pt-20">
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <HousesList items={houses} />
      </div>
    </div>
  );
};

export default Housess;
