import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Register from "@/pages/Register";
import DashboardLayout from "@/layouts/DashboardLayout";
import Tasks from "@/pages/Tasks";
import TaskDetails from "@/pages/TaskDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
