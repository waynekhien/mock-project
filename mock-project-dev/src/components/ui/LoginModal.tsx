import React from "react";
import { FiX } from "react-icons/fi";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

type View = "login" | "register";

export default function LoginModal({
  open,
  onClose,
  initialView = "login",
}: {
  open: boolean;
  onClose: () => void;
  initialView?: View;
}) {
  const [view, setView] = React.useState<View>(initialView);
  const [flash, setFlash] = React.useState<string | null>(null);

  // Đồng bộ khi mở lại modal
  React.useEffect(() => {
    if (open) {
      setView(initialView);
      setFlash(null);
    }
  }, [open, initialView]);

  // Tự ẩn flash sau 4s
  React.useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 4000);
    return () => clearTimeout(t);
  }, [flash]);

  if (!open) return null;

  // Handler: sau khi đăng ký xong -> quay về Login + hiện flash
  const handleRegisterSuccess = () => {
    setView("login");
    setFlash("Tạo tài khoản thành công, vui lòng đăng nhập.");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden bg-white mx-3">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          aria-label="Đóng"
        >
          <FiX size={22} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[60%] p-6 sm:p-8">
            {/* Flash message chỉ hiện ở tab Login */}
            {view === "login" && flash && (
              <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800 px-3 py-2 text-sm">
                {flash}
              </div>
            )}

            {view === "login" ? (
              <LoginForm
                onSwitch={() => setView("register")}
                onSuccess={onClose} // đăng nhập xong -> đóng modal
              />
            ) : (
              <RegisterForm
                onSwitch={() => setView("login")}
                onSuccess={handleRegisterSuccess} // đăng ký xong -> quay về Login + flash
              />
            )}
          </div>

          {/* Panel phải giống Tiki */}
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
