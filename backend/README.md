# Backend Utilities

This folder contains backend scripts and utilities for managing the dropship store.

## Scripts

### 1. Inventory Management
`scripts/updateInventory.js`: Bulk update stock levels for products using their SKU.

**Usage:**
```bash
node backend/scripts/updateInventory.js <SKU> <QUANTITY_TO_ADD>
```

### 2. Sales Reporting
`scripts/salesReport.js`: Generate a quick summary of orders and revenue.

**Usage:**
```bash
node backend/scripts/salesReport.js
```

## Requirements
- Node.js
- Prisma Client (run `npx prisma generate` first)
- Configured environment variables (PostgreSQL or local SQLite)
