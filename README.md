This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Setup

This project uses Prisma with PostgreSQL for production (Vercel) and SQLite for local development.

### Local Development

1. Create a `.env.local` file for your local environment variables.
2. If you are using a local PostgreSQL database, set the following:
   ```env
   POSTGRES_PRISMA_URL="postgres://..."
   POSTGRES_URL_NON_POOLING="postgres://..."
   ```
3. If you want to use SQLite for local development temporarily:
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "sqlite"
       url      = "file:./dev.db"
     }
     ```
   - Then run `npx prisma db push`.

### Production (Vercel)

The project is pre-configured to work with Vercel PostgreSQL.
- The `prisma/schema.prisma` uses the `postgresql` provider.
- Vercel automatically provides `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`.
- No `.env` file is required in production.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
