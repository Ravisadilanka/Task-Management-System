import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">

        {/* Navbar */}

        <header className="border-b p-4">
            TaskFlow
        </header>

        {/* Page */}

        <main className="p-6">
            <Outlet />
        </main>
    </div>
  )
}

export default DashboardLayout