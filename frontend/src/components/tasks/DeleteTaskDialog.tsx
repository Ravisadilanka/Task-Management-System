import { useState } from "react";
import { toast } from "sonner";

import api from "@/services/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  onDeleted: () => Promise<void> | void;
}

const DeleteTaskDialog = ({
  open,
  onOpenChange,
  taskId,
  onDeleted,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/tasks/${taskId}`);

      await onDeleted();

      toast.success("Task deleted successfully");

      onOpenChange(false);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ??
          "Failed to delete task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="bg-white">

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Task
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this
            task?

            <br />
            <br />

            This action cannot be undone.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel
            disabled={loading}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            {loading
              ? "Deleting..."
              : "Delete Task"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskDialog;