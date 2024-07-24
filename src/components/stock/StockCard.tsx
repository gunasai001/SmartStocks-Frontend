import React from 'react';
import { Link } from 'react-router-dom';
import { Stock } from '../../types';
import StockActions from './StockActions';
import WishlistButton from './WishlistButton';

interface StockCardProps {
  stock: Stock;
  onAddToWishlist: (stock: Stock) => void;
  onActionClick: (stock: Stock, action: 'buy' | 'sell') => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onAddToWishlist, onActionClick }) => {
  return (
    <div className="bg-gray-800 w-full rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-700">
      <Link 
        to={`/stocks/:${stock.symbol}`} 
        className="block mb-4"
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-xl font-bold text-green-400">{stock.name}</h3>
            <p className="text-gray-400">{stock.symbol}</p>
          </div>
          <p className="text-white font-semibold text-lg">${stock.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-300">{stock.sector}</p>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <StockActions stock={stock} onActionClick={onActionClick} />
        <WishlistButton stock={stock} onAddToWishlist={onAddToWishlist} />
      </div>
    </div>
  );
};

export default StockCard;