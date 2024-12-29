"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { House } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
    initialData: House;
    houseId: string;
};

const formSchema = z.object({
    rentalPrice: z.coerce.number(),
    depositPrice: z.coerce.number(),  // Add the deposit price field to the schema
});

export const PriceForm = ({
    initialData,
    houseId
}: PriceFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rentalPrice: initialData?.rentalPrice || undefined,
            depositPrice: initialData?.depositPrice || undefined,  // Set default value for deposit price
        }
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/houses/${houseId}`, values)
            toast.success("Updated");
            toggleEdit();
            router.refresh();

        } catch (error) {
            console.error("Error:", error); 
            toast.error("Something went wrong") 
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Giá thuê 

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
                    !initialData.rentalPrice && "text-slate-500"
                )}>
                    <span>Tiền thuê: </span>
                    {initialData.rentalPrice
                        ? formatPrice(initialData.rentalPrice)
                        : "No rent price"}
                        <span> /tháng</span> 
                </p>
                
                
            )}
             {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.depositPrice && "text-slate-500"
                )}>
                    <span>Tiền đặt cọc: </span>
                    {initialData.depositPrice
                        ? formatPrice(initialData.depositPrice)
                        : "No deposit price"}
                    
                </p>
                
                
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        Giá thuê hàng tháng
                        <FormField
                            control={form.control}
                            name="rentalPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="1000"
                                            disabled={isSubmitting}
                                            placeholder="Thêm giá tiền cho khóa học của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p>Tiền đặt cọc</p>
                        <FormField
                            control={form.control}
                            name="depositPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="1000"
                                            disabled={isSubmitting}
                                            placeholder="Thêm giá đặt cọc cho nhà trọ của bạn"
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
    )
}
