import React from 'react';
import { Zap, Calendar, Clock, RefreshCw } from 'lucide-react';

interface WelcomeSectionProps {
  userName?: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName,
  onRefresh,
  isRefreshing = false
}) => {
  const currentTime = new Date();

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Chào mừng, {userName || 'Admin'}! 
              </h1>
              <p className="text-gray-600">
                Tổng quan hoạt động cửa hàng sách
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{currentTime.toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Làm mới</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
