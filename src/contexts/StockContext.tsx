import React, { createContext, useState, useEffect } from 'react';
import { fetchStockList,} from '../services/stockService';
import { Stock } from '../types';
import useAuth from '../hooks/useAuth';

interface StockContextData {
  stocks: Stock[];
  fetchStockList: () => Promise<void>;
  
}

export const StockContext = createContext<StockContextData>({
  stocks: [],
  fetchStockList: async () => {},
  
});

interface StockProviderProps {
  children: React.ReactNode;
}

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const { user } = useAuth();

  const fetchStockListData = async () => {
    try {
      const stockList = await fetchStockList();
      setStocks(stockList);
    } catch (error) {
      console.error('Error fetching stock list:', error);
    }
  };

  

  

  useEffect(() => {
    if (user && user !== null) {
      fetchStockListData();
    } else {
      // Clear stocks when user logs out
      setStocks([]);
    }
  }, [user]);

  const stockContextData: StockContextData = {
    stocks,
    fetchStockList: fetchStockListData,
    
  };

  return <StockContext.Provider value={stockContextData}>{children}</StockContext.Provider>;
};