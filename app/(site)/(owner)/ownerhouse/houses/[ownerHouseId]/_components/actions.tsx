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
}

export const Actions = ({ disable, houseId }: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      // Ensure houseId is used correctly in the API request URL
      await axios.patch(`/api/houses/${houseId}`, { status: "PENDING" });
      toast.success("Status set to Pending");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
      <Button
        onClick={onClick}
        disabled={disable || isLoading}
        variant="outline"
        size="sm"
      >
        Hoàn Tất
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
