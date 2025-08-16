import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import OrdersAdmin from "./pages/OrdersAdmin";
import ProductsAdmin from "./pages/ProductsAdmin";
import UsersAdmin from "./pages/UsersAdmin";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <div className="flex bg-slate-100 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="users" element={<UsersAdmin />} />
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
              </Routes>
            </AdminLayout>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
