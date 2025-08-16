const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'https://expense-tacker-backend-indol.vercel.app' : 'https://expense-tacker-backend-indol.vercel.app';
};

export { getBaseUrl };