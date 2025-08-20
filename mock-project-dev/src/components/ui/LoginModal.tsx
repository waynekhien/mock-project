import React from "react";
import { FiX } from "react-icons/fi";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import LoginEntry from "./auth/LoginEntry";

type View = "entry" | "email" | "register";

export default function LoginModal({
  open,
  onClose,
  initialView = "entry", // mặc định mở ở màn giống ảnh
}: {
  open: boolean;
  onClose: () => void;
  initialView?: View;
}) {
  const [view, setView] = React.useState<View>(initialView);

  React.useEffect(() => {
    if (open) setView(initialView);
  }, [open, initialView]);

  if (!open) return null;

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
            {view === "entry" && (
              <LoginEntry
                onEmail={() => setView("email")}
                onSwitch={() => setView("register")}
                onSuccess={onClose} // đăng nhập google xong -> đóng modal
              />
            )}

            {view === "email" && (
              <LoginForm
                onSwitch={() => setView("register")}
                onSuccess={onClose} // đăng nhập email xong -> đóng modal
              />
            )}

            {view === "register" && (
              <RegisterForm
                onSwitch={() => setView("email")} // từ register quay về login email
                onSuccess={() => setView("email")} // đăng ký xong -> về login email
              />
            )}
          </div>

          {/* Panel phải giữ nguyên */}
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
