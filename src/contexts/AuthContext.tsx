import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../services/api';
import type { LoginResponse, UserUpdateData } from '../types';

interface AuthContextType {
  user: LoginResponse['user'] | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserContext: (userData: UserUpdateData) => void;
  loading: boolean;
  shouldRedirect: boolean;
  clearRedirectFlag: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('AuthContext - initializing auth');
        const storedToken = authApi.getAccessToken();
        const storedUser = authApi.getCurrentUser();
        console.log('AuthContext - stored data:', { storedToken, storedUser });

        if (storedToken && storedUser) {
          setAccessToken(storedToken);
          setUser(storedUser);
          console.log('AuthContext - restored user session');
        } else {
          console.log('AuthContext - no stored session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        authApi.logout();
      } finally {
        setLoading(false);
        console.log('AuthContext - initialization completed');
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('AuthContext - attempting login with:', { email, password });
      const response = await authApi.login({ email, password });
      console.log('AuthContext - login response:', response);

      // Save to localStorage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('AuthContext - saved to localStorage');

      // Update state
      setAccessToken(response.accessToken);
      setUser(response.user);
      console.log('AuthContext - updated state');

      // Set flag to trigger redirect
      setShouldRedirect(true);
      console.log('AuthContext - login completed successfully');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      // Call register API endpoint
      const response = await authApi.register({ email, password });

      // Save to localStorage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Update state
      setAccessToken(response.accessToken);
      setUser(response.user);

      // Set flag to trigger redirect
      setShouldRedirect(true);
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      console.log('AuthContext - logging out');
      // Clear localStorage
      authApi.logout();
      
      // Clear state
      setAccessToken(null);
      setUser(null);
      console.log('AuthContext - logout completed');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserContext = (userData: UserUpdateData) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      // Update localStorage as well
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Function to clear redirect flag
  const clearRedirectFlag = () => {
    setShouldRedirect(false);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!user && !!accessToken,
    login,
    register,
    logout,
    updateUserContext,
    loading,
    shouldRedirect,
    clearRedirectFlag,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
