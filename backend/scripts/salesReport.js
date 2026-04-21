import prisma, { formatCurrency, logActivity } from '../utils/db.js';

async function generateReport() {
  try {
    logActivity('REPORT_GEN', 'Generating advanced sales report...');

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;

    // Advanced Stats: Revenue by Month
    const revenueByMonth = orders.reduce((acc, order) => {
      const month = order.createdAt.toISOString().substring(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + order.total;
      return acc;
    }, {});

    console.log('\n========================================');
    console.log('         ADVANCED SALES REPORT          ');
    console.log('========================================');
    console.log(`Total Orders:         ${orderCount}`);
    console.log(`Total Revenue:        ${formatCurrency(totalRevenue)}`);
    console.log(`Average Order Value:  ${formatCurrency(orderCount > 0 ? totalRevenue / orderCount : 0)}`);
    console.log('----------------------------------------');
    console.log(`Pending Orders:       ${pendingOrders}`);
    console.log(`Shipped Orders:       ${shippedOrders}`);
    console.log('----------------------------------------');
    console.log('Monthly Revenue Breakdown:');
    Object.entries(revenueByMonth).sort().forEach(([month, rev]) => {
      console.log(`  ${month}:            ${formatCurrency(rev)}`);
    });
    console.log('========================================\n');

  } catch (error) {
    logActivity('ERROR', `Failed to generate report: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

generateReport();
