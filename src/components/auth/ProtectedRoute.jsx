import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';

export default function ProtectedRoute({ requiredRole }) {
  const { role } = useHealth();
  const currentRole = role || localStorage.getItem('role');

  if (!currentRole || (requiredRole && currentRole !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
