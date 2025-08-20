import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from './Input';
import Alert from './Alert';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onBackToLogin }) => {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Vui lòng nhập đầy đủ thông tin');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }

      if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }

      // Call register function from AuthContext
      await register(formData.email, formData.password);
      setSuccess('Đăng ký thành công!');

      // Close modal immediately after successful registration
      // The AuthContext will handle automatic redirection based on user role
      onClose();
      setFormData({ email: '', password: '', confirmPassword: '' });
      setSuccess(null);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ email: '', password: '', confirmPassword: '' });
    setError(null);
    setSuccess(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden relative">
        {/* Close button - top right */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex">
          {/* Left side - Register form */}
          <div className="flex-1 p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={onBackToLogin}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img 
                  src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png" 
                  alt="arrow" 
                  className="w-5 h-5"
                />
              </button>
              <div className="heading">
                <h4 className="text-2xl font-bold text-gray-800 mb-1">Tạo tài khoản</h4>
                <p className="text-gray-600">Vui lòng nhập thông tin đăng ký</p>
              </div>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="input">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="input relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-16 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <span 
                  className="show-pass absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm cursor-pointer hover:underline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </span>
              </div>

              <div className="input relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-16 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <span 
                  className="show-pass absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm cursor-pointer hover:underline"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </form>

            {/* Social login and terms */}
            <div className="mt-8">
              <p className="social-heading text-center mb-4">
                <span className="bg-white px-4 text-gray-500 text-sm">Hoặc tiếp tục bằng</span>
              </p>
              
              <ul className="social__items flex justify-center space-x-4 mb-6">
                <li className="social__item">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png" 
                      alt="facebook"
                      className="w-8 h-8"
                    />
                  </button>
                </li>
                <li className="social__item">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png" 
                      alt="google"
                      className="w-8 h-8"
                    />
                  </button>
                </li>
              </ul>
              
              <p className="note text-xs text-gray-500 text-center leading-relaxed">
                Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
                <a href="https://hotro.tiki.vn/knowledge-base/post/850-dieu-khoan-su-dung" className="text-blue-600 hover:underline">
                  điều khoản sử dụng
                </a>{' '}
                và{' '}
                <a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan" className="text-blue-600 hover:underline">
                  Chính sách bảo mật thông tin cá nhân
                </a>{' '}
                của Tiki
              </p>
            </div>
          </div>

          {/* Right side - Marketing content */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-6">
                <picture className="webpimg-container">
                  <source 
                    type="image/webp" 
                    srcSet="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                  />
                  <img 
                    src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                    width="200" 
                    alt="Tiki Shopping"
                    className="mx-auto opacity-100"
                    style={{ width: '200px', height: 'auto' }}
                  />
                </picture>
              </div>
              <div className="content">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Mua sắm tại Tiki</h4>
                <span className="text-gray-600">Siêu ưu đãi mỗi ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
