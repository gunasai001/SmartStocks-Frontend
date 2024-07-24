import { useContext } from 'react';
import { StockContext } from '../contexts/StockContext';

const useStockData = () => {
  const stockContext = useContext(StockContext);

  if (!stockContext) {
    throw new Error('useStockData must be used within a StockProvider');
  }

  return stockContext;
};

export default useStockData;