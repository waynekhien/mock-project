import React from 'react';
import { AdminTable } from '../shared';
import type { User } from '../../../types';

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetail: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Họ và tên" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Số điện thoại" },
    { key: "role", label: "Vai trò" },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  // Format data for AdminTable
  const formattedUsers = users.map(user => {
    const getRoleBadge = (role: string) => {
      const roleMap = {
        admin: 'admin',
        customer: 'user'
      };
      return roleMap[role as keyof typeof roleMap] || role;
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || 'Chưa có',
      role: getRoleBadge(user.role),
      createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A',
    };
  });

  if (users.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-500">Không có người dùng nào để hiển thị</p>
      </div>
    );
  }

  return (
    <AdminTable
      data={formattedUsers}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      onDetail={onDetail}
    />
  );
};

export default UserTable;
