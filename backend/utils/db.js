import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Utility for formatting currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Log generic database activities
export const logActivity = (action, details) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${action}] ${details}`);
};

export default prisma;
