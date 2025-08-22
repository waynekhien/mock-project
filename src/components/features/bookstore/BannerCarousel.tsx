import React, { useState, useEffect } from 'react';

interface BannerItem {
  id: string;
  image: string;
  alt: string;
  href: string;
}

interface BannerSlide {
  id: string;
  banners: BannerItem[];
}

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<BannerSlide[]>([]);

  // Simulate fetching data from API
  useEffect(() => {
    const fetchBannerData = async () => {
      // This would be replaced with actual API call
      const bannerData: BannerSlide[] = [
        {
          id: '1',
          banners: [
            {
              id: '1',
              image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/59/c9/23/ff1a57d68f689291997cfdb28cdee59f.png',
              alt: 'premium-banner-0',
              href: '#'
            },
            {
              id: '2',
              image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/07/38/d4/8828f2fbf32d7d42cd86d06e346f8ae0.jpg',
              alt: 'premium-banner-1', 
              href: '#'
            }
          ]
        },
        {
          id: '2',
          banners: [
            {
              id: '3',
              image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/8c/c6/19/98c7bbd9758c89d4b9a49f3f7261693c.png',
              alt: 'premium-banner-0',
              href: '#'
            },
            {
              id: '4',
              image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/6e/46/83/fbe48c3e12eea3c47a4d41a681211bfa.jpg',
              alt: 'premium-banner-1',
              href: '#'
            }
          ]
        },
        {
          id: '3',
          banners: [
            {
              id: '5',
              image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/3a/8f/b2/3546f8d582a52c66974fdb1af2f87f20.png',
              alt: 'premium-banner-0',
              href: '#'
            },
            {
              id: '6',
              image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/b4/8e/1d/f2c671920edb8cc7a19ed6dc7d3a293f.png',
              alt: 'premium-banner-1',
              href: '#'
            }
          ]
        }
      ];
      setSlides(bannerData);
    };

    fetchBannerData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const slideWidth = 100; // Each slide is 100% width

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="relative">
        {/* Navigation Button - Previous */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M12.0899 14.5899C11.7645 14.9153 11.2368 14.9153 10.9114 14.5899L5.91139 9.58991C5.58596 9.26447 5.58596 8.73683 5.91139 8.4114L10.9114 3.41139C11.2368 3.08596 11.7645 3.08596 12.0899 3.41139C12.4153 3.73683 12.4153 4.26447 12.0899 4.58991L7.67916 9.00065L12.0899 13.4114C12.4153 13.7368 12.4153 14.2645 12.0899 14.5899Z" 
              fill="#0A68FF"
            />
          </svg>
        </button>

        {/* Banner Content */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * slideWidth}%)`,
              gap: '0px'
            }}
          >
            {slides.map((slide) => (
              <div 
                key={slide.id}
                className="w-full flex-shrink-0"
                style={{ width: `${slideWidth}%` }}
              >
                <div className="grid grid-cols-2 gap-3 p-6">
                  {slide.banners.map((banner) => (
                    <div key={banner.id}>
                      <a 
                        href={banner.href}
                        className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        style={{ aspectRatio: '16 / 9' }}
                      >
                        <picture className="w-full h-full">
                          <source 
                            type="image/webp" 
                            srcSet={`${banner.image}.webp 1x, ${banner.image}.webp 2x`}
                          />
                          <img
                            src={banner.image}
                            alt={banner.alt}
                            loading="eager"
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            style={{ aspectRatio: '16 / 9' }}
                          />
                        </picture>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Button - Next */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M5.91107 3.41107C6.23651 3.08563 6.76414 3.08563 7.08958 3.41107L12.0896 8.41107C12.415 8.73651 12.415 9.26415 12.0896 9.58958L7.08958 14.5896C6.76414 14.915 6.23651 14.915 5.91107 14.5896C5.58563 14.2641 5.58563 13.7365 5.91107 13.4111L10.3218 9.00033L5.91107 4.58958C5.58563 4.26414 5.58563 3.73651 5.91107 3.41107Z" 
              fill="#0A68FF"
            />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="w-full flex justify-center items-center gap-1 mt-2 pb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded transition-all duration-200 ${
                index === currentSlide
                  ? 'w-6 h-0.5 bg-blue-600'
                  : 'w-4 h-0.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;