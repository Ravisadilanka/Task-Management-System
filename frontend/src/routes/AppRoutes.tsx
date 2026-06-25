import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login/" element={<Login />} />
                    <Route path="/register/" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="/" element={<Dashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;