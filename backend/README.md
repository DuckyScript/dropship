# Dropship Backend Utilities

Advanced administrative tools for managing the Dropship store.

## Structure

- `/scripts`: User-facing CLI tools.
- `/tasks`: Automated background tasks and maintenance.
- `/utils`: Common utilities and database connection.

## Usage

### Local CLI (Development)

Ensure you have run `npm install` and your environment variables are configured in `.env`.

#### Sales Reporting
```bash
node backend/scripts/salesReport.js
```

#### Inventory Management
```bash
node backend/scripts/updateInventory.js <SKU> <QUANTITY>
node backend/tasks/syncSupplier.js
```

#### Database Maintenance
```bash
node backend/tasks/maintenance.js
```

### Vercel / API (Production)

The backend logic is also exposed via Next.js API routes for Vercel compatibility and remote management.

- **Sales Report**: `GET /api/admin/report`
- **Inventory Sync**: `POST /api/admin/inventory/sync`
- **Maintenance**: `POST /api/admin/maintenance`

You can trigger these using tools like `curl` or by configuring **Vercel Cron Jobs** in your `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/admin/inventory/sync",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/admin/maintenance",
      "schedule": "0 0 * * *"
    }
  ]
}
```

## Advanced Features
- **Centralized Database Utility**: Shared Prisma instance and formatting helpers.
- **Activity Logging**: Standardized logging with timestamps for all operations.
- **Automated Sync Logic**: Ready-to-use patterns for supplier integrations.
