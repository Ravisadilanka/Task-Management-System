import type { Task } from "@/types/task";

interface Props {
  tasks: Task[];
  loading: boolean;
}

const TaskTable = ({
  tasks,
  loading,
}: Props) => {
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

        <h3 className="text-xl font-semibold">
          No Tasks Found
        </h3>

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

            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Priority
            </th>

            <th className="px-6 py-4 text-left">
              Assigned To
            </th>

            <th className="px-6 py-4 text-left">
              Due Date
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (
            <tr
              key={task._id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-4">
                {task.title}
              </td>

              <td className="px-6 py-4">
                {task.status}
              </td>

              <td className="px-6 py-4">
                {task.priority}
              </td>

              <td className="px-6 py-4">
                {task.assignedTo?.name}
              </td>

              <td className="px-6 py-4">
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-center">
                View | Edit | Delete
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TaskTable;