

// interface Props {
//     data: number[]|undefined;
//     price: number
//   }

//   const PredictedChart: React.FC<Props> = ({ data, price }) => {
//     return (
//         <div className="flex flex-col">
//    {/* I want a chart here which shows the predicted prices of the stock from data array which is an array of numbers, the price is a number */}
//         </div>
//   )
// }

// export default PredictedChart

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: number[] | undefined;
  price: number;
}

const PredictedChart: React.FC<Props> = ({ data, price }) => {
  if (!data) return <div>No prediction data available</div>;

  const labels = Array.from({ length: data.length + 1 }, (_, i) =>
    i === 0 ? 'Current Price' : `Day ${i}`
  );

  // Determine if the price on the 7th day is higher than the current price
  const isPriceIncreasing = data[data.length - 1] > price;

  // Conditional colors: green if the 7th day price is higher, red if lower
  const lineColor = isPriceIncreasing ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)';
  const backgroundColor = isPriceIncreasing ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Predicted Prices',
        data: [price, ...data], // The first entry is the current price, followed by predictions
        borderColor: lineColor,
        backgroundColor: backgroundColor,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows you to set custom height and width
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predicted Stock Prices for Next 7 Days',
      },
    },
  };

  return (
    <div className="flex flex-col" style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PredictedChart;
