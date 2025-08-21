import React, { useState, useEffect } from 'react';
import { MapPin, Edit3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';


interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
}

const DeliveryAddress: React.FC = () => {
  const { user, updateUserContext } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Load user's existing address on mount
  useEffect(() => {
    // Skip auto-loading address since user object doesn't have address field
    // User will need to manually add address
  }, [user]);

  const handleAddAddress = async () => {
    if (newAddress.address && user) {
      setSaving(true);

      try {
        // Skip API call for now since server requires password
        // Just update local context and state

        // Update local context with new address
        updateUserContext({
          address: newAddress.address
        } as any);

        if (editingAddress) {
          // Cập nhật địa chỉ hiện có
          setAddresses(prev => prev.map(addr =>
            addr.id === editingAddress
              ? { ...addr, address: newAddress.address }
              : addr
          ));
          setEditingAddress(null);
        } else {
          // Thêm địa chỉ mới với thông tin từ user profile
          const address: Address = {
            id: 'user-address',
            name: (user as any).name || `${user.firstName} ${user.lastName}` || 'Chưa có tên',
            phone: user?.phone || 'Chưa có SĐT',
            address: newAddress.address,
            isDefault: true
          };
          setAddresses([address]);
          setSelectedAddress(address.id);
        }

        setNewAddress({ name: '', phone: '', address: '' });
        setShowAddForm(false);
      } catch (error) {
        console.error('Failed to save address:', error);
        alert('Không thể lưu địa chỉ. Vui lòng thử lại.');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleEditAddress = (id: string) => {
    const addressToEdit = addresses.find(addr => addr.id === id);
    if (addressToEdit) {
      setNewAddress({
        name: addressToEdit.name,
        phone: addressToEdit.phone,
        address: addressToEdit.address
      });
      setEditingAddress(id);
      setShowAddForm(true);
    }
  };

  const handleAddNewAddress = () => {
    // Only need to input address, name and phone will be displayed from user profile directly
    setNewAddress({
      name: '', // Will be displayed from user profile in form
      phone: '', // Will be displayed from user profile in form
      address: '' // User will input this
    });
    setEditingAddress(null);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setNewAddress({ name: '', phone: '', address: '' });
    setEditingAddress(null);
    setShowAddForm(false);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg font-semibold">Giao tới</h2>
        {addresses.length > 0 && !showAddForm && (
          <button
            onClick={handleAddNewAddress}
            className="self-start sm:self-auto text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Thay đổi
          </button>
        )}
      </div>

      {/* Khi chưa có địa chỉ */}
      {addresses.length === 0 && !showAddForm && (
        <div className="text-center py-6 sm:py-8">
          <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Chưa có địa chỉ giao hàng</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm px-4">Thêm địa chỉ để tiếp tục đặt hàng</p>
          <button
            onClick={handleAddNewAddress}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
          >
            + Thêm địa chỉ
          </button>
        </div>
      )}

      {/* Khi đã có địa chỉ và không đang hiển thị form */}
      {addresses.length > 0 && !showAddForm && (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAddress === address.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => setSelectedAddress(address.id)}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddress === address.id}
                  onChange={() => setSelectedAddress(address.id)}
                  className="w-4 h-4 text-blue-600 mt-1 cursor-pointer flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{address.name}</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{address.phone}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(address.id);
                      }}
                      className="self-end sm:self-auto text-gray-400 hover:text-blue-600 transition-colors p-1 flex-shrink-0"
                      title="Chỉnh sửa địa chỉ"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pr-6 sm:pr-0">{address.address}</p>
                </div>
              </div>
              
              {selectedAddress === address.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form thêm/chỉnh sửa địa chỉ */}
      {showAddForm && (
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900">
              {editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ giao hàng'}
            </h3>
            <button
              onClick={handleCancelForm}
              className="self-end sm:self-auto text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Họ và tên */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span className="text-gray-400">(từ thông tin tài khoản)</span>
              </label>
              <input
                type="text"
                value={newAddress.name || (user as any).name || `${user?.firstName} ${user?.lastName}` || ''}
                readOnly
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base cursor-not-allowed"
                placeholder="Chưa có thông tin"
              />
            </div>

            {/* Số điện thoại */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span className="text-gray-400">(từ thông tin tài khoản)</span>
              </label>
              <input
                type="tel"
                value={newAddress.phone || user?.phone || ''}
                readOnly
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base cursor-not-allowed"
                placeholder="Chưa có thông tin"
              />
            </div>
            
            {/* Địa chỉ */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố)"
              />
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={handleCancelForm}
              className="order-2 sm:order-1 px-4 sm:px-6 py-2 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Hủy
            </button>
            <button
              onClick={handleAddAddress}
              disabled={!newAddress.address || saving}
              className="order-1 sm:order-2 px-4 sm:px-6 py-2 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base font-medium flex items-center justify-center gap-2"
            >
              {saving && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {saving ? 'Đang lưu...' : editingAddress ? 'Cập nhật' : 'Thêm địa chỉ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
