
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
        <div className="p-6">
        <div className="container mx-auto py-10">
            {/* <DataTable columns={columns} data={houses} /> */}
        </div>

    </div>
     );
}
 
export default HousePage;