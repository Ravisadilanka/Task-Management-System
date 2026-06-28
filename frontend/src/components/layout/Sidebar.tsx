import { NavLink } from "react-router-dom";
import { X, LogOut } from "lucide-react";

import { navigation } from "@/constants/navigation";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({
  open,
  onClose,
}: Props) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-full w-72 flex-col
          bg-slate-900 text-white shadow-2xl
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile Close Button */}

        <div className="flex items-center justify-between border-b border-slate-800 p-6 lg:hidden">
          <h1 className="text-2xl font-bold">
            Task Manager
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Desktop Logo */}

        <div className="hidden border-b border-slate-800 p-8 lg:block">
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
                onClick={onClose}
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
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-base text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={22} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;