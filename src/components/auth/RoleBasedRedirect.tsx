import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RoleBasedRedirectProps {
  fallbackPath?: string;
}

/**
 * Component that automatically redirects users based on their role
 * Used for routes that should redirect to different pages based on user role
 */
export const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ 
  fallbackPath = '/' 
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to fallback path
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Redirect based on user role
  const userRole = user?.role?.toLowerCase();
  
  switch (userRole) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'user':
    case 'customer':
      return <Navigate to="/" replace />;
    default:
      console.warn('Unknown user role:', userRole);
      return <Navigate to={fallbackPath} replace />;
  }
};

export default RoleBasedRedirect;
