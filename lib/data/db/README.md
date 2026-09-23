# Connecting a Real Database

This directory contains stub implementations that throw "Not implemented" errors.
To connect a real database (e.g., Supabase or Postgres + Prisma), follow these steps:

## 1. Install dependencies

```bash
# For Prisma:
npm install prisma @prisma/client
npx prisma init

# For Supabase:
npm install @supabase/supabase-js
```

## 2. Implement each repository

Replace the stub classes in this directory with real implementations:

- **dbProductRepo.ts** → Query products and product types from your database
- **dbOrderRepo.ts** → CRUD operations for orders, query regions
- **dbUserRepo.ts** → User lookup, creation, order counts
- **dbStorageRepo.ts** → Upload files to Supabase Storage or S3
- **dbAuthService.ts** → Real auth with Supabase Auth or NextAuth.js

Each stub file shows the exact interface methods you need to implement.

## 3. Switch the data source

In your `.env.local`, change:

```
DATA_SOURCE=db
```

That's it — the single entry point at `lib/data/index.ts` will import your
real implementations instead of the mock ones.

## 4. Environment variables

Add your database connection string and any API keys to `.env.local`:

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
# or for Supabase:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Architecture note

Pages, components, and server actions import ONLY from `@/lib/data` (the
barrel export in `index.ts`). They never touch mock or db implementations
directly. This means swapping the database requires changes to exactly
ONE file: `lib/data/index.ts` (or just the `DATA_SOURCE` env var if both
implementations are already built).
