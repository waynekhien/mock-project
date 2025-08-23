import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface OrderSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  onAdvancedSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

const OrderSearch: React.FC<OrderSearchProps> = ({
  onSearch,
  onAdvancedSearch,
  placeholder = "Tìm đơn hàng theo Mã đơn hàng, Tên sản phẩm, Email, Địa chỉ..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Auto search when user stops typing
    if (value.trim() === '') {
      onSearch('');
    }
  };

  const handleAdvancedSearch = () => {
    if (onAdvancedSearch) {
      onAdvancedSearch({
        ...filters,
        query: searchQuery
      });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({
      query: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    });
    onSearch('');
    setShowAdvanced(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 max-[389px]:border-none max-[389px]:rounded-none max-[389px]:p-2 max-[389px]:bg-white">
      {/* Main Search */}
      <form onSubmit={handleSubmit} className="relative mb-4 max-[389px]:mb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 max-[389px]:w-4 max-[389px]:h-4 max-[389px]:left-2" />
          <input
            type="search"
            name="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-40 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors max-[389px]:pl-8 max-[389px]:pr-20 max-[389px]:py-2 max-[389px]:text-sm max-[389px]:rounded-md"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 max-[389px]:gap-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors max-[389px]:px-2 max-[389px]:py-1 max-[389px]:border-0 max-[389px]:bg-gray-100"
              title="Tìm kiếm nâng cao"
            >
              <Filter className="w-4 h-4 max-[389px]:w-3 max-[389px]:h-3" />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors max-[389px]:px-3 max-[389px]:py-1 max-[389px]:text-xs"
            >
              Tìm
            </button>
          </div>
        </div>
      </form>

      {/* Advanced Search */}
      {showAdvanced && (
        <div className="border-t pt-4 space-y-4 max-[389px]:border-t-0 max-[389px]:pt-2 max-[389px]:space-y-2">
          <div className="flex items-center justify-between mb-3 max-[389px]:mb-2">
            <h4 className="font-medium text-gray-900 max-[389px]:text-sm">Tìm kiếm nâng cao</h4>
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 max-[389px]:text-xs"
            >
              <X className="w-4 h-4 max-[389px]:w-3 max-[389px]:h-3" />
              Xóa bộ lọc
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-[389px]:grid-cols-1 max-[389px]:gap-2">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 max-[389px]:text-xs">
                Trạng thái
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none max-[389px]:px-2 max-[389px]:py-1 max-[389px]:text-sm"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ thanh toán</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="shipping">Đang vận chuyển</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã huỷ</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 max-[389px]:text-xs">
                Từ ngày
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none max-[389px]:px-2 max-[389px]:py-1 max-[389px]:text-sm"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 max-[389px]:text-xs">
                Đến ngày
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none max-[389px]:px-2 max-[389px]:py-1 max-[389px]:text-sm"
              />
            </div>

            {/* Min Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 max-[389px]:text-xs">
                Từ số tiền (₫)
              </label>
              <input
                type="number"
                value={filters.minAmount || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value ? Number(e.target.value) : undefined }))}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none max-[389px]:px-2 max-[389px]:py-1 max-[389px]:text-sm"
              />
            </div>

            {/* Max Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 max-[389px]:text-xs">
                Đến số tiền (₫)
              </label>
              <input
                type="number"
                value={filters.maxAmount || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value ? Number(e.target.value) : undefined }))}
                placeholder="999999999"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none max-[389px]:px-2 max-[389px]:py-1 max-[389px]:text-sm"
              />
            </div>
          </div>

          {/* Advanced Search Button */}
          <div className="flex justify-end pt-3 border-t max-[389px]:pt-2 max-[389px]:border-t-0">
            <button
              type="button"
              onClick={handleAdvancedSearch}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors max-[389px]:w-full max-[389px]:px-4 max-[389px]:py-2 max-[389px]:text-sm"
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSearch;

