// src/components/stock/WishlistButton.tsx
import React from 'react';
import { Stock } from '../../types';

interface WishlistButtonProps {
  stock: Stock;
  onAddToWishlist: (stock: Stock) => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ stock, onAddToWishlist }) => {
  return (
    <button
      onClick={() => onAddToWishlist(stock)}
      className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-colors duration-300 "
    >
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;