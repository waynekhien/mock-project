
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, ProductDetail, Dashboard, ProductManagement, UserManagement, OrderManagement } from './pages';
import { AdminLayout } from './components/layout';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
