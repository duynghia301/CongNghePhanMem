// app/houses/add-facility/page.tsx
import { FacilityForm } from "@/app/components/FacilityForm";
import { useRouter } from "next/router";

const AddFacilityPage = () => {
  const router = useRouter();
  const { houseId } = router.query;

  const handleSubmit = async (data: { name: string; type: string; value: string }) => {
    try {
      const response = await fetch(`/api/houses/${houseId}/facilities`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push(`/houses/${houseId}`); // Điều hướng đến trang chi tiết nhà trọ
      } else {
        console.error("Error adding facility");
      }
    } catch (error) {
      console.error("Error adding facility", error);
    }
  };

  return (
    <div>
      <h1>Add New Facility</h1>
      <FacilityForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddFacilityPage;
