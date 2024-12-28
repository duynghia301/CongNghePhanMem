"use client";

import * as z from "zod";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const CreatePage = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const houseData = {
                ...values,
                name: values.title || "Default House Name" // Set a default name if not provided
            };
            const response = await axios.post("/api/houses", houseData);
            if (response.data.id) {
                router.push(`/ownerhouse/houses/${response.data.id}`);
                toast.success("Đã tạo bài đăng thành công");
            } else {
                toast.error("Không thể tạo bài đăng. Thử lại!");
            }
        } catch (error) {
            console.error("Error creating new house:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };
    

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Fast Home System
                </h1>
                <p className="text-sm text-slate-600">
                    Thêm trọ mới
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Tên tiêu đề
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g 'advanced web development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Chuẩn bị bài đăng cho trọ mới
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/ownerhouse/houses">
                                <Button
                                    type="button"
                                    variant="ghost">
                                    Hủy
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}>
                                Tiếp tục
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreatePage;
