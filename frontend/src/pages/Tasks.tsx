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

  const getTasks = async () => {
    try {
      const response = await api.get<Task[]>("/tasks");

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tasks</h1>

        <p className="mt-2 text-slate-500">
          Manage all your tasks in one place.
        </p>
      </div>

      <TaskToolbar onCreate={() => setOpenCreate(true)} />

      <TaskTable tasks={tasks} loading={loading} />

      <CreateTaskDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreated={getTasks}
      />
    </div>
  );
};

export default Tasks;
