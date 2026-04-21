import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateReport() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;

    console.log('=== SALES REPORT ===');
    console.log(`Total Orders: ${orderCount}`);
    console.log(`Total Revenue: $${totalRevenue.toFixed(2)}`);
    console.log(`Average Order Value: $${(orderCount > 0 ? totalRevenue / orderCount : 0).toFixed(2)}`);
    console.log('--------------------');
    console.log(`Pending: ${pendingOrders}`);
    console.log(`Shipped: ${shippedOrders}`);
    console.log('====================');

  } catch (error) {
    console.error('[ERROR] Failed to generate report', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateReport();
