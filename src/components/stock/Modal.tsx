import React from 'react';
import { Stock } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
  action: 'buy' | 'sell';
  error: string | null;
  onSubmit: (quantity: number) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, stock, action, onSubmit, error }) => {
  const [quantity, setQuantity] = React.useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-gray-800 text-white rounded-lg p-8 m-4 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4 capitalize">{action} {stock.name}</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="mb-4">Current Price: ${stock.price.toFixed(2)}</p>
        {action == 'buy' && <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>}
        <p className="mb-4">Total: ${(stock.price * quantity).toFixed(2)}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onSubmit(quantity)}
            className={`px-4 py-2 rounded-md ${action === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} transition-colors duration-300`}
          >
            Confirm {action}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;