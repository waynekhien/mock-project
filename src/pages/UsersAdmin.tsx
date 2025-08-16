import React, { useState, useEffect } from "react";
import AdminTable from "../components/AdminTable";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api";
import { User } from "../types";

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<
    Omit<User, "id" | "createdAt"> & { id?: string }
  >({
    username: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentUser.id) {
        const updatedUser = await updateUser(currentUser.id, currentUser);
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      } else {
        const newUser = await createUser(
          currentUser as Omit<User, "id" | "createdAt">
        );
        setUsers([...users, newUser]);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: string) => {
    const userToEdit = users.find((u) => u.id === id);
    if (userToEdit) {
      setCurrentUser(userToEdit);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentUser({ username: "", email: "", role: "user" });
    setIsEditing(false);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Tên người dùng" },
    { key: "email", label: "Email" },
    { key: "role", label: "Vai trò" },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  if (loading) return <div className="text-center p-4">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Người dùng</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? "Sửa Người dùng" : "Thêm Người dùng mới"}
        </h3>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Tên người dùng"
            value={currentUser.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={currentUser.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <select
            name="role"
            value={currentUser.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Cập nhật" : "Thêm người dùng"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </form>
      </div>

      <AdminTable
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => alert(`Xem chi tiết người dùng: ${id}`)}
      />
    </div>
  );
};

export default UsersAdmin;
