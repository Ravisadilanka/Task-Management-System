import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden bg-indigo-600 text-white lg:flex lg:flex-col lg:justify-center lg:px-20">
          <h1 className="text-5xl font-bold">
            Task Manager
          </h1>

          <p className="mt-6 max-w-md text-lg text-indigo-100">
            Organize your work, collaborate with your team,
            and manage projects efficiently.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;