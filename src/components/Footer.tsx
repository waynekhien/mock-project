import React from "react";
import {
  CreditCard,
  CreditCardIcon,
  Smartphone,
  Apple,
  Play,
  Facebook,
  Youtube,
  MessageCircle,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
          <p className="flex items-center gap-2">
            <Phone size={16} /> Hotline: 1900-6035
          </p>
          <p>1000 đ/phút - 24h CN</p>
          <p className="flex items-center gap-2">
            <Building2 size={16} /> 52 Út Tịch, P.4, Q.Tân Bình, TP.HCM
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} /> hotro@tiki.vn
          </p>
          <p className="flex items-center gap-2">
            <ShieldCheck size={16} /> security@tiki.vn
          </p>
        </div>

        {/* Về Tiki */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Về Tiki</h3>
          <ul className="space-y-1">
            <li>Giới thiệu Tiki</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật thanh toán</li>
            <li>Chính sách giải quyết khiếu nại</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>

        {/* Hợp tác */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hợp tác & liên kết</h3>
          <ul className="space-y-1">
            <li>Quy chế hoạt động sàn GDTMDT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>
        </div>

        {/* Thanh toán */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
          <div className="flex flex-wrap gap-3">
            <CreditCard size={28} />
            <CreditCardIcon size={28} />
            <Smartphone size={28} />
          </div>
        </div>

        {/* Ứng dụng */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Tải ứng dụng trên điện thoại
          </h3>
          <div className="flex space-x-3 mb-4">
            <a
              href="https://www.apple.com/app-store/"
              className="hover:text-gray-400"
            >
              <Apple size={28} />
            </a>
            <a
              href="https://play.google.com/store"
              className="hover:text-gray-400"
            >
              <Play size={28} />
            </a>
          </div>
          <p className="text-sm">Dịch vụ giao hàng nhanh chóng</p>
        </div>
      </div>

      {/* Pháp lý & Mạng xã hội */}
      <div className="max-w-7xl mx-auto mt-8 text-center text-sm border-t border-gray-800 pt-4">
        <p>
          Công ty TNHH Tiki - Địa chỉ: 52 Út Tịch, P.4, Q.Tân Bình, TP.HCM
        </p>
        <p>
          Giấy CNĐKDN: 0309532909 do Sở KHĐT TP.HCM cấp lần đầu ngày 09/01/2010
        </p>
        <div className="flex justify-center space-x-5 mt-3">
          <a href="https://facebook.com" className="hover:text-gray-400">
            <Facebook size={26} />
          </a>
          <a href="https://youtube.com" className="hover:text-gray-400">
            <Youtube size={26} />
          </a>
          <a href="https://zalo.me" className="hover:text-gray-400">
            <MessageCircle size={26} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
