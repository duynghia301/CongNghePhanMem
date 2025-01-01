"use client";

import { Category } from "@prisma/client";

import {

  FcAddImage,
  FcBriefcase,
  FcEmptyFilter,
  FcEmptyTrash,
  FcHome,
  FcVip,


} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  "Nội thất cao cấp": FcVip,
  "Nội thất thường": FcHome,
  "Nội thất trống": FcEmptyFilter,
};

interface CategoriesProps {
  items: Category[];
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
