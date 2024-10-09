import React from 'react';
import useAuth from '../hooks/useAuth';
import useStockData from '../hooks/useStockData';
import StockList from '../components/stock/StockList';
import { Stock } from '../types';
import { wishlistStock } from '../services/stockService';

const StockListPage: React.FC = () => {
  const { user } = useAuth();
  const { stocks } = useStockData();

  const handleAddToWishlist = async (stock: Stock) => {
    // Implement your wishlist logic here
    await wishlistStock(stock.symbol,stock._id);

    console.log(`Added ${stock.symbol} to wishlist`);
  };

  if (user === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Please log in to view the stock list.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full py-8">
      <h1 className="text-4xl text-white text-center font-bold mb-4">Stocks</h1>
      {stocks.length === 0 ? (
        <p className="text-center text-white">Loading stocks...</p>
      ) : (
        <StockList stocks={stocks} onAddToWishlist={handleAddToWishlist} />
      )}
    </div>
  );
};

export default StockListPage;