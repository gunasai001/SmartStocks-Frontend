import { useEffect, useState } from "react";
import useStockData from "../hooks/useStockData";
import StockChart from "../components/stock/StockChart";
import { formatNumber } from "../utils/formatter";
import PredictedChart from "../components/stock/PredictedChart";

const ComparisonPage = () => {
  const { stocks } = useStockData();
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [comparing, setComparing] = useState(false);

  const stock1 = stocks.find(stock => stock.symbol === option1);
  const stock2 = stocks.find(stock => stock.symbol === option2);

  useEffect(() => {
    if (option1 !== '' && option2 !== '') {
      setComparing(true);
    } else {
      setComparing(false); // Reset comparison when any option is deselected
    }
  }, [option1, option2]);

  const handleStockSelect = (stockSymbol: string) => {
    if (option1 === '') {
      setOption1(stockSymbol);
    } else if (option2 === '' && stockSymbol !== option1) {
      setOption2(stockSymbol);
    }
  };

  const handleResetStock = (optionNumber: number) => {
    if (optionNumber === 1) {
      setOption1('');
    } else if (optionNumber === 2) {
      setOption2('');
    }
  };

  return (
    <div className="w-full flex flex-col justify-start p-10 items-center">
      <h1 className="text-4xl text-white">Comparison Page</h1>
      <div className="flex flex-col items-center w-full space-y-2 justify-center h-[8vh] m-5 text-center text-white text-xl md:w-1/2">
        <div className="w-full h-full flex items-center gap-x-4 justify-center">
          <div
            className="w-full h-full flex items-center justify-center rounded bg-green-500 bg-opacity-80 text-black cursor-pointer"
            onClick={() => handleResetStock(1)}
          >
            {option1 !== '' ? option1 : 'Stock-1'}
          </div>
          <div
            className="w-full h-full flex items-center justify-center rounded bg-green-500 bg-opacity-80 text-black cursor-pointer"
            onClick={() => handleResetStock(2)}
          >
            {option2 !== '' ? option2 : 'Stock-2'}
          </div>
        </div>
      </div>

      {comparing && stock1 && stock2 ? (
        <div className="w-[95%] flex flex-col md:flex-row justify-around items-start space-x-4">
          <div className="w-full md:w-1/2 p-4 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">{stock1.name} ({stock1.symbol})</h2>
            <p className="text-gray-300 mb-2">Sector: {stock1.sector}</p>
            <p className="text-gray-300 mb-2">Market Cap: ₹{formatNumber(stock1.market_cap)}</p>
            <p className="text-gray-300 mb-2">Volume: {formatNumber(stock1.volume)}</p>
            <p className="text-gray-300 mb-2">P/E Ratio: {formatNumber(stock1.price_to_earnings_ratio)}</p>
            <p className="text-gray-300 mb-2">ROE: {formatNumber(stock1.return_on_equity * 100)}%</p>
            <p className="text-gray-300 mb-2">Net Profit Margin: {formatNumber(stock1.net_profit_margin * 100)}%</p>
            <p className="text-gray-300 mb-2">Total Debt: ₹{formatNumber(stock1.total_debt)}</p>
            <p className="text-gray-300 mb-2">Free Cash Flow: ₹{formatNumber(stock1.free_cash_flow)}</p>
            <p className="text-gray-300 mb-2">Price to Book Ratio: {formatNumber(stock1.price_to_book_ratio)}</p>
            <p className="text-gray-300 mb-2">Price to Sales Ratio: {formatNumber(stock1.price_to_sales_ratio)}</p>
            <p className="text-gray-300 mb-2">Debt to Equity Ratio: {formatNumber(stock1.debt_to_equity_ratio)}</p>
            {stock1.historical_prices && (
              <div className="rounded-lg w-full py-6 flex justify-center shadow-md bg-gray-800">
                <StockChart data={stock1.historical_prices} />
              </div>
            )}
            {stock1.predictions && <PredictedChart data = {stock1.predictions} price = {stock1.price} />}
          </div>
          <div className="w-full md:w-1/2 p-4 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">{stock2.name} ({stock2.symbol})</h2>
            <p className="text-gray-300 mb-2">Sector: {stock2.sector}</p>
            <p className="text-gray-300 mb-2">Market Cap: ₹{formatNumber(stock2.market_cap)}</p>
            <p className="text-gray-300 mb-2">Volume: {formatNumber(stock2.volume)}</p>
            <p className="text-gray-300 mb-2">P/E Ratio: {formatNumber(stock2.price_to_earnings_ratio)}</p>
            <p className="text-gray-300 mb-2">ROE: {formatNumber(stock2.return_on_equity * 100)}%</p>
            <p className="text-gray-300 mb-2">Net Profit Margin: {formatNumber(stock2.net_profit_margin * 100)}%</p>
            <p className="text-gray-300 mb-2">Total Debt: ₹{formatNumber(stock2.total_debt)}</p>
            <p className="text-gray-300 mb-2">Free Cash Flow: ₹{formatNumber(stock2.free_cash_flow)}</p>
            <p className="text-gray-300 mb-2">Price to Book Ratio: {formatNumber(stock2.price_to_book_ratio)}</p>
            <p className="text-gray-300 mb-2">Price to Sales Ratio: {formatNumber(stock2.price_to_sales_ratio)}</p>
            <p className="text-gray-300 mb-2">Debt to Equity Ratio: {formatNumber(stock2.debt_to_equity_ratio)}</p>
            {stock2.historical_prices && (
              <div className="rounded-lg w-full py-6 flex justify-center shadow-md bg-gray-800">
                <StockChart data={stock2.historical_prices} />
              </div>
            )}
            {stock2.predictions && <PredictedChart data = {stock2.predictions} price = {stock2.price} />}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center bg-transparent rounded-xl">
          <div className="w-4/5 rounded-lg shadow-md p-2">
            {stocks.map((stock, index) => (
              <div key={index} className="mb-4 bg-gray-800 w-full rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-y-2">
                    <h3 className="text-xl font-bold text-green-400">{stock.name}</h3>
                    <p className="text-gray-400">{stock.symbol}</p>
                    <p className="text-gray-300">{stock.sector}</p>
                  </div>
                  <div className="text-white font-semibold text-lg">
                    ₹{stock.price.toFixed(2)}
                    <div
                      className="w-full h-full flex p-2 mt-4 items-center rounded justify-center text-black font-semibold text-lg bg-yellow-600 opacity-50 hover:shadow-lg hover:bg-yellow-700 cursor-pointer"
                      onClick={() => handleStockSelect(stock.symbol)}
                    >
                      Select
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;
