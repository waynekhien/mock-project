import React from 'react';

interface UserForm {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: 'admin' | 'user';
}

interface UserFormProps {
  user: UserForm;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
}

const UserFormComponent: React.FC<UserFormProps> = ({
  user,
  isEditing,
  onSubmit,
  onChange,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">
        {isEditing ? "Sửa Người dùng" : "Thêm Người dùng mới"}
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nhập họ và tên"
              value={user.name || ""}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={user.email || ""}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu {!isEditing && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              name="password"
              placeholder={isEditing ? "Để trống nếu không thay đổi" : "Nhập mật khẩu"}
              value={user.password || ""}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required={!isEditing}
            />
            <p className="text-xs text-gray-500 mt-1">
              {isEditing ? "Chỉ nhập nếu muốn thay đổi mật khẩu" : "Mật khẩu cho tài khoản"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="0123456789"
              value={user.phone || ""}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">Số điện thoại liên hệ</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vai trò <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={user.role || "user"}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Quyền hạn trong hệ thống</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ
          </label>
          <textarea
            name="address"
            placeholder="Nhập địa chỉ đầy đủ"
            value={user.address || ""}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">Địa chỉ cư trú hoặc làm việc</p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Cập nhật" : "Thêm người dùng"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserFormComponent;
