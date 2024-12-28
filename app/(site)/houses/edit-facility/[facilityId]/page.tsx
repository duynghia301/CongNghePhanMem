// app/houses/edit-facility/[facilityId]/page.tsx
import { FacilityForm } from "@/app/components/FacilityForm";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EditFacilityPage = () => {
  const router = useRouter();
  const { houseId, facilityId } = router.query;
  const [facilityData, setFacilityData] = useState<any>(null);

  useEffect(() => {
    if (houseId && facilityId) {
      fetch(`/api/houses/${houseId}/facilities/${facilityId}`)
        .then((res) => res.json())
        .then((data) => setFacilityData(data))
        .catch((error) => console.error("Failed to fetch facility data", error));
    }
  }, [houseId, facilityId]);

  const handleSubmit = async (data: { name: string; type: string; value: string }) => {
    try {
      const response = await fetch(`/api/houses/${houseId}/facilities/${facilityId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push(`/houses/${houseId}`); // Điều hướng về trang chi tiết nhà trọ
      } else {
        console.error("Error updating facility");
      }
    } catch (error) {
      console.error("Error updating facility", error);
    }
  };

  if (!facilityData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Facility</h1>
      <FacilityForm initialData={facilityData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditFacilityPage;
