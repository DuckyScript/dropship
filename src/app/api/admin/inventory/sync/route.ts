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

  try {
    // Get current products with SKUs
    const products = await prisma.product.findMany({
      where: { NOT: { sku: null } },
      select: { sku: true }
    });

    // Mocked supplier response: random stock levels between 0 and 50
    const supplierData = products.map(p => ({
      sku: p.sku,
      stock: Math.floor(Math.random() * 51)
    }));

    let updatedCount = 0;
    for (const item of supplierData) {
      await prisma.product.updateMany({
        where: { sku: item.sku },
        data: {
          stock: item.stock,
          inStock: item.stock > 0,
          updatedAt: new Date()
        }
      });
      updatedCount++;
    }

    return NextResponse.json({
      message: `Successfully synchronized ${updatedCount} products.`,
      count: updatedCount
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
