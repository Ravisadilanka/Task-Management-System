import { useEffect, useState } from "react";
import api from "@/services/api";

import TaskToolbar from "@/components/tasks/TaskToolbar";
import TaskTable from "@/components/tasks/TaskTable";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";

import type { Task } from "@/types/task";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");

  const getTasks = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search);
      }

      if (status !== "all") {
        params.append("status", status);
      }

      if (priority !== "all") {
        params.append("priority", priority);
      }

      if (sort !== "newest") {
        params.append("sort", sort);
      }

      const response = await api.get<Task[]>(
        `/tasks?${params.toString()}`
      );

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [search, status, priority, sort]);

  return (
    <div className="h-full overflow-hidden flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all your tasks in one place.
        </p>
      </div>

      <TaskToolbar
        onCreate={() =>
          setOpenCreate(true)
        }
        search={search}
        status={status}
        priority={priority}
        sort={sort}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSortChange={setSort}
      />

      <TaskTable
        tasks={tasks}
        loading={loading}
        getTasks={getTasks}
      />

      <CreateTaskDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreated={getTasks}
      />
    </div>
  );
};

export default Tasks;