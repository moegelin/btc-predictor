export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'always',
  }).format(price);
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString();
};
