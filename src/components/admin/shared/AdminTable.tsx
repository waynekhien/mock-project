import React from "react";

interface RowData {
  id: string;
  [key: string]: any;
}

interface Column {
  key: keyof RowData;
  label: string;
}

interface AdminTableProps {
  data: RowData[];
  columns: Column[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetail: (id: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  onDetail,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {column.key === 'image' ? (
                    row[column.key] ? (
                      <img 
                        src={row[column.key] as string} 
                        alt="Product"
                        className="h-12 w-12 object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center"><span class="text-xs text-gray-500">No Image</span></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onDetail(row.id)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Xem
                </button>
                <button
                  onClick={() => onEdit(row.id)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;