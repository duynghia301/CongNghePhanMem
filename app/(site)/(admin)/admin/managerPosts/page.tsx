import { db } from "@/lib/db";
import { DataTable } from "../_components/data-table";
import { columns } from "../_components/column";

const managerPosts = async () => {
        
        const houses = await db.house.findMany({
            where:{
                status:"APPROVED"
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
 
export default managerPosts;