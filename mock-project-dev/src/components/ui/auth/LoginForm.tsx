import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";

export default function LoginForm({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess?: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const base = "w-full border-0 border-b px-0 py-2 text-[15px] focus:ring-0";
  const ok = "border-gray-300 focus:border-sky-500";
  const err = "border-rose-500 focus:border-rose-500";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onSuccess?.();
    } catch {
      setError("Thông tin đăng nhập không đúng");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Đăng nhập bằng email</h1>
      <p className="mt-1 text-sm text-slate-500">
        Nhập email và mật khẩu tài khoản Tiki
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <input
          type="email"
          placeholder="email@domain.com"
          className={`${base} ${error ? err : ok}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
        />
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Mật khẩu"
            className={`${base} pr-12 ${error ? err : ok}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-600 text-sm hover:underline"
          >
            {showPwd ? "Ẩn" : "Hiện"}
          </button>
        </div>

        {error && <div className="text-[13px] text-rose-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#ff424e] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="mt-3 space-y-2 text-sm">
        <button className="text-sky-600 hover:underline">Quên mật khẩu?</button>
        <div className="text-slate-600">
          Chưa có tài khoản?{" "}
          <button onClick={onSwitch} className="text-sky-600 hover:underline">
            Tạo tài khoản
          </button>
        </div>
      </div>
    </>
  );
}
