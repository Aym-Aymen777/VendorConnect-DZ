// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';

import { ProtectRoute, RoleRoute } from '@/routes/ProtectedRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected - All Authenticated Users */}
        <Route element={<ProtectRoute />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Dashboard />} />
        </Route>

        {/* Role-Based Protected Routes */}
        <Route element={<RoleRoute role="supplier" />}>
          <Route path="/dashboard/supplier" element={<Dashboard />} />
        </Route>

        <Route element={<RoleRoute role="admin" />}>
          <Route path="/dashboard/admin" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
