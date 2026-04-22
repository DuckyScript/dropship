import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getApiKeyFromRequest, validateAdminApiKey } from '@/lib/auth';

export async function GET(request: Request) {
  // Validate API key
  const apiKey = getApiKeyFromRequest(request);
  if (!validateAdminApiKey(apiKey)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing API key' },
      { status: 401 }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;

    const revenueByMonth = orders.reduce((acc: Record<string, number>, order) => {
      const month = order.createdAt.toISOString().substring(0, 7);
      acc[month] = (acc[month] || 0) + order.total;
      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        totalOrders: orderCount,
        totalRevenue,
        averageOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
        pendingOrders,
        shippedOrders
      },
      revenueByMonth
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
