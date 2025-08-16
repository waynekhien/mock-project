import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../admin/shared';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
