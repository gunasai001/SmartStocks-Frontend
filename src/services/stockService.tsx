import { Stock } from '../types';
import axiosInstance from './axiosInstance';



export const fetchStockList = async (): Promise<Stock[]> => {
  try {
    const response = await axiosInstance.get<Stock[]>('/stocks/');
    return response.data;
  } catch (error) {
    console.error('Error fetching stock list:', error);
    throw error;
  }
};

export const buyStock = async (symbol: string, _id: string, price: number, quantity: number): Promise<void> => {
  try {
    await axiosInstance.post(`/portfolio/add/:${symbol}`, {_id, price, quantity });
  } catch (error) {
    console.log('Error buying stock:', error.response.data);
    throw error;
  }
};

export const sellStock = async (symbol: string, _id: string): Promise<void> => {
  try {
    await axiosInstance.post(`/portfolio/remove/:${symbol}`, {_id});
  } catch (error) {
    console.log('Error selling stock:', error.response.data);
    throw error;
  }
};