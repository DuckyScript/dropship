import prisma, { logActivity } from '../utils/db.js';

/**
 * Simulates an API call to a dropshipping supplier to fetch updated inventory levels.
 */
async function fetchSupplierInventory() {
  logActivity('SUPPLIER_API', 'Fetching inventory data from supplier...');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get current products with SKUs
  const products = await prisma.product.findMany({
    where: { NOT: { sku: null } },
    select: { sku: true }
  });

  // Mocked supplier response: random stock levels between 0 and 50
  return products.map(p => ({
    sku: p.sku,
    stock: Math.floor(Math.random() * 51)
  }));
}

/**
 * Syncs the fetched supplier inventory data into the local database.
 */
async function syncInventory() {
  try {
    const supplierData = await fetchSupplierInventory();
    
    logActivity('SYNC_START', `Syncing ${supplierData.length} items...`);
    
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

    logActivity('SYNC_COMPLETE', `Successfully synchronized ${updatedCount} products.`);
  } catch (error) {
    logActivity('ERROR', `Inventory sync failed: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncInventory();
