const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'https://expense-tacker-backend-indol.vercel.app' : 'http://localhost:5100';
};

export { getBaseUrl };