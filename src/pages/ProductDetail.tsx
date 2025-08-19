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
import type { Book } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const bookData = await booksApi.getById(id);
        setBook(bookData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

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
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
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
      alert(`Đã thêm ${quantity} cuốn "${book.name}" vào giỏ hàng!`);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
    }
  };

  const handleBuyNow = (quantity: number) => {
    if (!book) return;
    
    // Simulate buy now action
    console.log('Buy now:', { book, quantity });
    
    // Redirect to checkout (you can implement proper checkout flow)
    alert(`Mua ngay ${quantity} cuốn "${book.name}"!`);
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
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
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
          categoryName={book.categories.name}
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
                onProductClick={(productId) => navigate(`/product/${productId}`)}
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