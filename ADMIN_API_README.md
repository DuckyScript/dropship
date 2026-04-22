# Admin API Configuration

## Environment Variables

Set the following environment variable to secure your admin APIs:

```bash
ADMIN_API_KEY=your-secure-random-api-key-here
```

**Important:** Generate a strong, random API key. For example:
```bash
# Generate a secure random key (Linux/Mac)
openssl rand -hex 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Usage

All admin API endpoints now require authentication via API key. You can provide the key in two ways:

### Option 1: Authorization Header (Recommended)
```
Authorization: Bearer your-api-key-here
```

### Option 2: X-API-Key Header
```
X-API-Key: your-api-key-here
```

## Secured Endpoints

The following endpoints are now protected:

- `POST /api/admin/inventory/sync` - Synchronize inventory with supplier
- `GET /api/admin/report` - Get sales reports and analytics
- `POST /api/admin/maintenance` - Run database maintenance tasks

## Example Requests

### Using curl
```bash
# Inventory sync
curl -X POST http://localhost:3000/api/admin/inventory/sync \
  -H "Authorization: Bearer your-api-key-here"

# Get report
curl -X GET http://localhost:3000/api/admin/report \
  -H "X-API-Key: your-api-key-here"

# Run maintenance
curl -X POST http://localhost:3000/api/admin/maintenance \
  -H "Authorization: Bearer your-api-key-here"
```

### Using JavaScript/fetch
```javascript
// Sync inventory
const response = await fetch('/api/admin/inventory/sync', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key-here'
  }
});

// Get report
const report = await fetch('/api/admin/report', {
  headers: {
    'X-API-Key': 'your-api-key-here'
  }
});
```

## Vercel Cron Jobs Configuration

Your `vercel.json` is already configured with cron jobs for automated admin tasks:

```json
{
  "crons": [
    {
      "path": "/api/admin/inventory/sync",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/admin/maintenance",
      "schedule": "0 3 * * *"
    }
  ]
}
```

**Important:** Vercel automatically injects environment variables into cron job executions. Make sure to set `ADMIN_API_KEY` in your Vercel project settings, and the cron jobs will work without any additional header configuration.

## Deploying to Vercel

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key:** `ADMIN_API_KEY`
   - **Value:** Your secure random API key (see generation commands below)
   - **Environments:** Select all (Production, Preview, Development)

### Step 2: Generate a Secure API Key

Run one of these commands locally to generate a strong API key:

```bash
# Using OpenSSL (Linux/Mac)
openssl rand -hex 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated key and paste it into Vercel's environment variable field.

### Step 3: Deploy

Push your code to trigger a deployment. The admin APIs are now secured!

## Security Notes

- Never commit your `ADMIN_API_KEY` to version control
- Rotate your API key periodically
- Use HTTPS in production to encrypt API key transmission
- Monitor failed authentication attempts in your logs
