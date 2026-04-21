import prisma, { logActivity } from '../utils/db.js';

/**
 * Cleanup orders older than 365 days or with 'pending' status for more than 30 days.
 */
async function cleanupOrders() {
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    logActivity('CLEANUP_START', 'Starting order database maintenance...');

    // Delete really old orders (keeping history for 1 year)
    const oldOrders = await prisma.order.deleteMany({
      where: {
        createdAt: { lt: oneYearAgo }
      }
    });

    // Delete stale pending orders
    const stalePending = await prisma.order.deleteMany({
      where: {
        status: 'pending',
        createdAt: { lt: thirtyDaysAgo }
      }
    });

    logActivity('CLEANUP_COMPLETE', `Deleted ${oldOrders.count} orders older than 1 year and ${stalePending.count} stale pending orders.`);
  } catch (error) {
    logActivity('ERROR', `Maintenance task failed: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the maintenance
cleanupOrders();
