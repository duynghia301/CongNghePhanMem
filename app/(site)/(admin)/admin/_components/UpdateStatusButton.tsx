import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, X } from "lucide-react";

// Define the available statuses
type Status = "PENDING" | "APPROVED" | "REJECTED";

interface UpdateStatusButtonProps {
    housesid: string;
  currentStatus: Status;
  setCurrentStatus: React.Dispatch<React.SetStateAction<Status>>;
}

const UpdateStatusButton = ({ housesid, currentStatus, setCurrentStatus }: UpdateStatusButtonProps) => {
  const { getToken } = useAuth(); // Clerk hook to get the authentication token

  // Function to update the house status
  const updateStatus = async (newStatus: Status) => {
    try {
      const token = await getToken();
      console.log("Token:", token); // Log token to check if it's being retrieved
  
      if (!token) {
        console.error("No authentication token found");
        return; // If no token, exit early
      }
  
      // Send the request to the backend
      const response = await axios.patch(
        `/api/houses/${housesid}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        }
        
      );
  
      console.log("Response:", response); // Log response for debugging
  
      if (response.status === 200) {
        setCurrentStatus(newStatus);
      } else {
        console.error("Failed to update status", response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        className="text-blue-500"
        onClick={() => updateStatus("APPROVED")}
        disabled={currentStatus === "APPROVED"}
      >
        <CheckCheckIcon className="h-4 w-4 mr-2" />
        Duyệt
      </Button>
      <Button
        variant="outline"
        className="text-red-400"
        onClick={() => updateStatus("REJECTED")}
        disabled={currentStatus === "REJECTED"}
      >
        <X className="h-4 w-4 mr-2" />
        Từ chối
      </Button>
    </div>
  );
};

export default UpdateStatusButton;
