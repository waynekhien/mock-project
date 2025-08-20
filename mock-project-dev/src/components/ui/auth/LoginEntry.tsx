import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../../../contexts/AuthProvider";

export default function LoginEntry({
  onEmail, // bấm "Đăng nhập bằng email"
  onSwitch, // chuyển sang Register
  onSuccess, // đăng nhập thành công -> đóng modal
}: {
  onEmail: () => void;
  onSwitch: () => void;
  onSuccess?: () => void;
}) {
  const { googleLogin } = useAuth();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const base = "w-full border-0 border-b px-0 py-2 text-[15px] focus:ring-0";
  const ok = "border-gray-300 focus:border-sky-500";
  const bad = "border-rose-500 focus:border-rose-500";

  // giả lập xử lý phone (tuỳ bạn nối OTP sau)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!/^\d{9,11}$/.test(phone)) return setErr("Số điện thoại chưa hợp lệ");
    setLoading(true);
    try {
      // TODO: gửi OTP / next step
      console.log("[LoginEntry] continue with phone:", phone);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle(res: CredentialResponse) {
    const token = res.credential;
    if (!token) return setErr("Google từ chối phiên đăng nhập");
    try {
      await googleLogin(token); // đăng nhập bằng Google
      onSuccess?.(); // đóng modal
    } catch (e: any) {
      setErr(e?.message || "Đăng nhập Google thất bại");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Xin chào,</h1>
      <p className="mt-1 text-sm text-slate-600">
        Đăng nhập hoặc Tạo tài khoản
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Số điện thoại"
          className={`${base} ${err ? bad : ok}`}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))}
        />
        {err && <div className="text-[13px] text-rose-600">{err}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#ff424e] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Tiếp Tục"}
        </button>
      </form>

      <div className="mt-3">
        <button
          type="button"
          onClick={onEmail}
          className="text-sky-600 text-sm hover:underline"
        >
          Đăng nhập bằng email
        </button>
      </div>

      <div className="my-5 text-center text-sm text-slate-500">
        Hoặc tiếp tục bằng
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className="h-11 w-11 rounded-full shadow border border-slate-200 grid place-items-center hover:bg-slate-50"
          aria-label="Facebook"
        >
          <FaFacebookF className="text-[#1877F2]" size={18} />
        </button>

        <div className="h-11 w-11 grid place-items-center">
          <GoogleLogin
            type="icon"
            shape="circle"
            theme="outline"
            size="large"
            onSuccess={handleGoogle} // nhận credential như code ban đầu của bạn
            onError={() => setErr("Google từ chối phiên đăng nhập")}
          />
        </div>
      </div>

      <div className="mt-4 text-sm">
        Chưa có tài khoản?{" "}
        <button onClick={onSwitch} className="text-sky-600 hover:underline">
          Tạo tài khoản
        </button>
      </div>
    </>
  );
}
