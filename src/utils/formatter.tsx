// utils/formatter.js

// Format large numbers with commas and abbreviate if necessary
export const formatNumber = (num: number) => {
  if (num === null || num === undefined) return 'N/A';
  
  if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(2) + 'B';
  }
  if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(2) + 'M';
  }
  if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(2) + 'K';
  }
  
  if (Number.isInteger(num)) {
    return num.toLocaleString();
  }
  
  return num.toFixed(2);
};

// Format date to a readable string
export const formatDate = (date:Date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format percentage
export const formatPercentage = (num:number|null) => {
  if (num === null || num === undefined) return 'N/A';
  return (num * 100).toFixed(2) + '%';
};

// Format currency
export const formatCurrency = (num:number|null, currency = 'USD') => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};