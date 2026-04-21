import prisma, { logActivity } from '../utils/db.js';

async function updateStock(sku, quantity) {
  try {
    const product = await prisma.product.updateMany({
      where: { sku: sku },
      data: {
        stock: {
          increment: quantity
        },
        inStock: true 
      }
    });
    
    if (product.count > 0) {
      logActivity('STOCK_UPDATE', `Updated SKU: ${sku}. Added: ${quantity}`);
    } else {
      logActivity('WARNING', `No product found with SKU: ${sku}`);
    }
  } catch (error) {
    logActivity('ERROR', `Failed to update stock for SKU: ${sku} - ${error.message}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node updateInventory.js <SKU> <QUANTITY>');
    process.exit(1);
  }

  const sku = args[0];
  const quantity = parseInt(args[1], 10);

  if (isNaN(quantity)) {
    console.error('Quantity must be a number');
    process.exit(1);
  }

  await updateStock(sku, quantity);
  await prisma.$disconnect();
}

main();
