export const formatPercentageChange = (referencePrice: number, currentPrice: number) => {
  if (referencePrice === 0) {
    return 0;
  }
  return ((currentPrice - referencePrice) / referencePrice) * 100;
};
