import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  return (
    <div className="flex h-dvh bg-slate-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main
          key={location.pathname}
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;