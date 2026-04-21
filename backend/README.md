# Dropship Backend Utilities

Advanced administrative tools for managing the Dropship store.

## Structure

- `/scripts`: User-facing CLI tools.
- `/tasks`: Automated background tasks and maintenance.
- `/utils`: Common utilities and database connection.

## Installation

Ensure you have run `npm install` and your environment variables are configured in `.env`.

## Usage

### Sales Reporting
Generates an advanced sales report with revenue breakdown.
```bash
node backend/scripts/salesReport.js
```

### Inventory Management
#### Manual Update
Update stock for a specific SKU.
```bash
node backend/scripts/updateInventory.js <SKU> <QUANTITY>
```

#### Supplier Sync
Simulate an inventory sync with a dropshipping supplier.
```bash
node backend/tasks/syncSupplier.js
```

### Database Maintenance
Clean up old or stale orders.
```bash
node backend/tasks/maintenance.js
```

## Advanced Features
- **Centralized Database Utility**: Shared Prisma instance and formatting helpers.
- **Activity Logging**: Standardized logging with timestamps for all operations.
- **Automated Sync Logic**: Ready-to-use patterns for supplier integrations.
