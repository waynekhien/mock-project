import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../../../contexts/AuthProvider";
// import { api } from "../../../lib/api"; // dùng nếu muốn gọi API register-only

type Props = {
  onSwitch: () => void;
  onSuccess?: () => void; // báo cho Modal: đã đăng ký xong -> chuyển sang tab Login
};

export default function RegisterForm({ onSwitch, onSuccess }: Props) {
  // const { googleLogin } = useAuth();  // ❌ KHÔNG dùng cho flow "register-only"
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [gLoading, setGLoading] = useState(false);
  const [gError, setGError] = useState<string | null>(null);

  const base = "w-full border-0 border-b px-0 py-2 text-[15px] focus:ring-0";
  const ok = "border-gray-300 focus:border-sky-500";
  const bad = "border-rose-500 focus:border-rose-500";
  const valid = (v: string) => /^\d{9,11}$/.test(v);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!valid(phone)) return setError("Vui lòng nhập số điện thoại hợp lệ");

    setLoading(true);
    try {
      // TODO: gọi API register bằng số điện thoại
      // await api.post("/register", { phone, ... });
      onSuccess?.(); // ✅ quay lại tab Login
    } catch {
      setError("Không thể xử lý lúc này, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(res: CredentialResponse) {
    const credential = res.credential;
    if (!credential) {
      setGError("Không nhận được credential từ Google");
      return;
    }
    setGError(null);
    setGLoading(true);
    try {
      // ✅ Flow "register-only": tạo tài khoản trên server nhưng KHÔNG đăng nhập
      // Nếu backend có endpoint riêng:
      // await api.post("/auth/google-register", { credential });

      // Tạm thời: bỏ qua gọi API, chỉ báo thành công để về Login
      onSuccess?.();
    } catch (e: any) {
      setGError(e?.message || "Đăng ký bằng Google thất bại");
    } finally {
      setGLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Tạo tài khoản</h1>
      <p className="mt-1 text-sm text-slate-600">Vui lòng nhập số điện thoại</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Số điện thoại"
          className={`${base} ${error ? bad : ok}`}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))}
          aria-invalid={!!error}
        />
        {error && <div className="text-[13px] text-rose-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#ff424e] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Tiếp Tục"}
        </button>
      </form>

      <div className="my-5 text-center text-sm text-slate-500">
        Hoặc tiếp tục bằng
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          className="h-11 w-11 rounded-full shadow border border-slate-200 grid place-items-center hover:bg-slate-50"
          aria-label="Facebook"
          type="button"
        >
          <FaFacebookF className="text-[#1877F2]" size={18} />
        </button>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setGError("Google từ chối phiên đăng ký")}
        />
      </div>

      {gLoading && (
        <div className="mt-2 text-sm text-slate-500">Đang xử lý…</div>
      )}
      {gError && <div className="mt-2 text-sm text-rose-600">{gError}</div>}

      <p className="mt-5 text-[12px] text-slate-500">
        Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
        <a href="#" className="text-sky-600 hover:underline">
          điều khoản sử dụng
        </a>{" "}
        và{" "}
        <a href="#" className="text-sky-600 hover:underline">
          Chính sách bảo mật
        </a>{" "}
        của Tiki
      </p>

      <div className="mt-4 text-sm">
        Đã có tài khoản?{" "}
        <button
          onClick={onSwitch}
          className="text-sky-600 hover:underline"
          type="button"
        >
          Đăng nhập
        </button>
      </div>
    </>
  );
}
