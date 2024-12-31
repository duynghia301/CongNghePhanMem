"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { SignInButton, SignUpButton, useUser, UserButton, useAuth } from '@clerk/nextjs';
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { Admin } from "@/lib/admin";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser(); 
    const { userId } = useAuth();
    const isAdmin = Admin(userId);  // Check if the user is an admin
    const router = useRouter(); // Instantiate useRouter

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const handleManagementClick = () => {
        router.push("/admin"); // Navigate to the /admin page when clicked
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="bg-gray-100 hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-rose-100 transition cursor-pointer shadow-sm hover:shadow-md"
                >
                    <Link href="/ownerhouse/create" className="text-red-600">
                        Đăng tin
                    </Link>
                </div>
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer shadow-sm hover:shadow-md"
                >
                    <Link href="/ownerhouse/houses">
                        Quản lý tin
                    </Link>
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        {user ? <UserButton /> : <Avatar />}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {!user && (
                            <>
                                <SignInButton>
                                    <MenuItem
                                        onClick={() => {}}
                                        label="Login"
                                        className="hover:bg-gray-100 transition py-2 px-4"
                                    />
                                </SignInButton>
                                <SignUpButton>
                                    <MenuItem
                                        onClick={() => {}}
                                        label="Sign up"
                                        className="hover:bg-gray-100 transition py-2 px-4"
                                    />
                                </SignUpButton>
                            </>
                        )}
                        {user && (
                            <>
                                {isAdmin && (
                                    <MenuItem
                                        onClick={handleManagementClick} // Navigate to /admin when clicked
                                        label="Management"
                                        className="hover:bg-gray-100 transition py-2 px-4"
                                    />
                                )}
                                <MenuItem
                                    onClick={() => {}}
                                    label="Yêu Thích"
                                    className="hover:bg-gray-100 transition py-2 px-4"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
