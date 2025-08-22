import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';

interface SocialActionsProps {
  onShare: () => void;
}

const SocialActions: React.FC<SocialActionsProps> = ({ onShare }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleWishlist}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isWishlisted
              ? 'bg-red-50 border border-red-200 text-red-600'
              : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          <span>Yêu thích</span>
        </button>
      </div>
      <button
        onClick={onShare}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Chia sẻ</span>
      </button>
    </div>
  );
};

export default SocialActions;

