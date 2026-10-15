# Arvik Digital

Production Next.js website and admin CMS for Arvik Digital.

## Stack
- Next.js 16 + React 19 + TypeScript
- PostgreSQL + Prisma
- Cloudinary for admin media
- HTTP-only signed admin session cookie

## Environment variables
Create `.env.local` for local development:

```env
DATABASE_URL=postgresql://...
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=use-a-long-random-password
ADMIN_JWT_SECRET=use-at-least-32-random-characters
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Never commit `.env*` files or real credentials.

## Setup

```bash
npm install
npx prisma generate
npx prisma db push --accept-data-loss
npm run seed
npm run dev
```

The schema intentionally removes the former partner/commission tables. If this database already contains those tables, review the data-loss warning and use `npx prisma db push --accept-data-loss` only after confirming that the old partner data is no longer needed.

## Admin
Open `/admin/login`. The admin API independently verifies the signed HTTP-only cookie. The `/admin` route guard uses Next.js `proxy.ts` as an additional UX/security boundary.

## Removed functionality
The former partner/referral/commission programme has been completely removed from the application, database schema, public navigation, contact form, and admin panel.

## Team Members section

The homepage now includes a dynamic Meet Our Team section. Manage members at `/admin/team-members` after signing into the admin panel. Names, departments, job titles, bios, photos, ordering, and visibility are editable. Photos use the existing Cloudinary media upload endpoint.

### Database update required

After pulling/extracting this update and configuring `DATABASE_URL`, run:

```bash
npx prisma db push
npx prisma generate
```

Then run `npm run build` and deploy. Add the real team member names and photos in the admin panel; no sample team members are automatically seeded.
