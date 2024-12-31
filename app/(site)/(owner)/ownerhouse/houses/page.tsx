
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import Navbar from "@/app/components/navbar/Navbar";

const HousePage = async () => {
    const {userId } = await auth();
    if(!userId){
        return redirect("/")
    }
    const houses = await db.house.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return ( 

        <div className="p-2">
        <div className="container mx-auto py-10">
             <DataTable columns={columns} data={houses} /> 
        </div>

    </div>

     );
}
 
export default HousePage;