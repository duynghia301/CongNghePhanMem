"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminSidebar = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>(""); // Track the active button

  const handleNavigation = (path: string, buttonName: string) => {
    setActiveButton(buttonName); // Set the active button
    router.push(path); // Navigate to the specified path
  };

  return (
    <div className="mt-[90px] h-full border-r flex flex-col overflow-y-auto shadow-sm bg-slate-200">
      <div className="p-8 flex flex-col border-b">
        <h2 className="text-xl font-bold mb-6">Quản lý</h2>

        <Button
          onClick={() => handleNavigation("/admin/managerPosts", "managePosts")}
          className={`mb-4 w-full text-left ${activeButton === "managePosts" ? "bg-blue-500 text-white" : ""}`}
          variant="outline"
        >
          Quản lý bài đăng
        </Button>

        <Button
          onClick={() => handleNavigation("/admin/pedding", "managePeddings")}
          className={`mb-4 w-full text-left ${activeButton === "managePeddings" ? "bg-blue-500 text-white" : ""}`}
          variant="outline"
        >
          Duyệt bài đăng
        </Button>

         <Button
          onClick={() => handleNavigation("/admin/ctv", "ctv")}
          className={`mb-4 w-full text-left ${activeButton === "ctv" ? "bg-blue-500 text-white" : ""}`}
          variant="outline"
        >
          Quản lí cộng tác viên
        </Button>
{/*
        <Button
          onClick={() => handleNavigation("", "notifications")}
          className={`mb-4 w-full text-left ${activeButton === "notifications" ? "bg-blue-500 text-white" : ""}`}
          variant="outline"
        >
          Thông báo
        </Button>

        <Button
          onClick={() => handleNavigation("", "help")}
          className={`mb-4 w-full text-left ${activeButton === "help" ? "bg-blue-500 text-white" : ""}`}
          variant="outline"
        >
          Trợ giúp
        </Button> */}
      </div>
    </div>
  );
};

export default AdminSidebar;
