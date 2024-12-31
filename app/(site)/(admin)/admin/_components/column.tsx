"use client";

import { Button } from "@/components/ui/button";
import { House } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { useState } from "react"; // For local state updates
import UpdateStatusButton from "./UpdateStatusButton"; // Import the new component

export const columns: ColumnDef<House>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên bài đăng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("vi-VN");
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusMap;

      const statusMap = {
        PENDING: { label: "Chờ duyệt", className: "bg-yellow-500" },
        APPROVED: { label: "Công khai", className: "bg-green-500" },
        REJECTED: { label: "Riêng tư", className: "bg-red-500" },
      };

      const statusInfo = statusMap[status] || {
        label: "Không xác định",
        className: "bg-gray-500",
      };

      return <Badge className={cn(statusInfo.className)}>{statusInfo.label}</Badge>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const { id, status } = row.original;
      const [currentStatus, setCurrentStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">(status);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-blue-500">
              <UpdateStatusButton 
                housesid={id} 
                currentStatus={currentStatus} 
                setCurrentStatus={setCurrentStatus} 
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "row-click",
    cell: ({ row }) => {
      const { id } = row.original;
      const router = useRouter();

      const handleRowClick = () => {
        router.push(`/admin/${id}`);
      };

      return (
        <div
          onClick={handleRowClick}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          <span>Xem</span>
        </div>
      );
    },
  },
];
