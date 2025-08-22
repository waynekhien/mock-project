import React from 'react';
import Search from './Search';

interface SearchBarProps {
  className?: string;
}

/**
 * Simple search bar component for header
 */
const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-md ${className}`}>
      <Search
        placeholder="Tìm kiếm sách..."
        className="w-full"
        maxResults={6}
      />
    </div>
  );
};

export default SearchBar;

