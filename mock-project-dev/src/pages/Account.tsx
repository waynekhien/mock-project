import React from "react";
import { useAuth } from "../contexts/AuthProvider";

export default function Account() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-semibold mb-2">Bạn chưa đăng nhập</h1>
        <p className="text-slate-600">
          Hãy đăng nhập để xem thông tin tài khoản.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Tài khoản</h1>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
        {user.name && (
          <div>
            <span className="font-medium">Tên:</span> {user.name}
          </div>
        )}
      </div>
      <button
        onClick={logout}
        className="mt-6 rounded bg-rose-600 text-white px-4 py-2"
      >
        Đăng xuất
      </button>
    </div>
  );
}
