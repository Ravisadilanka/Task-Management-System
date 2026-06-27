import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";

import { ArrowLeft, Calendar, Pencil, Trash2, User } from "lucide-react";

import api from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import TaskBadge from "@/components/common/TaskBadge";

import type { Task } from "@/types/task";

const TaskDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [task, setTask] = useState<Task | null>(null);

  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);

  const getTask = async () => {
    try {
      const response = await api.get<Task>(`/tasks/${id}`);

      setTask(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);

      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-sm">Loading task...</div>
    );
  }

  if (!task) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-sm">Task not found.</div>
    );
  }

  const canEdit = user?.role === "admin" || user?._id === task.createdBy._id;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/tasks"
            className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Tasks
          </Link>

          <h1 className="text-4xl font-bold">{task.title}</h1>
        </div>

        {canEdit && (
          <div className="flex gap-3">
            <Button onClick={() => setOpenEdit(true)}>
              <Pencil size={18} />
              Edit
            </Button>

            <Button variant="destructive" onClick={deleteTask}>
              <Trash2 size={18} />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Status */}

      <div className="flex gap-3">
        <TaskBadge type="status" value={task.status} />

        <TaskBadge type="priority" value={task.priority} />
      </div>

      {/* Description */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Description</h2>

        <p className="leading-7 text-slate-600">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Details */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <User size={18} />

            <h2 className="font-semibold">Created By</h2>
          </div>

          <p className="font-medium">{task.createdBy.name}</p>

          <p className="text-sm text-slate-500">{task.createdBy.email}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <User size={18} />

            <h2 className="font-semibold">Assigned To</h2>
          </div>

          {task.assignedTo ? (
            <>
              <p className="font-medium">{task.assignedTo.name}</p>

              <p className="text-sm text-slate-500">{task.assignedTo.email}</p>
            </>
          ) : (
            <p className="text-slate-500">Unassigned</p>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Calendar size={18} />

            <h2 className="font-semibold">Due Date</h2>
          </div>

          <p>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
        </div>
      </div>

      <EditTaskDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        task={task}
        onUpdated={getTask}
      />
    </div>
  );
};

export default TaskDetails;
