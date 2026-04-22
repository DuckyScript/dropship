import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getApiKeyFromRequest, validateAdminApiKey } from '@/lib/auth';

export async function POST(request: Request) {
  // Validate API key
  const apiKey = getApiKeyFromRequest(request);
  if (!validateAdminApiKey(apiKey)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing API key' },
      { status: 401 }
    );
  }

  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
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

    return NextResponse.json({
      message: 'Maintenance complete',
      deletedOldOrders: oldOrders.count,
      deletedStalePending: stalePending.count
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
