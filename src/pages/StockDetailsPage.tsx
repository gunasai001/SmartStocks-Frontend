import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useStockData from '../hooks/useStockData';
import StockDetails from '../components/stock/StockDetails';
import Modal from '../components/stock/Modal';
import { Stock } from '../types';
import { buyStock, sellStock, wishlistStock } from '../services/stockService';

const StockDetailsPage: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const { stocks } = useStockData();
  const [modalState, setModalState] = useState<{ isOpen: boolean; stock: Stock | null; action: 'buy' | 'sell' }>({
    isOpen: false,
    stock: null,
    action: 'buy'
  });
  const [error, setError] = useState<string | null>(null);

  const stock = stocks.find(s => s.symbol === stockId?.substring(1));

  if (!stock) {
    return <div className="text-center py-8 text-white">Stock not found.</div>;
  }

  const handleAddToWishlist = async (stock: Stock) => {
    // Implement your wishlist logic here
    await wishlistStock(stock.symbol,stock._id);
    console.log(`Added ${stock.symbol} to wishlist`);
  };

  const handleActionClick = (stock: Stock, action: 'buy' | 'sell') => {
    setModalState({ isOpen: true, stock, action });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
    setError(null);
  };

  const handleSubmit = async (quantity: number) => {
    if (modalState.stock) {
      try {
        if (modalState.action === 'buy') {
          await buyStock(modalState.stock.symbol,modalState.stock._id, modalState.stock.price, quantity);
          console.log(`Bought ${quantity} shares of ${modalState.stock.symbol}`);
        } else {
          await sellStock(modalState.stock.symbol, modalState.stock._id)
          console.log(`Sold ${quantity} shares of ${modalState.stock.symbol}`);
        }
        // Refresh the stock list to reflect the changes
        handleCloseModal();
      } catch (error) {
        setError(`Sorry, ${error?.response.data.message}`);
      }
    }
  };

  return (
    <div className="container w-3/4 mx-auto py-10">
      <StockDetails 
        stock={stock} 
        onAddToWishlist={handleAddToWishlist} 
        onActionClick={handleActionClick}
      />
      {modalState.stock && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          stock={modalState.stock}
          action={modalState.action}
          onSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
};

export default StockDetailsPage;