import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthProvider"; // nếu cần

export default function RegisterPage() {
  // const { register } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputBase =
    "w-full border-0 border-b px-0 py-2 text-[15px] leading-6 focus:ring-0 transition-colors";
  const inputOk = "border-gray-300 focus:border-sky-500";
  const inputErr = "border-rose-500 focus:border-rose-500";

  function validatePhone(v: string) {
    // đơn giản: 9-11 chữ số (tuỳ bạn chỉnh regex theo chuẩn VN)
    return /^\d{9,11}$/.test(v);
  }

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validatePhone(phone)) {
      setError("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }
    setLoading(true);
    try {
      // TODO: gọi API gửi OTP / tạo phiên đăng ký bằng số điện thoại
      // await api.post("/auth/request-otp", { phone });
      // navigate("/verify-otp?phone=" + encodeURIComponent(phone));
      console.log("Continue with phone:", phone);
    } catch (err: any) {
      setError("Không thể xử lý lúc này, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  }

  function handleFacebook() {
    // TODO: mở flow đăng ký qua Facebook
    console.log("Facebook signup clicked");
  }
  function handleGoogle() {
    // TODO: mở flow đăng ký qua Google
    console.log("Google signup clicked");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-3 py-10">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Left: form */}
          <div className="w-full md:w-[60%] p-6 sm:p-8">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center text-slate-500 hover:text-slate-700"
              aria-label="Quay lại"
            >
              <FiChevronLeft size={22} />
            </button>

            <h1 className="text-2xl font-semibold">Tạo tài khoản</h1>
            <p className="mt-1 text-sm text-slate-600">
              Vui lòng nhập số điện thoại
            </p>

            <form
              onSubmit={handleContinue}
              className="mt-5 space-y-4"
              noValidate
            >
              {/* Phone input: gạch dưới */}
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Số điện thoại"
                className={`${inputBase} ${error ? inputErr : inputOk}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))}
                aria-invalid={!!error}
                aria-describedby={error ? "register-error" : undefined}
              />

              {/* Lỗi */}
              {error && (
                <div
                  id="register-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-[13px] text-rose-600 mt-1"
                >
                  {error}
                </div>
              )}

              {/* Continue button: đỏ, full width */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#ff424e] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? "Đang xử lý..." : "Tiếp Tục"}
              </button>
            </form>

            {/* Divider text */}
            <div className="my-5 text-center text-sm text-slate-500">
              Hoặc tiếp tục bằng
            </div>

            {/* Social buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleFacebook}
                className="h-11 w-11 rounded-full shadow border border-slate-200 grid place-items-center hover:bg-slate-50"
                aria-label="Đăng ký bằng Facebook"
              >
                <FaFacebookF className="text-[#1877F2]" size={18} />
              </button>
              <button
                onClick={handleGoogle}
                className="h-11 w-11 rounded-full shadow border border-slate-200 grid place-items-center hover:bg-slate-50"
                aria-label="Đăng ký bằng Google"
              >
                <FcGoogle size={20} />
              </button>
            </div>

            {/* Terms */}
            <p className="mt-5 text-[12px] leading-5 text-slate-500">
              Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
              <a href="#" className="text-sky-600 hover:underline">
                điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-sky-600 hover:underline">
                Chính sách bảo mật thông tin cá nhân
              </a>{" "}
              của Tiki
            </p>
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
              <p className="text-slate-600 text-sm">Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
