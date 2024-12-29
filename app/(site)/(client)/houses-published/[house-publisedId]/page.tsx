import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const HousesIDPage = async ({ params }: { params: { housesId: string } }) => {
  const course = await db.house.findUnique({
    where: {
      id: params.housesId,
      status:"APPROVED"
    }, 
    
    
  });

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/`);
};

export default HousesIDPage;
