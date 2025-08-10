import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Thông tin liên hệ */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
          <p>Hotline: 1900-6035</p>
          <p>1000 đ/phút - 24h CN</p>
          <p>Đ/c: 52 Út Tịch, Phường 4, Quận Tân Bình, TP. HCM</p>
          <p>Email: hotro@tiki.vn</p>
          <p>Chính sách bảo mật: security@tiki.vn</p>
        </div>

        {/*Tiki */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Về Tiki</h3>
          <p>Giới thiệu Tiki</p>
          <p>Tuyển dụng</p>
          <p>Chính sách bảo mật thanh toán</p>
          <p>Chính sách giải quyết khiếu nại</p>
          <p>Điều khoản sử dụng</p>
        </div>

        {/* Hợp tác và liên kết */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Hợp tác và liên kết</h3>
          <p>Quy chế hoạt động sàn GDTMDT</p>
          <p>Bán hàng cùng Tiki</p>
        </div>

        {/* Phương thức thanh toán */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
          <div className="flex flex-wrap gap-2">
            <FontAwesomeIcon
              icon={["fab", "cc-visa"]}
              className="text-white text-2xl"
            />
            <FontAwesomeIcon
              icon={["fab", "cc-mastercard"]}
              className="text-white text-2xl"
            />
            <FontAwesomeIcon
              icon={["fas", "credit-card"]}
              className="text-white text-2xl"
            />
            <FontAwesomeIcon
              icon={["fab", "cc-paypal"]}
              className="text-white text-2xl"
            />
          </div>
        </div>

        {/* Tài khoản và tải ứng dụng */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">
            Tải ứng dụng trên điện thoại
          </h3>
          <div className="flex space-x-2 mb-4">
            <a href="https://www.apple.com/app-store/">
              <FontAwesomeIcon
                icon={["fab", "apple"]}
                className="text-white text-2xl"
              />
            </a>
            <a href="https://play.google.com/store">
              <FontAwesomeIcon
                icon={["fab", "google-play"]}
                className="text-white text-2xl"
              />
            </a>
          </div>
          <p className="text-sm">Đích vụ giao hàng</p>
        </div>
      </div>

      {/* Thông tin pháp lý và mạng xã hội */}
      <div className="max-w-7xl mx-auto mt-8 text-center text-sm border-t border-gray-700 pt-4">
        <p>
          Công ty TNHH Tiki - Địa chỉ: 52 Út Tịch, Phường 4, Quận Tân Bình, TP.
          HCM
        </p>
        <p>
          Giấy CNĐKDN: 0309532909 do Sở KHĐT TP. HCM cấp lần đầu ngày 09/01/2010
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com">
            <FontAwesomeIcon
              icon={["fab", "facebook-f"]}
              className="text-white text-2xl"
            />
          </a>
          <a href="https://youtube.com">
            <FontAwesomeIcon
              icon={["fab", "youtube"]}
              className="text-white text-2xl"
            />
          </a>
          <a href="https://zalo.me">
            <FontAwesomeIcon
              icon={["fab", "comment"]}
              className="text-white text-2xl"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
