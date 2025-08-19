import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BookImage } from '../../../types';

interface ProductImageGalleryProps {
  images: BookImage[];
  productName: string;
  discountPercentage: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  discountPercentage
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!images || images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleImageNavigation('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleImageNavigation('next');
      } else if (e.key === 'Escape' && showFullscreen) {
        setShowFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images, showFullscreen]);

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!images || images.length <= 1) return;
    
    setImageLoading(true);
    if (direction === 'prev') {
      setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
    } else {
      setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
        {/* Main Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          <img
            src={images[selectedImageIndex]?.large_url || images[selectedImageIndex]?.base_url}
            alt={productName}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            onClick={() => setShowFullscreen(true)}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
              -{discountPercentage}%
            </div>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
              {selectedImageIndex + 1}/{images.length}
            </div>
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white rounded-full p-2 shadow-md transition-all hover:shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white rounded-full p-2 shadow-md transition-all hover:shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Fullscreen hint */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md opacity-0 hover:opacity-100 transition-opacity">
            Click để phóng to
          </div>
        </div>

        {/* Thumbnail Images */}
        {images.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                Hình ảnh sản phẩm ({images.length})
              </h4>
              {images.length > 10 && (
                <span className="text-xs text-gray-500">Tất cả ảnh</span>
              )}
            </div>
            
            <div className={`grid gap-2 ${
              images.length === 1 ? 'grid-cols-1' :
              images.length === 2 ? 'grid-cols-2' : 
              images.length === 3 ? 'grid-cols-3' :
              images.length <= 6 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' :
              images.length <= 10 ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' :
              images.length <= 15 ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6' :
              'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8'
            } max-h-none`}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImageLoading(true);
                    setSelectedImageIndex(index);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:shadow-md relative group ${
                    selectedImageIndex === index 
                      ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.thumbnail_url || image.small_url}
                    alt={`${productName} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation dots for mobile */}
            {images.length > 1 && (
              <div className="flex justify-center space-x-1 pt-2 md:hidden">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setImageLoading(true);
                      setSelectedImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-sm z-10">
              {selectedImageIndex + 1} / {images.length}
            </div>

            {/* Main fullscreen image */}
            <img
              src={images[selectedImageIndex]?.large_url || images[selectedImageIndex]?.base_url}
              alt={productName}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageNavigation('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => handleImageNavigation('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Thumbnail strip at bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-60 p-2 rounded-lg max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-white' 
                      : 'border-transparent hover:border-white hover:border-opacity-50'
                  }`}
                >
                  <img
                    src={image.thumbnail_url || image.small_url}
                    alt={`${productName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-opacity-80 text-sm text-center">
              <p>Sử dụng phím ← → để chuyển ảnh, ESC để đóng</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
