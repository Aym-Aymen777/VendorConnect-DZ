// src/routes/ProtectedRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const ProtectRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export const RoleRoute = ({ role }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return user.role === role ? <Outlet /> : <Navigate to="/" />;
};
