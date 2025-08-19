import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from './Input';
import Alert from './Alert';
import RegisterModal from './RegisterModal';

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
    email: '',
    password: '',
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
      if (!formData.email || !formData.password) {
        setError('Vui lòng nhập đầy đủ email và mật khẩu');
        return;
      }

      await login(formData.email, formData.password);
      setSuccess('Đăng nhập thành công!');
      
      // Close modal after successful login
      setTimeout(() => {
        onClose();
        setFormData({ email: '', password: '' });
        setSuccess(null);
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ email: '', password: '' });
    setError(null);
    setSuccess(null);
    setShowPassword(false);
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
          {/* Left side - Login form */}
          <div className="flex-1 p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={handleClose}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img 
                  src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png" 
                  alt="arrow" 
                  className="w-5 h-5"
                />
              </button>
              <div className="heading">
                <h4 className="text-2xl font-bold text-gray-800 mb-1">Đăng nhập bằng email</h4>
                <p className="text-gray-600">Nhập email và mật khẩu tài khoản Tiki</p>
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
                  placeholder="acb@email.com"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>

            <p className="forgot-pass mt-6 text-center">
              <button className="text-blue-600 hover:underline text-sm">
                Quên mật khẩu?
              </button>
            </p>

            <p className="create-account mt-4 text-center text-gray-600 text-sm">
              Chưa có tài khoản?{' '}
              <span 
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => setShowRegister(true)}
              >
                Tạo tài khoản
              </span>
            </p>
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
