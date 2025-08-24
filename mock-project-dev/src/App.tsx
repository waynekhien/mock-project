
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, ProductDetail, CartPage, Checkout, OrderSuccess, Profile } from './pages';

// Lazy load admin components
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const ProductManagement = lazy(() => import('./admin/pages/ProductManagement'));
const UserManagement = lazy(() => import('./admin/pages/UserManagement'));
const OrderManagement = lazy(() => import('./admin/pages/OrderManagement'));
import { AdminLayout } from './components/layout';
import { ProtectedRoute } from './components/auth';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { useRoleBasedRedirect } from './hooks';

// Component to handle role-based redirection
const AppRoutes: React.FC = () => {
  useRoleBasedRedirect();

  return (
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - Protected with admin role requirement */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={
                <Suspense fallback={<div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="products" element={
                <Suspense fallback={<div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>}>
                  <ProductManagement />
                </Suspense>
              } />
              <Route path="users" element={
                <Suspense fallback={<div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>}>
                  <UserManagement />
                </Suspense>
              } />
              <Route path="orders" element={
                <Suspense fallback={<div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>}>
                  <OrderManagement />
                </Suspense>
              } />
            </Route>
          </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
