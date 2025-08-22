import { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/api';
import type { User } from '../../types';

interface UserForm {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: 'admin' | 'user';
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // Fetch users on component mount
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentUser.id) {
        // Update user - only send fields that are defined and not empty
        const updateData: any = {};
        if (currentUser.name && currentUser.name.trim()) updateData.name = currentUser.name;
        if (currentUser.email && currentUser.email.trim()) updateData.email = currentUser.email;
        if (currentUser.phone !== undefined) updateData.phone = currentUser.phone; // Allow empty string
        if (currentUser.address !== undefined) updateData.address = currentUser.address; // Allow empty string
        if (currentUser.role) updateData.role = currentUser.role;

        // For password, only include if it's provided and not empty
        if (currentUser.password && currentUser.password.trim()) {
          updateData.password = currentUser.password;
        }
        
        const updatedUser = await updateUser(
          currentUser.id,
          updateData
        );
        setUsers(
          users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
      } else {
        // Add new user
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
      setCurrentUser({
        id: userToEdit.id,
        name: userToEdit.name,
        email: userToEdit.email,
        password: "", // Leave empty for editing - user can fill if they want to change
        phone: userToEdit.phone,
        address: userToEdit.address,
        role: userToEdit.role,
      });
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
    setCurrentUser({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    setIsEditing(false);
  };

  return {
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
  };
};
