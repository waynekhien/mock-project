import React from "react";
import {
  Phone,
  Play,
} from "lucide-react";
import payMethodImage from "../../assets/payMethod.png";
import facebookImage from "../../assets/facebook.png";
import zaloImage from "../../assets/zalo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4 md:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gray-500" />
                <span>Hotline: 1900-6035</span>
              </li>
              <li className="text-xs text-gray-500">(1000 đ/phút, 8-21h cả T7, CN)</li>
              <li><a href="https://hotro.tiki.vn/knowledge-base" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Các câu hỏi thường gặp</a></li>
              <li><a href="https://hotro.tiki.vn/knowledge-base" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Gửi yêu cầu hỗ trợ</a></li>
              <li><a href="#" className="hover:text-blue-600">Hướng dẫn đặt hàng</a></li>
              <li><a href="#" className="hover:text-blue-600">Phương thức vận chuyển</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách kiểm hàng</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-blue-600">Hướng dẫn trả góp</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách hàng nhập khẩu</a></li>
              <li className="mt-4">
                <p className="text-xs">Hỗ trợ khách hàng:</p>
                <p className="text-xs">hotro@tiki.vn</p>
              </li>
              <li>
                <p className="text-xs">Báo lỗi bảo mật:</p>
                <p className="text-xs">security@tiki.vn</p>
              </li>
            </ul>
          </div>

          {/* Về Tiki */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Về Tiki</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600">Giới thiệu Tiki</a></li>
              <li><a href="#" className="hover:text-blue-600">Tiki Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách bảo mật thanh toán</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách bảo mật thông tin cá nhân</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách giải quyết khiếu nại</a></li>
              <li><a href="#" className="hover:text-blue-600">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-blue-600">Giới thiệu Tiki Xu</a></li>
              <li><a href="#" className="hover:text-blue-600">Tiếp thị liên kết cùng Tiki</a></li>
              <li><a href="#" className="hover:text-blue-600">Bán hàng doanh nghiệp</a></li>
              <li><a href="#" className="hover:text-blue-600">Điều kiện vận chuyển</a></li>
            </ul>
          </div>

          {/* Hợp tác và liên kết */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Hợp tác và liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="http://online.gov.vn/Home/WebDetails/21193" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Quy chế hoạt động Sàn GDTMĐT</a></li>
              <li><a href="#" className="hover:text-blue-600">Bán hàng cùng Tiki</a></li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Chứng nhận bởi</h4>
              <div className="flex items-center gap-3">
                <a href="http://online.gov.vn/Home/WebDetails/21193" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg" alt="Bộ Công Thương" className="h-8 w-auto" />
                </a>
                <a href="http://online.gov.vn/Home/WebDetails/21193" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png" alt="Đăng ký Bộ Công Thương" className="h-8 w-auto" />
                </a>
                <a href="https://www.dmca.com/Protection/Status.aspx?ID=388d758c-6722-4245-a2b0-1d2415e70127&refurl=https://tiki.vn/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=388d758c-6722-4245-a2b0-1d2415e70127" alt="DMCA Protection Status" className="h-8 w-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán và Dịch vụ giao hàng */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Phương thức thanh toán</h3>
            <div className="mb-6">
              <img
                src={payMethodImage}
                alt="Phương thức thanh toán"
                className="w-full max-w-[280px] h-auto rounded border"
                onError={(e) => {
                  // Fallback to text-based payment methods if image not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="grid grid-cols-3 gap-2">
                        <div class="bg-white border rounded p-2 flex items-center justify-center h-8">
                          <span class="text-blue-600 font-bold text-xs">VISA</span>
                        </div>
                        <div class="bg-white border rounded p-2 flex items-center justify-center h-8">
                          <span class="text-blue-600 font-bold text-xs">MasterCard</span>
                        </div>
                        <div class="bg-white border rounded p-2 flex items-center justify-center h-8">
                          <span class="text-blue-600 font-bold text-xs">JCB</span>
                        </div>
                        <div class="bg-white border rounded p-2 flex items-center justify-center h-8">
                          <span class="text-pink-600 font-bold text-xs">MoMo</span>
                        </div>
                        <div class="bg-white border rounded p-2 flex items-center justify-center h-8">
                          <span class="text-blue-500 font-bold text-xs">ZaloPay</span>
                        </div>
                        <div class="bg-white border rounded p-2 flex items-center justify-center h-8">
                          <span class="text-gray-600 font-bold text-xs">ATM</span>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">Dịch vụ giao hàng</h4>
              <div className="bg-white rounded p-2 border">
                <img src="https://salt.tikicdn.com/ts/upload/74/56/ab/e71563afb23e3f34a148fe1b7d3413c5.png" alt="TikiNOW - Giao hàng siêu tốc" className="h-10 w-auto" />
              </div>
            </div>
          </div>

          {/* Kết nối với chúng tôi */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Kết nối với chúng tôi</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/tiki.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img
                  src={facebookImage}
                  alt="Facebook Tiki"
                  className="w-full h-full object-cover"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxTp8K7VP3jQXpqmRyKjxyA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Play size={16} className="text-white ml-0.5" />
              </a>
              <a
                href="https://zalo.me/tiki"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img
                  src={zaloImage}
                  alt="Zalo Tiki"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">Tải ứng dụng trên điện thoại</h4>
              <div className="flex gap-3">
                <div className="flex-1">
                  <img 
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png" 
                    alt="QR Code Tiki App" 
                    className="w-20 h-20 border border-gray-300 rounded"
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-20 h-20 border border-gray-300 rounded flex items-center justify-center bg-gray-100"><span class="text-gray-400 text-xs">QR Code</span></div>';
                      }
                    }}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <a href="https://apps.apple.com/app/tiki/id958100553" className="block">
                    <img 
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png" 
                      alt="Download on App Store"
                      className="w-full h-auto"
                    />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid" className="block">
                    <img 
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png" 
                      alt="Get it on Google Play"
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6">
          <div className="text-center text-xs text-gray-500">
            <p>© 2023 - Bản quyền của Công Ty Cổ Phần Tiki</p>
            <p className="mt-1">
              Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh
            </p>
            <p className="mt-1">
              Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, không hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
