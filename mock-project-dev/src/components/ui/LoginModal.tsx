import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Input from "./Input";
import Alert from "./Alert";
import RegisterModal from "./RegisterModal";
import "../../styles/globals.css";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface LoginFormData {
  email: string;
  password: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.email || !formData.password) {
        setError("Vui lòng nhập đầy đủ email và mật khẩu");
        return;
      }
      await login(formData.email, formData.password);
      setSuccess("Đăng nhập thành công!");
      onClose();
      setFormData({ email: "", password: "" });
      setSuccess(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ email: "", password: "" });
    setError(null);
    setSuccess(null);
    setShowPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Wrapper relative để đặt nút X ra ngoài hộp trắng */}
      <div className="relative">
        {/* Nút X NẰM NGOÀI khung trắng */}
        <button
          onClick={handleClose}
          aria-label="Đóng"
          className="absolute -top-4 -right-4 z-50 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Hộp trắng */}
        <div className="w-[880px] max-w-[92vw] overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* TỈ LỆ 7-3 */}
          <div className="grid [grid-template-columns:7fr_3fr]">
            {/* Cột trái: form */}
            <div className="p-8">
              {/* Mũi tên trên – tiêu đề dưới */}
              <button
                onClick={handleClose}
                aria-label="Quay lại"
                className="mb-4 rounded-full p-2 hover:bg-gray-100"
              >
                <img
                  src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png"
                  alt="arrow"
                  className="h-5 w-5"
                />
              </button>

              <div className="mb-6">
                <h4 className="mb-1 text-2xl font-bold text-gray-800">
                  Đăng nhập bằng email
                </h4>
                <p className="text-gray-600">
                  Nhập email và mật khẩu tài khoản Tiki
                </p>
              </div>

              {error && (
                <Alert variant="error" className="mb-4">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="mb-4">
                  {success}
                </Alert>
              )}

              {/* Form với input “gạch dưới” */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  variant="underline"
                  type="email"
                  placeholder="acb@email.com"
                  className="px-0 placeholder-gray-400
             autofill:bg-transparent
             autofill:shadow-[inset_0_0_0_1000px_transparent]
             autofill:text-gray-900"
                />

                <div className="relative">
                  <Input
                    variant="underline"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    className="px-0 pr-12 placeholder-gray-400
               autofill:bg-transparent
               autofill:shadow-[inset_0_0_0_1000px_transparent]
               autofill:text-gray-900"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline">
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#ff424e] py-3 font-medium text-white transition-colors hover:bg-[#ff1f2d] disabled:opacity-50"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>

              {/* Liên kết căn trái */}
              <div className="mt-4 space-y-2 text-sm">
                <button className="text-blue-600 hover:underline">
                  Quên mật khẩu?
                </button>
                <div className="text-gray-600">
                  Chưa có tài khoản?{" "}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setShowRegister(true)}
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </div>
            </div>

            {/* Cột phải: hình minh hoạ */}
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
              <div className="text-center">
                <div className="mb-6">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                      alt="Tiki Shopping"
                      className="mx-auto"
                      style={{ width: 200, height: "auto" }}
                    />
                  </picture>
                </div>
                <h4 className="mb-2 text-xl font-semibold text-blue-800">
                  Mua sắm tại Tiki
                </h4>
                <span className="text-blue-600">Siêu ưu đãi mỗi ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onBackToLogin={() => setShowRegister(false)}
      />
    </div>
  );
};

export default LoginModal;
