import React from "react";
import { UserForm, UserTable } from "../../components/admin/users";
import { useUserManagement } from "../../hooks/admin";

const UsersAdmin: React.FC = () => {
  const {
    users,
    loading,
    error,
    isEditing,
    currentUser,
    handleInputChange,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
    resetForm,
  } = useUserManagement();

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Người dùng</h2>

      <UserForm
        user={currentUser}
        isEditing={isEditing}
        onSubmit={handleAddOrUpdate}
        onChange={handleInputChange}
        onCancel={resetForm}
      />

      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => alert(`Xem chi tiết người dùng: ${id}`)}
      />
    </div>
  );
};

export default UsersAdmin;
