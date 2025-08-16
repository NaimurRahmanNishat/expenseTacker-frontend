const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'http://localhost:5100' : 'http://localhost:5100';
};

export { getBaseUrl };