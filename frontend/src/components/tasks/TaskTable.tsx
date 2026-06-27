import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Task } from "@/types/task";

import TaskBadge from "../common/TaskBadge";
import { Button } from "../ui/button";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";

interface Props {
  tasks: Task[];
  loading: boolean;
  getTasks: () => void;
}

const TaskTable = ({ tasks, loading, getTasks }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openDelete, setOpenDelete] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <h3 className="text-xl font-semibold">No Tasks Found</h3>

        <p className="mt-2 text-slate-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Priority</th>

              <th className="px-6 py-4 text-left">Assigned To</th>

              <th className="px-6 py-4 text-left">Due Date</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-4">
                  <Link
                    to={`/tasks/${task._id}`}
                    className="font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                  >
                    {task.title}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <TaskBadge type="status" value={task.status} />
                </td>

                <td className="px-6 py-4">
                  <TaskBadge type="priority" value={task.priority} />
                </td>

                <td className="px-6 py-4">{task.assignedTo?.name ?? "-"}</td>

                <td className="px-6 py-4">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 p-2">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <Link to={`/tasks/${task._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTask(task);
                        setOpenEdit(true);
                      }}
                      className="rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTask(task);
                        setOpenDelete(true);
                      }}
                      className="rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditTaskDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        task={selectedTask!}
        onUpdated={getTasks}
      />

      <DeleteTaskDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        taskId={selectedTask?._id ?? ""}
        onDeleted={getTasks}
      />
    </>
  );
};

export default TaskTable;
