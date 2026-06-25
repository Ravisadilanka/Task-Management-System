import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-6">
  <h1 className="text-3xl font-bold">
    Dashboard Content
  </h1>
</main>

      </div>

    </div>
  );
};

export default DashboardLayout;