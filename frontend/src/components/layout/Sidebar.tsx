import {
  LayoutDashboard,
  CheckSquare,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden w-72 border-r bg-white lg:flex lg:flex-col">
      <div className="border-b h-20 items-center flex justify-center px-4">
        <h1 className="text-2xl font-bold text-indigo-600">Task Manager</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-100">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-100">
          <CheckSquare size={20} />
          Tasks
        </button>

      </nav>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
