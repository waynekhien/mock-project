import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center bg-white p-6 rounded-2xl shadow-lg space-x-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Xin chào!</h2>
          <p className="text-gray-500">
            Đây là bảng điều khiển của bạn. Chúc bạn một ngày làm việc hiệu quả.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;