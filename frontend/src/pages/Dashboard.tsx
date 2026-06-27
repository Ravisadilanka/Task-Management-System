import { useEffect, useState } from "react";

import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  LoaderCircle,
  TestTube2,
} from "lucide-react";

import api from "@/services/api";

import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentTasks from "@/components/dashboard/RecentTasks";

import type { Task } from "@/types/task";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading dashboard...
      </div>
    );
  }

  const total = tasks.length;

  const open = tasks.filter(
    (task) => task.status === "Open"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const testing = tasks.filter(
    (task) => task.status === "Testing"
  ).length;

  const done = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back. Here's an overview of
          your tasks.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard
          title="Total Tasks"
          value={total}
          color="bg-blue-600"
          icon={<ClipboardList size={28} />}
        />

        <DashboardCard
          title="Open"
          value={open}
          color="bg-yellow-500"
          icon={<Clock3 size={28} />}
        />

        <DashboardCard
          title="In Progress"
          value={inProgress}
          color="bg-indigo-500"
          icon={<LoaderCircle size={28} />}
        />

        <DashboardCard
          title="Testing"
          value={testing}
          color="bg-orange-500"
          icon={<TestTube2 size={28} />}
        />

        <DashboardCard
          title="Done"
          value={done}
          color="bg-green-600"
          icon={<CheckCircle2 size={28} />}
        />
      </div>

      {/* Recent Tasks */}

      <RecentTasks tasks={recentTasks} />
    </div>
  );
};

export default Dashboard;