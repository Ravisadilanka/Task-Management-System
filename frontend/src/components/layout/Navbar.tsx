import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm md:px-6 lg:px-8">
      {/* Left */}

      <div className="flex items-center gap-4">
        {/* Mobile Menu */}

        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            {greeting} 👋
          </h2>

          <p className="hidden text-sm text-slate-500 sm:block">
            Welcome back,
            <span className="ml-1 font-semibold">
              {user?.name}
            </span>
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700 md:text-sm">
          {user?.role}
        </div>
      </div>
    </header>
  );
};

export default Navbar;