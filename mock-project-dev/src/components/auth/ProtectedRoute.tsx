import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'customer';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && user?.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    // Redirect based on user's actual role
    const userRole = user?.role?.toLowerCase();
    const defaultRedirect = userRole === 'admin' ? '/admin' : '/';
    return <Navigate to={redirectTo || defaultRedirect} replace />;
  }

  // User is authenticated and has the required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
