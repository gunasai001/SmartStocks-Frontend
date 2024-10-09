import React from 'react';
import { formatNumber } from '../../utils/formatter';
import { Stock } from '../../types';
import StockChart from './StockChart';
import StockActions from './StockActions';
import WishlistButton from './WishlistButton';
import PredictedChart from './PredictedChart';


interface StockDetailsProps {
  stock: Stock;
  onAddToWishlist: (stock: Stock) => void;
  onActionClick: (stock: Stock, action: 'buy' | 'sell') => void;

}

const StockDetails: React.FC<StockDetailsProps> = ({ stock, onAddToWishlist, onActionClick }) => {
  return (
    <div className="p-8 animate-fade-in shadow-lg bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-green-400">{stock.name} ({stock.symbol})</h1>
          <p className="text-gray-300 mb-1">Sector: {stock.sector}</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-gray-300 mb-2 text-xl font-semibold">Latest Price: {formatNumber(stock.price)}</p>
          <div className="flex justify-end flex-col space-x-2">
          <StockActions stock={stock} onActionClick={onActionClick} />
          <WishlistButton stock={stock} onAddToWishlist={onAddToWishlist} />
          </div>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="rounded-lg p-6 shadow-md bg-gray-800">
          <h2 className="text-xl font-bold mb-4 text-green-400">Company Details</h2>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Market Cap:</span> {formatNumber(stock.market_cap)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">P/E Ratio:</span> {formatNumber(stock.price_to_earnings_ratio)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Return on Equity:</span> {formatNumber(stock.return_on_equity * 100)}%
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Net Profit Margin:</span> {formatNumber(stock.net_profit_margin * 100)}%
          </p>
        </div>
        <div className="rounded-lg p-6 shadow-md bg-gray-800">
          <h2 className="text-xl font-bold mb-4 text-green-400">Financial Metrics</h2>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Total Debt:</span> {formatNumber(stock.total_debt)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Free Cash Flow:</span> {formatNumber(stock.free_cash_flow)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Price to Book Ratio:</span> {formatNumber(stock.price_to_book_ratio)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Price to Sales Ratio:</span> {formatNumber(stock.price_to_sales_ratio)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Debt to Equity Ratio:</span> {formatNumber(stock.debt_to_equity_ratio)}
          </p>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Trading Details</h2>
        <div className="rounded-lg p-6 shadow-md bg-gray-800">
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Volume:</span> {formatNumber(stock.volume)}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-green-400">Historical Data</h2>
        <div className="rounded-lg w-full py-6 flex justify-center shadow-md bg-gray-800">
          <StockChart data={stock.historical_prices} />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-green-400 mt-10">Predicted Prices for the Next Week</h2>
        <div className='rounded-lg w-full py-6 flex justify-center shadow-md bg-gray-800'>
          <PredictedChart data = {stock.predictions} price = {stock.price} />
        </div>
      </div>
    </div>
  );
};

export default StockDetails;