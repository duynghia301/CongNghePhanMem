"use client";

import { ConfirmModal } from "@/app/components/models/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disable: boolean;
  houseId: string;
  currentStatus: string; // Current status of the house (e.g., 'PENDING', 'APPROVED', 'REJECTED')
}

export const Actions = ({ disable, houseId, currentStatus }: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle the status change (e.g., setting to 'APPROVED' or 'REJECTED')
  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsLoading(true);

      // Ensure houseId is used correctly in the API request URL
      await axios.patch(`/api/houses/${houseId}`, { status: newStatus });
      toast.success(`Status set to ${newStatus}`);

      // Refresh the page to reflect the updated status
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle house deletion
  const onDelete = async () => {
    try {
      setIsLoading(true);

      // Ensure houseId is used correctly in the API request URL
      await axios.delete(`/api/houses/${houseId}`);

      toast.success("Deleted");
      router.refresh();
      router.push(`/ownerhouse/houses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {/* Hoàn Tất Button - only visible if status is PENDING */}
      {currentStatus === "REJECTED" && (
        <Button
          onClick={() => handleStatusChange("PENDING")} // Change to "APPROVED" on complete
          disabled={disable || isLoading}
          variant="outline"
          size="sm"
        >
          Hoàn Tất
        </Button>
      )}

      {/* Công khai Button - visible only if status is not APPROVED or REJECTED */}
      {currentStatus !== "PENDING" && currentStatus !== "REJECTED" && (
        <Button
          onClick={() => {}}
          disabled={disable || isLoading || currentStatus === "APPROVED"}
          variant="outline"
          size="sm"
        >
         Đang công khai
        </Button>
      )}

      {/* Riêng tư Button - visible only if status is not REJECTED */}
      {currentStatus !== "REJECTED"  && (
        <Button
          onClick={() => handleStatusChange("REJECTED")}
          disabled={disable || isLoading || currentStatus === "REJECTED"}
          variant="outline"
          size="sm"
        >
          Riêng tư
        </Button>
      )}

      {/* Delete Button with Confirmation */}
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
