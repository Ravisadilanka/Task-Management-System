import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

import TaskBadge from "@/components/common/TaskBadge";

import type { Task } from "@/types/task";

interface Props {
  tasks: Task[];
}

const RecentTasks = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold">
          Recent Tasks
        </h2>

        <p className="mt-3 text-slate-500">
          No tasks found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-bold">
          Recent Tasks
        </h2>
      </div>

      <div>
        {tasks.slice(0, 5).map((task) => (
          <Link
            key={task._id}
            to={`/tasks/${task._id}`}
            className="flex flex-col gap-4 border-b p-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {task.assignedTo?.name ??
                  "Unassigned"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <TaskBadge
                type="priority"
                value={task.priority}
              />

              <TaskBadge
                type="status"
                value={task.status}
              />

              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Calendar size={16} />

                {task.dueDate
                  ? new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  : "-"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;