import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to handle role-based redirection after authentication
 */
export const useRoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { user, shouldRedirect, clearRedirectFlag } = useAuth();

  useEffect(() => {
    if (shouldRedirect && user) {
      const userRole = user.role?.toLowerCase();
      
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
        case 'customer':
          navigate('/');
          break;
        default:
          console.warn('Unknown user role:', userRole);
          navigate('/');
          break;
      }
      
      // Clear the redirect flag
      clearRedirectFlag();
    }
  }, [shouldRedirect, user, navigate, clearRedirectFlag]);
};

export default useRoleBasedRedirect;
