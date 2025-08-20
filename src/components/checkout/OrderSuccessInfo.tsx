import React, { useState, useEffect } from 'react';
import type { Order } from '../../types';
import { booksApi } from '../../services/api';

interface OrderSuccessInfoProps {
  orderId: string;
  orderDate: string;
  order?: Order | null;
}

const OrderSuccessInfo: React.FC<OrderSuccessInfoProps> = ({ orderId, orderDate, order }) => {
  const [productDetails, setProductDetails] = useState<{[key: string]: any}>({});
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch product details from API
  const fetchProductDetails = async (productIds: string[]) => {
    if (productIds.length === 0) return;

    setLoadingProducts(true);
    try {
      const productPromises = productIds.map(async (id) => {
        try {
          const product = await booksApi.getById(id);
          return { id, product };
        } catch (error) {
          console.error(`Failed to fetch product ${id}:`, error);
          return { id, product: null };
        }
      });

      const results = await Promise.all(productPromises);
      const productMap: {[key: string]: any} = {};

      results.forEach(({ id, product }) => {
        if (product) {
          productMap[id] = product;
        }
      });

      setProductDetails(productMap);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Get product details from localStorage as fallback
  const getLocalProductDetails = (productId: string) => {
    try {
      let books = JSON.parse(localStorage.getItem('books') || '[]');
      if (books.length === 0) {
        books = JSON.parse(localStorage.getItem('products') || '[]');
      }

      const book = books.find((b: any) => b.id?.toString() === productId?.toString());
      return book || null;
    } catch (error) {
      console.error('Error getting local product details:', error);
      return null;
    }
  };

  // Fetch product details when order changes
  useEffect(() => {
    if (order?.items && order.items.length > 0) {
      const productIds = order.items.map((item: any) =>
        item.productId || item.book_id
      ).filter(Boolean);

      if (productIds.length > 0) {
        fetchProductDetails(productIds);
      }
    }
  }, [order]);

  // Fallback image for products without image
  const getProductImage = (item: any, productDetails: any = null) => {
    // Priority: item.productImage (from order) > API productDetails > localStorage > placeholder
    const imageUrl = item.productImage ||           // From order data
                    item.image ||
                    item.thumbnail ||
                    item.cover_image ||
                    productDetails?.image ||
                    productDetails?.thumbnail ||
                    productDetails?.cover_image ||
                    productDetails?.images?.[0] ||
                    productDetails?.cover ||
                    productDetails?.picture;

    if (imageUrl && imageUrl !== '') return imageUrl;

    return `data:image/svg+xml;base64,${btoa(`
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" fill="#f3f4f6"/>
        <path d="M16 14h16v20H16V14z" stroke="#9ca3af" stroke-width="2" fill="none"/>
        <path d="M20 18h8M20 22h8M20 26h6" stroke="#9ca3af" stroke-width="1"/>
      </svg>
    `)}`;
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-sm border p-8 h-full">
        {/* Order Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Mã đơn hàng: {orderId}
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-base font-medium hover:underline transition-colors">
            Xem đơn hàng
          </button>
        </div>

        <div className="text-base text-gray-600 mb-8 font-medium">Giao {orderDate}</div>
        
        {/* Order Items */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Danh sách sản phẩm:</h3>
          {order?.items && order.items.length > 0 ? (
            order.items.map((item: any, index) => {
              // Handle both API response format and Order interface format
              const productId = item.productId || item.book_id || `product-${index}`;
              const apiProductDetails = productDetails[productId];
              const localProductDetails = getLocalProductDetails(productId);
              const finalProductDetails = apiProductDetails || localProductDetails;

              const productName = item.productName ||
                                 item.name ||
                                 finalProductDetails?.name ||
                                 finalProductDetails?.title ||
                                 `Sản phẩm ${index + 1}`;
              const quantity = item.quantity || 1;
              const price = item.price || 0;
              const total = item.total || (price * quantity);

              return (
                <div key={item.id || `item-${index}-${productId}`} className="flex items-start gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="flex-shrink-0 relative">
                    <img
                      src={getProductImage(item, finalProductDetails)}
                      alt={productName}
                      className="w-20 h-20 rounded-xl object-cover bg-white border-2 border-gray-200 shadow-sm"
                      onError={(e) => {
                        console.log('Image failed to load, using fallback');
                        (e.target as HTMLImageElement).src = getProductImage({});
                      }}
                    />
                    {loadingProducts && (
                      <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-xl">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 mb-3 text-base leading-tight" title={productName}>
                      {productName}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-base text-gray-600 font-medium">Số lượng:</span>
                        <span className="text-base font-semibold text-gray-900">{quantity}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-base text-gray-600 font-medium">Thành tiền:</span>
                        <span className="font-bold text-gray-900 text-lg">
                          {total.toLocaleString('vi-VN')} ₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-lg font-medium">Không có thông tin sản phẩm</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessInfo;
