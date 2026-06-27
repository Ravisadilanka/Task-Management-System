import type { Task } from "@/types/task";
import TaskBadge from "../common/TaskBadge";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  tasks: Task[];
  loading: boolean;
}

const TaskTable = ({ tasks, loading }: Props) => {
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
              <td className="px-6 py-4">{task.title}</td>

              <td className="px-6 py-4">
                <TaskBadge type="status" value={task.status} />
              </td>

              <td className="px-6 py-4">
                <TaskBadge type="priority" value={task.priority} />
              </td>

              <td className="px-6 py-4">{task.assignedTo?.name}</td>

              <td className="px-6 py-4">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="rounded-lg p-2 hover:bg-slate-100">
                    <Eye size={18} />
                  </button>

                  <button className="rounded-lg p-2 hover:bg-blue-100 text-blue-600">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-lg p-2 hover:bg-red-100 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
