import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { SelectedStock, WishlistedStock } from '../types';
import useStockData from '../hooks/useStockData';

const DashboardPage: React.FC = () => {
  const { user, loading, refreshUser } = useAuth();
  const { stocks } = useStockData();

  useEffect(() => {
    if (!user && !loading) {
      refreshUser();
    }
  }, [user, loading, refreshUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-gray-400">Please log in to view your dashboard.</p>
      </div>
    );
  }


  return (
    <div className="container w-3/4 mx-auto py-12 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-8 px-8">
        <h1 className="text-4xl font-bold text-green-400">Dashboard</h1>
      </div>
      <div className="rounded-lg p-8 bg-gray-900">
        <h2 className="text-xl font-bold mb-6 text-green-400">Welcome, {user.username}!</h2>
        <p className="text-gray-300 mb-8">
          This is your personal dashboard where you can view and manage your stocks.
        </p>
        <div className="mb-10">
          <h3 className="text-lg font-bold mb-4 text-green-400">Your Selected Stocks</h3>
          {user.selected_stocks?.length > 0 ? (
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Stock Name</th>
                  <th className="py-2">Symbol</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {user?.selected_stocks.map((selectedStock: SelectedStock, index: number) => {
                  const stock = stocks.find(s => s._id.toString() === selectedStock._id);

                  const name = stock ? stock.name : null;
                  const symbol = stock ? stock.symbol : null;
                  return (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2">{name || 'N/A'}</td>
                    <td className="py-2">{symbol || 'N/A'}</td>
                    <td className="py-2">${selectedStock.price.toFixed(2) || 'N/A'}</td>
                    <td className="py-2">{selectedStock.quantity || 'N/A'}</td>
                    <td className="py-2">
                      ${(selectedStock.price && selectedStock.quantity) 
                        ? (selectedStock.price * selectedStock.quantity).toFixed(2) 
                        : 'N/A'}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">You haven't selected any stocks yet.</p>
          )}
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-bold mb-4 text-green-400">Your Wishlisted Stocks</h3>
          {user.wishlisted_stocks?.length > 0 ? (
            <ul className="list-disc pl-4 text-gray-300">
              {user.wishlisted_stocks.map((stock: WishlistedStock, index: number) => (
                <li key={index} className="mb-2">
                  {stock.stock?.name || 'N/A'} ({stock.stock?.symbol || 'N/A'}) - Current Price: ${stock.stock?.price?.toFixed(2) || 'N/A'}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You haven't wishlisted any stocks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;