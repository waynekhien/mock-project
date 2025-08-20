import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Header, 
  Footer, 
  Button,
  ProductImageGallery,
  ProductBasicInfo,
  ProductDetails,
  ProductDescription,
  SellerInfo,
  PurchaseSection,
  PurchasePolicy,
  Breadcrumb,
  RelatedProducts
} from '../components';
import { LoginModal } from '../components/ui/LoginModal';
import { booksApi } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import type { Book } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchBook = async () => {
    if (!id) {
      setError('ID sản phẩm không hợp lệ');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const bookData = await booksApi.getById(id);
      setBook(bookData);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err instanceof Error ? err.message : 'Không thể tải thông tin sản phẩm');
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchBook();
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getDiscountPercentage = () => {
    if (book?.original_price && book.current_seller.price < book.original_price) {
      const discount = ((book.original_price - book.current_seller.price) / book.original_price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleAddToCart = async (quantity: number) => {
    if (!book) return;
    
    // Kiểm tra authentication trước
    if (!isAuthenticated) {
      showError('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      setShowLoginModal(true);
      return;
    }
    
    console.log('🛒 Adding to cart - Book:', book.name, 'Quantity:', quantity);
    
    // Lấy ảnh tốt nhất có sẵn
    const getImageUrl = () => {
      if (book.book_cover) return book.book_cover;
      if (book.images && book.images.length > 0) {
        return book.images[0].thumbnail_url || book.images[0].small_url || book.images[0].medium_url;
      }
      return ''; // fallback sẽ được xử lý trong Cart component
    };
    
    // Add to cart using context với thông tin chi tiết
    const finalPrice = book.current_seller?.price || book.list_price;
    const cartItem = {
      productId: book.id.toString(), // Đảm bảo là string
      name: book.name,
      price: finalPrice,
      originalPrice: book.list_price,
      image: getImageUrl(),
      description: book.short_description || book.description,
      category: book.categories?.name || 'Sách',
      brand: book.authors?.[0]?.name || book.current_seller?.name || 'Không rõ'
    };

    // Thông tin khách hàng sẽ được lấy từ userId trong CartContext
    
    console.log('🛒 CartItem data:', cartItem);
    
    try {
      // Add product to cart with specified quantity
      console.log('🛒 Adding', quantity, 'items to cart...');
      
      // Gọi addToCart chỉ 1 lần với quantity đúng
      await addToCart(cartItem, quantity);
      
      console.log('✅ Successfully added', quantity, 'items to cart');
      showSuccess(`Đã thêm ${quantity} cuốn "${book.name}" vào giỏ hàng!`);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      showError('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
    }
  };

  const handleBuyNow = async (quantity: number) => {
    if (!book) return;

    try {
      // Add to cart first
      await handleAddToCart(quantity);

      // Then redirect to checkout
      navigate('/checkout');
    } catch (error) {
      console.error('Error during buy now:', error);
      showError('Có lỗi xảy ra khi mua hàng. Vui lòng thử lại.');
    }
  };

  // const handleShare = async () => {
  //   const shareData = {
  //     title: book?.name || 'Sản phẩm từ Tiki',
  //     text: book?.short_description || 'Xem sản phẩm này trên Tiki',
  //     url: window.location.href,
  //   };

  //   try {
  //     if (navigator.share && navigator.canShare(shareData)) {
  //       await navigator.share(shareData);
  //     } else {
  //       // Fallback: copy to clipboard
  //       await navigator.clipboard.writeText(window.location.href);
  //       alert('Đã copy link sản phẩm vào clipboard!');
  //     }
  //   } catch (error) {
  //     console.error('Error sharing:', error);
  //     // Final fallback
  //     try {
  //       await navigator.clipboard.writeText(window.location.href);
  //       alert('Đã copy link sản phẩm vào clipboard!');
  //     } catch (clipboardError) {
  //       console.error('Clipboard access failed:', clipboardError);
  //     }
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-4">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Image skeleton */}
              <div className="lg:col-span-3">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
              </div>

              {/* Content skeleton */}
              <div className="lg:col-span-6 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>

              {/* Sidebar skeleton */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 mb-3">
                {error ? 'Lỗi tải sản phẩm' : 'Không tìm thấy sản phẩm'}
              </h1>
              <p className="text-gray-600 mb-6">
                {error || 'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
              </p>
              {error && error.includes('Network Error') && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <Button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Đang thử lại...' : `Thử lại${retryCount > 0 ? ` (${retryCount})` : ''}`}
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Về trang chủ
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercentage = getDiscountPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <Breadcrumb
          categoryName={book.categories?.name || 'Sách'}
          productName={book.name}
          onNavigateHome={() => navigate('/')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Product Images (3 columns - smaller) */}
          <div className="lg:col-span-3">
            <ProductImageGallery
              images={book.images}
              productName={book.name}
              discountPercentage={discountPercentage}
            />
            {/* <div className="mt-4">
              <SocialActions onShare={handleShare} />
            </div> */}
          </div>

          {/* Middle Column - Product Information (6 columns - wider) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Product Title, Author, Rating, Price */}
            <ProductBasicInfo
              book={book}
              discountPercentage={discountPercentage}
              formatPrice={formatPrice}
            />

            {/* Product Details Table */}
            <ProductDetails book={book} />

            {/* Product Description */}
            <ProductDescription book={book} />



            {/* Related Products */}
            <div className="mt-8">
              <RelatedProducts 
                currentBook={book}
                onProductClick={(productId: string) => navigate(`/product/${productId}`)}
              />
            </div>

            {/* Purchase Policy */}
            <PurchasePolicy />
          </div>

          {/* Right Column - Purchase Section (3 columns) */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 space-y-4">
              {/* Seller Information */}
              <SellerInfo seller={book.current_seller} />
              
              {/* Purchase Section */}
              <PurchaseSection
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                price={book.current_seller.price}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default ProductDetail;