import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Camera } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { updateUser, usersApi } from '../../../services/api';

interface UserProfile {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
  gender: 'male' | 'female' | 'other';
  country: string;
  phone: string;
  email: string;
}

const AccountInfo: React.FC = () => {
  const { user, updateUserContext } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    nickname: '',
    birthDate: {
      day: '',
      month: '',
      year: ''
    },
    gender: 'male',
    country: '',
    phone: '',
    email: user?.email || ''
  });

  const [fullNameDisplay, setFullNameDisplay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneEdit, setShowPhoneEdit] = useState(false);
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  // Update profile when user data changes
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        email: user.email
      }));
      
      // Only load from API on initial mount, not on every user change
      if (user.id && !profile.firstName && !profile.lastName) {
        refreshProfileData();
      }
    }
  }, [user?.id]); // Changed dependency to only user.id

  // Function to refresh profile data from API
  const refreshProfileData = async () => {
    if (!user?.id) return;
    
    console.log('refreshProfileData called - loading from API...');
    
    try {
      const userData = await usersApi.getById(user.id.toString());
      console.log('Refreshed user data:', userData);
      
      // Parse birthDate if available
      let parsedBirthDate = { day: '', month: '', year: '' };
      if (userData.birthDate) {
        const dateMatch = userData.birthDate.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
          parsedBirthDate = {
            year: dateMatch[1],
            month: dateMatch[2],
            day: dateMatch[3]
          };
        }
      }
      
      // Update local profile state with ALL data from API
      const newProfile = {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        nickname: userData.nickname || '',
        birthDate: parsedBirthDate,
        gender: (userData.gender as 'male' | 'female' | 'other') || 'male',
        country: userData.country || '',
        phone: userData.phone || '',
        email: userData.email || ''
      };
      
      console.log('Setting profile from API:', newProfile);
      setProfile(newProfile);

      // Update AuthContext with fresh data
      updateUserContext({
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname,
        phone: userData.phone,
        email: userData.email,
        gender: userData.gender,
        country: userData.country,
        birthDate: userData.birthDate
      });
    } catch (error) {
      console.error('Failed to refresh profile data:', error);
    }
  };

  // Update display when firstName or lastName changes
  useEffect(() => {
    const displayName = profile.firstName && profile.lastName 
      ? `${profile.firstName} ${profile.lastName}`
      : profile.firstName || profile.lastName || '';
    setFullNameDisplay(displayName);
  }, [profile.firstName, profile.lastName]);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    console.log('handleInputChange:', field, value);
    setProfile(prev => {
      const newProfile = {
        ...prev,
        [field]: value
      };
      console.log('Updated profile:', newProfile);
      return newProfile;
    });
  };

  const handleBirthDateChange = (field: keyof UserProfile['birthDate'], value: string) => {
    setProfile(prev => ({
      ...prev,
      birthDate: {
        ...prev.birthDate,
        [field]: value
      }
    }));
  };

  const formatBirthDate = (birthDate: { day: string; month: string; year: string }): string => {
    // Only format if all fields are present
    if (birthDate.year && birthDate.month && birthDate.day) {
      return `${birthDate.year}-${birthDate.month.padStart(2, '0')}-${birthDate.day.padStart(2, '0')}`;
    }
    return ''; // Return empty string if incomplete
  };

  const handleSave = async () => {
    if (!user?.id) {
      alert('Không tìm thấy thông tin người dùng');
      return;
    }

    setIsLoading(true);
    try {
      // Prepare data for API - include ALL profile fields (except password)
      const updateData = {
        email: profile.email || user.email, // Use updated email or current email
        name: `${profile.firstName} ${profile.lastName}`.trim(), // Full name for backend
        firstName: profile.firstName,
        lastName: profile.lastName,
        nickname: profile.nickname,
        gender: profile.gender,
        country: profile.country,
        birthDate: formatBirthDate(profile.birthDate), // Use helper function
        phone: profile.phone,
        role: user.role as "admin" | "user"
      };

      console.log('Saving profile data:', updateData);
      
      const result = await updateUser(user.id.toString(), updateData);
      console.log('Profile update successful:', result);
      
      // Refresh profile data from API
      await refreshProfileData();
      
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Update error:', error);
      if (error instanceof Error) {
        alert(`Có lỗi xảy ra: ${error.message}`);
      } else {
        alert('Có lỗi xảy ra khi cập nhật thông tin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneUpdate = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      console.log('Updating phone for user:', user.id, 'with phone:', tempPhone);
      
      // Include ALL current profile data + new phone (except password)
      const updateData = {
        email: profile.email || user.email,
        name: `${profile.firstName} ${profile.lastName}`.trim(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        nickname: profile.nickname,
        gender: profile.gender,
        country: profile.country,
        birthDate: formatBirthDate(profile.birthDate),
        phone: tempPhone, // Updated phone
        role: user.role as "admin" | "user"
      };
      
      const result = await updateUser(user.id.toString(), updateData);
      console.log('Phone update successful:', result);
      
      // Refresh profile data from API
      await refreshProfileData();
      
      setShowPhoneEdit(false);
      alert('Cập nhật số điện thoại thành công!');
    } catch (error) {
      console.error('Phone update error details:', error);
      if (error instanceof Error) {
        alert(`Có lỗi xảy ra: ${error.message}`);
      } else {
        alert('Có lỗi xảy ra khi cập nhật số điện thoại');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailUpdate = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      console.log('Updating email for user:', user.id, 'with email:', tempEmail);
      
      // Include ALL current profile data + new email (except password)
      const updateData = {
        email: tempEmail, // Updated email
        name: `${profile.firstName} ${profile.lastName}`.trim(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        nickname: profile.nickname,
        gender: profile.gender,
        country: profile.country,
        birthDate: formatBirthDate(profile.birthDate),
        phone: profile.phone,
        role: user.role as "admin" | "user"
      };
      
      const result = await updateUser(user.id.toString(), updateData);
      console.log('Email update successful:', result);
      
      // Refresh profile data from API
      await refreshProfileData();
      
      setShowEmailEdit(false);
      alert('Cập nhật email thành công!');
    } catch (error) {
      console.error('Email update error details:', error);
      if (error instanceof Error) {
        alert(`Có lỗi xảy ra: ${error.message}`);
      } else {
        alert('Có lỗi xảy ra khi cập nhật email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Thông tin tài khoản</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Thông tin cá nhân</h2>
            
            {/* Avatar and Name */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-500" />
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ & Tên</label>
                    <input
                      type="text"
                      value={fullNameDisplay}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setFullNameDisplay(inputValue);
                        
                        // Update firstName and lastName based on input
                        if (inputValue.trim() === '') {
                          handleInputChange('firstName', '');
                          handleInputChange('lastName', '');
                        } else {
                          const names = inputValue.trim().split(/\s+/); // Split by one or more spaces
                          if (names.length === 1) {
                            handleInputChange('firstName', names[0]);
                            handleInputChange('lastName', '');
                          } else {
                            handleInputChange('firstName', names.slice(0, -1).join(' '));
                            handleInputChange('lastName', names[names.length - 1]);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nickname</label>
                    <input
                      type="text"
                      value={profile.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Thêm nickname"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Birth Date */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                <select
                  value={profile.birthDate.month}
                  onChange={(e) => handleBirthDateChange('month', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tháng</option>
                  {Array.from({length: 12}, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select
                  value={profile.birthDate.day}
                  onChange={(e) => handleBirthDateChange('day', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Ngày</option>
                  {Array.from({length: 31}, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select
                  value={profile.birthDate.year}
                  onChange={(e) => handleBirthDateChange('year', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Năm</option>
                  {Array.from({length: 100}, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>
                  })}
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={profile.gender === 'male'}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={profile.gender === 'female'}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  Nữ
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={profile.gender === 'other'}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  Khác
                </label>
              </div>
            </div>

            {/* Country */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quốc tịch</label>
              <select
                value={profile.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn quốc tịch</option>
                <option value="VN">Việt Nam</option>
                <option value="US">Hoa Kỳ</option>
                <option value="JP">Nhật Bản</option>
                <option value="KR">Hàn Quốc</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">Số điện thoại và Email</h2>
            
            {/* Phone */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              {showPhoneEdit ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                  </div>
                  <input
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handlePhoneUpdate}
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
                    >
                      {isLoading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button
                      onClick={() => setShowPhoneEdit(false)}
                      disabled={isLoading}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-sm"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between gap-4">
                  <div className="flex gap-3 flex-1 min-w-0">
                    <Phone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                      <p className="font-medium break-words">
                        {profile.phone || 'Chưa cập nhật'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTempPhone(profile.phone);
                      setShowPhoneEdit(true);
                    }}
                    className="text-blue-600 text-sm hover:underline flex-shrink-0 self-start"
                  >
                    Cập nhật
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-lg p-4">
              {showEmailEdit ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Địa chỉ email</p>
                  </div>
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ email"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleEmailUpdate}
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
                    >
                      {isLoading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button
                      onClick={() => setShowEmailEdit(false)}
                      disabled={isLoading}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-sm"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between gap-4">
                  <div className="flex gap-3 flex-1 min-w-0">
                    <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 mb-1">Địa chỉ email</p>
                      <p className="font-medium text-xs whitespace-nowrap">
                        {profile.email || 'Chưa cập nhật'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTempEmail(profile.email);
                      setShowEmailEdit(true);
                    }}
                    className="text-blue-600 text-sm hover:underline flex-shrink-0 self-start"
                  >
                    Cập nhật
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;

