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
import { Textarea } from "@/components/ui/textarea";



import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
}from "@/components/ui/form"
import { House } from "@prisma/client";



interface NameFormProps{
    initialData:House
    houseId:string
};

const formSchema = z.object({
    name: z.string().min(1,{
        message:"Name is required",
    }),
});



export const NameForm = ({
    initialData,
    houseId
}:NameFormProps) =>{

    const [isEditng, setIsEditing]= useState(false);

    const toggleEdit = () => setIsEditing((current)=>!current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:initialData?.name||""
        }
    })

    const{isSubmitting, isValid}=form.formState;
    const onSubmit =async (values: z.infer<typeof formSchema>)=>{
        try {
            await axios.patch(`/api/houses/${houseId}`,values)
            toast.success("Updated");
            toggleEdit();
            router.refresh();

        } catch (error) {
            console.error("Error:", error); 
            toast.error("Something when wrong") 
        }
    }

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className=" font-medium flex items-center justify-between">
            Tiêu đề bài đăng

                <Button onClick={toggleEdit} variant="ghost">
                    {isEditng ? (
                        <>Hủy</>
                    ):(
                        <>
                           <Pencil className="h-4 w-4 mr-2"/>
                           Chỉnh sửa
                        </>
                    

                     )}
                 
                </Button>
            </div>
            {!isEditng && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.name && "text-slate-500"
                )}>
                    {initialData.name || "No description"}
                </p>
            )}
            {isEditng &&(
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>  
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Môn học này chia sẻ những kiến thức...'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}    
                        />
                        <div className=" flex items-center gap-x-2">
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