import React from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Quản lý sản phẩm", path: "/admin/products" },
    { name: "Quản lý người dùng", path: "/admin/users" },
    { name: "Quản lý đơn hàng", path: "/admin/orders" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white shadow-xl p-6 flex flex-col">
      <div className="flex items-center mb-6">
        <div>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
      </div>
      <div className="border-t border-gray-700 my-4"></div>
      <nav className="flex-1">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          General
        </h3>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-3">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition-colors duration-200 ` +
                  (isActive
                    ? "bg-blue-600 font-bold text-white shadow-md"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white")
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-center text-sm text-gray-500 mt-auto">
        &copy; Tiki.
      </div>
    </aside>
  );
};

export default Sidebar;