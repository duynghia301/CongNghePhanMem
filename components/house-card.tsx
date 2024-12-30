import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface HouseCardProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  createdAt: string;
  address: string;
  roomArea: number; // Add roomArea property
}

export const HouseCard = ({
  id,
  name,
  imageUrl,
  price,
  category,
  createdAt,
  address,
  roomArea // Add roomArea to the component props
}: HouseCardProps) => {
  // Convert createdAt to a Date object
  const createdDate = new Date(createdAt);

  // Check if the createdDate is valid
  const isValidDate = !isNaN(createdDate.getTime());

  return (
    <div className="shadow-sm hover:shadow-md">
      <Link href={`/housePublished/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={name}
              src={imageUrl}
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-[25px] font-bold text-zinc-600 group-hover:text-sky-700 transition line-clamp-2">
              {name}
            </div>
            <p className="text-xs text-muted-foreground">
              {category}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-[30px] font-bold text-rose-600">
                {formatPrice(price)}/Tháng
              </p>
              <p className="text-xl text-muted-foreground">
                {roomArea} m²
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {address}
            </p>
            {isValidDate && (
              <p className="text-xs text-muted-foreground">
                
                {formatDistanceToNow(createdDate, { addSuffix: true })}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
