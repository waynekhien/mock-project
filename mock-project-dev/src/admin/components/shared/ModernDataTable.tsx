import React, { useState, useMemo } from 'react';
import {
  Search,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  SortAsc,
  SortDesc
} from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title: string;
  searchPlaceholder?: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
  itemsPerPage?: number;
  loading?: boolean;
}

const ModernDataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  searchPlaceholder = "Tìm kiếm...",
  onView,
  onEdit,
  onDelete,
  onRefresh,
  itemsPerPage = 10,
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filter data
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 border-b border-slate-200/60">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-600 mt-1">
              Hiển thị {paginatedData.length} trong tổng số {sortedData.length} mục
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2.5 w-64 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  disabled={loading}
                  className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
                  title="Làm mới"
                >
                  <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                </button>
              )}
              

            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-slate-100 select-none' : ''
                  } ${column.width || ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col">
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <SortAsc className="w-4 h-4 text-blue-600" />
                          ) : (
                            <SortDesc className="w-4 h-4 text-blue-600" />
                          )
                        ) : (
                          <div className="flex flex-col opacity-30">
                            <ChevronUp className="w-3 h-3 -mb-1" />
                            <ChevronDown className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
                    <span className="text-slate-600">Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr 
                  key={row.id || index} 
                  className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-slate-900">
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        <div className="max-w-xs truncate" title={row[column.key]}>
                          {row[column.key]}
                        </div>
                      )}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onView && (
                          <button
                            onClick={() => onView(row.id)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row.id)}
                            className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <MoreHorizontal className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Không có dữ liệu</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Chưa có dữ liệu để hiển thị'}
                      </p>
                    </div>
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Xóa bộ lọc
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-t border-slate-200/60">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Trang <span className="font-medium">{currentPage}</span> trong tổng số <span className="font-medium">{totalPages}</span> trang
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all ${
                        pageNum === currentPage
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'border border-slate-200 hover:bg-white text-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDataTable;
