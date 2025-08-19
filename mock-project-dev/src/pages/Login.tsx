import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 👈 thêm

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null); // reset lỗi cũ
    try {
      await login(email, password);
      navigate("/account");
    } catch (e: any) {
      // 👇 thông báo giống UI Tiki
      setError("Thông tin đăng nhập không đúng");
      // (tuỳ chọn) xoá mật khẩu để nhập lại
      // setPassword("");
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full border-0 border-b px-0 py-2 text-sm focus:ring-0 transition-colors";
  const inputOk = "border-gray-300 focus:border-blue-500";
  const inputErr = "border-rose-500 focus:border-rose-500";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-3 py-10">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Left: form */}
          <div className="w-full md:w-[60%] p-6 sm:p-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center text-slate-500 hover:text-slate-700"
              aria-label="Quay lại"
            >
              <FiChevronLeft size={22} />
            </button>

            <h1 className="text-2xl font-semibold">Đăng nhập bằng email</h1>
            <p className="mt-1 text-sm text-slate-500">
              Nhập email và mật khẩu tài khoản Tiki
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
              {/* Email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="acb@email.com"
                className={`${inputBase} ${error ? inputErr : inputOk}`}
                aria-invalid={!!error}
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className={`${inputBase} pr-12 ${error ? inputErr : inputOk}`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "login-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-2 my-1 px-2 text-sky-600 text-sm rounded hover:bg-sky-50"
                >
                  {showPwd ? "Ẩn" : "Hiện"}
                </button>
              </div>

              {/* Thông báo lỗi (đỏ, sát dưới ô mật khẩu) */}
              {error && (
                <div
                  id="login-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-[13px] text-rose-600 mt-1"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#ff424e] text-white py-3 font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            {/* 2 dòng ngay dưới nhau */}
            <div className="mt-3 space-y-2 text-sm">
              <Link to="#" className="text-sky-600 hover:underline">
                Quên mật khẩu?
              </Link>
              <div className="text-slate-600">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-sky-600 hover:underline">
                  Tạo tài khoản
                </Link>
              </div>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="w-full md:w-[40%] bg-sky-50 p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-3">
            <img
              src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
              alt="Promo"
              className="w-40 h-40 object-contain"
            />
            <div>
              <h3 className="text-sky-800 font-semibold">Mua sắm tại Tiki</h3>
              <p className="text-sky-800 text-sm">Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
