"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { House } from "@prisma/client";

interface PhoneFormProps {
    initialData: House;
    houseId: string;
}

const formSchema = z.object({
    phone: z.string().min(1, {
        message: "Phone number is required",
    }),
});

export const PhoneForm = ({
    initialData,
    houseId
}: PhoneFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: initialData?.phone || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/houses/${houseId}`, values);
            toast.success("Phone number updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Error:", error); 
            toast.error("Something went wrong"); 
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Số điện thoại

                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Hủy</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.phone && "text-slate-500"
                )}>
                    {initialData.phone || "No phone number"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. '0123456789'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Lưu
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
