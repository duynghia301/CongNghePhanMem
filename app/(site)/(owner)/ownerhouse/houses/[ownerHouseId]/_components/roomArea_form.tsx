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

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { House } from "@prisma/client";
import { Input } from "@/components/ui/input";

interface AreaFormProps {
    initialData: House;
    houseId: string;
};

const formSchema = z.object({
    roomArea: z.coerce.number(),  // Add the room area field to the schema
});

export const AreaForm = ({
    initialData,
    houseId
}: AreaFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomArea: initialData?.roomArea || undefined,  // Set default value for room area
        }
    })

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

    // Format the number to square meters (m²)
    const formatArea = (area: number) => {
        return `${area} m²`;
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Diện tích phòng

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
                    !initialData.roomArea && "text-slate-500"
                )}>
                    {initialData.roomArea
                        ? formatArea(initialData.roomArea)
                        : "No room area"}
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
                            name="roomArea"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            disabled={isSubmitting}
                                            placeholder="Thêm diện tích phòng (m²)"
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
