import React from 'react';
import { Stock } from '../../types';

interface StockActionsProps {
  stock: Stock;
  onActionClick: (stock: Stock, action: 'buy' | 'sell') => void;
}

const StockActions: React.FC<StockActionsProps> = ({ stock, onActionClick }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onActionClick(stock, 'buy')}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Buy
      </button>
      <button
        onClick={() => onActionClick(stock, 'sell')}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Sell
      </button>
    </div>
  );
};

export default StockActions;