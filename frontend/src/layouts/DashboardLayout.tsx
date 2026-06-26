import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 px-8 pb-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;