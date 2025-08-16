import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="p-2 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 transition-all duration-300"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
