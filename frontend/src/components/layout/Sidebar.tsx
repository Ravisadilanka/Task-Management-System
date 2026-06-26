import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

import { navigation } from "@/constants/navigation";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="hidden w-72 flex-col bg-slate-900 text-white lg:flex">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Task Manager
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage your work smarter
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-5">

        {navigation.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-5 py-4 text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              {item.title}
            </NavLink>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-5">

        <button
          onClick={logout}
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-base text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={22} />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;