import React from 'react';
import BannerCarousel from '../components/features/bookstore/BannerCarousel';
import CategoryList from '../components/features/bookstore/CategoryList';
import ProductFilter from '../components/features/bookstore/ProductFilter';

const Bookstore: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Carousel Section */}
      <section className="mb-8">
        <BannerCarousel />
      </section>

      {/* Category List Section */}
      <section className="mb-8">
        <CategoryList />
      </section>

      {/* Product Filter Section */}
      <section>
        <ProductFilter />
      </section>
    </div>
  );
};

export default Bookstore;
