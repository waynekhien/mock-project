import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Header, 
  Footer, 
  Button,
  ProductImageGallery,
  ProductInfo,
  SellerInfo,
  PurchaseSection,
  SocialActions,
  ProductDetailTabs,
  Breadcrumb,
  RelatedProducts
} from '../components';
import { booksApi } from '../services/api';
import type { Book } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddToCart = (quantity: number) => {
    if (!book) return;
    
    // Simulate adding to cart
    console.log('Adding to cart:', { book, quantity });
    
    // Show success notification (you can replace with proper toast)
    alert(`Đã thêm ${quantity} cuốn "${book.name}" vào giỏ hàng!`);
  };

  const handleAddRelatedToCart = (relatedBook: Book) => {
    // Simulate adding related product to cart with quantity 1
    console.log('Adding related product to cart:', relatedBook);
    
    // Show success notification
    alert(`Đã thêm "${relatedBook.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = (quantity: number) => {
    if (!book) return;
    
    // Simulate buy now action
    console.log('Buy now:', { book, quantity });
    
    // Redirect to checkout (you can implement proper checkout flow)
    alert(`Mua ngay ${quantity} cuốn "${book.name}"!`);
  };

  const handleShare = async () => {
    const shareData = {
      title: book?.name || 'Sản phẩm từ Tiki',
      text: book?.short_description || 'Xem sản phẩm này trên Tiki',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Đã copy link sản phẩm vào clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Đã copy link sản phẩm vào clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-1">
            <ProductImageGallery
              images={book.images}
              productName={book.name}
              discountPercentage={discountPercentage}
            />
            <div className="mt-4">
              <SocialActions onShare={handleShare} />
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="lg:col-span-2 space-y-4">
            {/* Product Title and Basic Info */}
            <ProductInfo
              book={book}
              discountPercentage={discountPercentage}
              formatPrice={formatPrice}
            />

            {/* Purchase Section */}
            <SellerInfo seller={book.current_seller} />
            
            <PurchaseSection
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductDetailTabs book={book} />

        {/* Related Products */}
        <RelatedProducts 
          currentBook={book}
          onProductClick={(productId) => navigate(`/product/${productId}`)}
          onAddToCart={handleAddRelatedToCart}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;