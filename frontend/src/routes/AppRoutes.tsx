import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;