import React, { useState } from 'react';
import StockCard from './StockCard';
import Modal from './Modal';
import { Stock } from '../../types';
import { buyStock, sellStock } from '../../services/stockService';

interface StockListProps {
  stocks: Stock[];
  onAddToWishlist: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, onAddToWishlist }) => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; stock: Stock | null; action: 'buy' | 'sell' }>({
    isOpen: false,
    stock: null,
    action: 'buy'
  });
  const [error, setError] = useState<string | null>(null);

  const handleActionClick = (stock: Stock, action: 'buy' | 'sell') => {
    setError(null)
    setModalState({ isOpen: true, stock, action });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const handleSubmit = async (quantity: number) => {
    if (modalState.stock) {
      try {
        if (modalState.action === 'buy') {
          await buyStock(modalState.stock.symbol,modalState.stock._id, modalState.stock.price, quantity);
          console.log(`Bought ${quantity} shares of ${modalState.stock.symbol}`);
        } else {
          await sellStock(modalState.stock.symbol, modalState.stock._id)
          console.log(`Sold all shares of ${modalState.stock.symbol}`);
        }
        handleCloseModal();
      } catch (error) {
        console.log("error here in stock list")
        setError(`Sorry, ${error?.response.data.message}`);

      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-900">
      <div className="w-full max-w-5xl space-y-5">
        {stocks.map((stock: Stock) => (
          <StockCard 
            key={stock.symbol} 
            stock={stock} 
            onAddToWishlist={onAddToWishlist}
            onActionClick={handleActionClick}
          />
        ))}
      </div>
      {modalState.stock && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          stock={modalState.stock}
          action={modalState.action}
          onSubmit={handleSubmit}
          error = {error}
        />
      )}
    </div>
  );
};

export default StockList;