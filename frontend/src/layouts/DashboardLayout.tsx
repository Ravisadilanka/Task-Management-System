import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
