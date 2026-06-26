import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  const greeting =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="flex items-center justify-between bg-slate-50 px-8 py-8">

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          {greeting} 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Welcome back,{" "}
          <span className="font-semibold">
            {user?.name}
          </span>
        </p>

      </div>

      <div className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold capitalize text-blue-700">

        {user?.role}

      </div>

    </header>
  );
};

export default Navbar;