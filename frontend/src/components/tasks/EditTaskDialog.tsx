import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import api from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createTaskSchema, type CreateTaskForm } from "@/validations/task";

import type { User } from "@/types/auth";
import type { Task } from "@/types/task";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onUpdated: () => Promise<void> | void;
}

const EditTaskDialog = ({ open, onOpenChange, task, onUpdated }: Props) => {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (!task) return;

    reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignedTo: task.assignedTo?._id,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
  }, [task, reset]);

  useEffect(() => {
    if (open && user?.role === "admin") {
      loadUsers();
    }
  }, [open]);

  const loadUsers = async () => {
    try {
      const response = await api.get<User[]>("/users");

      setUsers(response.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const onSubmit = async (data: CreateTaskForm) => {
    try {
      await api.put(`/tasks/${task._id}`, data);

      await onUpdated();

      onOpenChange(false);

      toast.success("Task updated successfully");
    } catch (error: any) {
      console.error("Update failed:", error);

      toast.error(error.response?.data?.message ?? "Failed to update task");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-xl overflow-visible">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input placeholder="Task title" {...register("title")} />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              rows={5}
              placeholder="Description"
              {...register("description")}
            />
          </div>

          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>

                <SelectContent side="bottom" className="bg-white">
                  <SelectItem value="Low">Low</SelectItem>

                  <SelectItem value="Medium">Medium</SelectItem>

                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent side="bottom" className="bg-white">
                  <SelectItem value="Open">Open</SelectItem>

                  <SelectItem value="In Progress">In Progress</SelectItem>

                  <SelectItem value="Testing">Testing</SelectItem>

                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {user?.role === "admin" && (
            <Controller
              control={control}
              name="assignedTo"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign user" />
                  </SelectTrigger>

                  <SelectContent
                    side="bottom"
                    className="bg-gray-900 text-white border-gray-700"
                  >
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}

          <div>
            <Input type="date" {...register("dueDate")} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-semibold
    rounded-lg
    px-6
    py-2
    cursor-pointer
  "
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
