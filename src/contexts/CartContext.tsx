import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartsApi } from '../services/api';

// Interface cho CartItem - thông tin đầy đủ của sản phẩm trong giỏ hàng
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  description?: string;
  category?: string;
  brand?: string;
  quantity: number;
  userId: string;
  addedAt?: string;
}

// Interface cho CartContext
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addToCart: (product: Omit<CartItem, 'id' | 'quantity' | 'userId' | 'addedAt'>, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Tính toán tổng số lượng và tổng tiền
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Chuyển đổi dữ liệu từ API thành CartItem
  const convertApiToCartItem = (apiItem: any): CartItem => {
    console.log('🔄 Converting API item:', apiItem);

    // Nếu API trả về đầy đủ thông tin
    if (apiItem.name && apiItem.price && apiItem.productId) {
      console.log('✅ API returned complete data');
      return {
        id: apiItem.id?.toString() || `temp_${Date.now()}`,
        productId: apiItem.productId,
        name: apiItem.name,
        price: apiItem.price,
        originalPrice: apiItem.originalPrice || apiItem.price,
        image: apiItem.image || '',
        description: apiItem.description || '',
        category: apiItem.category || '',
        brand: apiItem.brand || '',
        quantity: apiItem.quantity || 1,
        userId: apiItem.userId || user?.id.toString() || '',
        addedAt: apiItem.addedAt || new Date().toISOString()
      };
    }

    // Nếu API chỉ trả về dữ liệu tối thiểu, tìm thông tin từ localStorage
    console.log('⚠️ API returned incomplete data, searching localStorage...');
    console.log('🔍 Looking for item with id:', apiItem.id);
    console.log('🔍 Current user id:', user?.id);
    
    try {
      // Tìm trong localStorage backup
      const backupKey = `cart_backup_${user?.id}`;
      console.log('🔍 Searching backup key:', backupKey);
      
      const backupData = localStorage.getItem(backupKey);
      console.log('🔍 Backup data found:', !!backupData);
      
      if (backupData) {
        const backupItems: CartItem[] = JSON.parse(backupData);
        console.log('🔍 Backup items:', backupItems);
        
        const matchingItem = backupItems.find(item => {
          console.log('🔍 Comparing:', item.id, 'vs', apiItem.id?.toString());
          return item.id === apiItem.id?.toString();
        });
        
        if (matchingItem) {
          console.log('✅ Found in backup:', matchingItem);
          return {
            ...matchingItem,
            quantity: apiItem.quantity || matchingItem.quantity
          };
        } else {
          console.log('❌ No matching item found in backup');
        }
      }

      // Tìm trong localStorage books hoặc products
      console.log('🔍 Searching in localStorage...');
      
      // Thử cả 2 keys: books và products  
      let books = JSON.parse(localStorage.getItem('books') || '[]');
      if (books.length === 0) {
        books = JSON.parse(localStorage.getItem('products') || '[]');
        console.log('🔍 Using products key, found:', books.length);
      } else {
        console.log('🔍 Using books key, found:', books.length);
      }
      
      const book = books.find((b: any) => {
        const matches = b.id?.toString() === apiItem.productId?.toString() ||
                       b.id?.toString() === apiItem.id?.toString();
        console.log('🔍 Book', b.id, 'matches:', matches);
        return matches;
      });
      
      if (book) {
        console.log('✅ Found book in localStorage:', book);
        return {
          id: apiItem.id?.toString() || `temp_${Date.now()}`,
          productId: book.id?.toString() || '',
          name: book.name || book.title || 'Sản phẩm không rõ',
          price: book.current_seller?.price || book.list_price || book.price || 0,
          originalPrice: book.list_price || book.price || 0,
          image: book.book_cover || book.image || (book.images?.[0]?.thumbnail_url) || '',
          description: book.short_description || book.description || '',
          category: book.categories?.name || 'Sách',
          brand: book.authors?.[0]?.name || book.current_seller?.name || 'Không rõ',
          quantity: apiItem.quantity || 1,
          userId: user?.id.toString() || '',
          addedAt: new Date().toISOString()
        };
      } else {
        console.log('❌ No matching book found');
      }
    } catch (error) {
      console.error('❌ Error reading localStorage:', error);
    }

    // Fallback cuối cùng
    console.log('⚠️ Creating fallback item');
    return {
      id: apiItem.id?.toString() || `temp_${Date.now()}`,
      productId: apiItem.productId || `unknown_${apiItem.id}`,
      name: 'Sản phẩm không xác định',
      price: 0,
      originalPrice: 0,
      quantity: apiItem.quantity || 1,
      userId: user?.id.toString() || '',
      addedAt: new Date().toISOString()
    };
  };

  // Lấy danh sách cart từ API
  const refreshCart = async () => {
    console.log('🔄 refreshCart called');
    console.log('🔄 isAuthenticated:', isAuthenticated);
    console.log('🔄 user:', user);
    
    if (!isAuthenticated || !user) {
      console.log('🚫 Not authenticated, clearing cart');
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      console.log('🔄 Refreshing cart for user:', user.id);
      console.log('🔄 Calling cartsApi.getAll with userId:', user.id.toString());
      
      const response = await cartsApi.getAll(user.id.toString());
      console.log('📦 Raw API response for user', user.id, ':', response);
      console.log('📦 Response is array:', Array.isArray(response));
      console.log('📦 Response length:', response?.length);

      if (Array.isArray(response)) {
        console.log('🔄 Converting', response.length, 'items');
        const cartItems = response.map((item, index) => {
          console.log(`🔄 Converting item ${index + 1}:`, item);
          const converted = convertApiToCartItem(item);
          console.log(`✅ Converted item ${index + 1}:`, converted);
          return converted;
        });
        
        setItems(cartItems);
        console.log('✅ Final cart loaded for user', user.id, ':', cartItems);
      } else {
        console.log('❌ Invalid API response format');
        setItems([]);
      }
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (product: Omit<CartItem, 'id' | 'quantity' | 'userId' | 'addedAt'>, quantity: number = 1) => {
    if (!isAuthenticated || !user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }

    setLoading(true);
    try {
      console.log('🛒 Adding to cart:', product, 'quantity:', quantity);

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = items.find(item => item.productId === product.productId);
      
      if (existingItem) {
        // Cập nhật quantity với số lượng mới
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Thêm sản phẩm mới với quantity chỉ định
        const cartData = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image || '',
          description: product.description || '',
          category: product.category || '',
          brand: product.brand || '',
          quantity: quantity,
          userId: user.id.toString(),
          addedAt: new Date().toISOString()
        };

        console.log('📤 Sending to API:', cartData);
        const newItem = await cartsApi.add(cartData);
        console.log('✅ API response:', newItem);

        // Lưu backup vào localStorage
        const completeItem: CartItem = {
          id: newItem.id?.toString() || `temp_${Date.now()}`,
          ...cartData
        };

        const backup = [...items, completeItem];
        localStorage.setItem(`cart_backup_${user.id}`, JSON.stringify(backup));
        console.log('💾 Saved backup to localStorage');

        // Refresh cart
        await refreshCart();
      }

      console.log('✅ Product added to cart successfully');
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (id: string) => {
    const originalItems = [...items]; // Backup để restore nếu lỗi
    
    try {
      console.log('🗑️ Removing from cart:', id);
      
      // Cập nhật local state trước
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      
      // Cập nhật localStorage backup
      if (user?.id) {
        localStorage.setItem(`cart_backup_${user.id}`, JSON.stringify(updatedItems));
      }
      
      // Gọi API để sync với server
      await cartsApi.remove(id);
      
      console.log('✅ Product removed from cart');
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      
      // Nếu API lỗi, khôi phục lại state cũ
      setItems(originalItems);
      if (user?.id) {
        localStorage.setItem(`cart_backup_${user.id}`, JSON.stringify(originalItems));
      }
      
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    const originalItems = [...items]; // Backup để restore nếu lỗi
    
    try {
      console.log('🔄 Updating quantity:', { id, quantity });
      
      // Tìm item hiện tại để lấy đầy đủ thông tin
      const currentItem = items.find(item => item.id === id);
      if (!currentItem) {
        throw new Error('Item not found');
      }
      
      // Cập nhật local state trước để UI responsive
      const updatedItems = items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      setItems(updatedItems);
      
      // Cập nhật localStorage backup
      if (user?.id) {
        localStorage.setItem(`cart_backup_${user.id}`, JSON.stringify(updatedItems));
      }
      
      // Gửi đầy đủ thông tin lên API, không chỉ quantity
      const fullUpdateData = {
        productId: currentItem.productId,
        name: currentItem.name,
        price: currentItem.price,
        originalPrice: currentItem.originalPrice,
        image: currentItem.image,
        description: currentItem.description,
        category: currentItem.category,
        brand: currentItem.brand,
        quantity: quantity, // quantity mới
        userId: user?.id.toString() || '',
        addedAt: currentItem.addedAt
      };
      
      console.log('📤 Sending full data to API:', fullUpdateData);
      await cartsApi.update(id, fullUpdateData);
      
      console.log('✅ Quantity updated successfully');
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      
      // Nếu API lỗi, khôi phục lại state cũ
      setItems(originalItems);
      if (user?.id) {
        localStorage.setItem(`cart_backup_${user.id}`, JSON.stringify(originalItems));
      }
      
      alert('Có lỗi xảy ra khi cập nhật số lượng');
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    setLoading(true);
    try {
      console.log('🧹 Clearing cart');
      
      // Xóa từng item
      const deletePromises = items.map(item => cartsApi.remove(item.id));
      await Promise.all(deletePromises);
      
      // Xóa backup
      if (user?.id) {
        localStorage.removeItem(`cart_backup_${user.id}`);
      }
      
      setItems([]);
      console.log('✅ Cart cleared');
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      alert('Có lỗi xảy ra khi xóa giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  // Load cart khi user login
  useEffect(() => {
    console.log('🔄 User changed:', { isAuthenticated, userId: user?.id });
    
    if (isAuthenticated && user) {
      console.log('👤 Loading cart for user:', user.id);
      refreshCart();
    } else {
      console.log('🚫 User not authenticated, clearing cart');
      setItems([]);
      
      // Clear all localStorage backup khi logout
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cart_backup_')) {
          console.log('🧹 Clearing localStorage:', key);
          localStorage.removeItem(key);
        }
      });
    }
  }, [isAuthenticated, user?.id]);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
