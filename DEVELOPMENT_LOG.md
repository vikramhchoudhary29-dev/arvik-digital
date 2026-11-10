# Development Log

## 2026-11-01 — Jewellery social media service page

### Inspected
- Confirmed Next.js 16 App Router + React 19 + TypeScript project structure.
- Reviewed existing Navbar, Footer, service CMS routes/components, contact form, enquiry API validation, sitemap, metadata, and design tokens.
- Confirmed service enquiries use an explicit server-side allowlist.

### Changes
- Added `app/jewellery-social-media-management/page.tsx` with a responsive jewellery-focused landing page using the existing dark/gold design language.
- Added a navbar link to the new page.
- Added the new service to the contact form dropdown and API allowlist so submissions are accepted and stored.
- Added the new route to the sitemap.
- Added `PROJECT_CONTEXT.md` and this development log.

### Decisions
- Kept the existing service CMS and database schema unchanged; the new niche landing page is a dedicated route.
- Did not publish a package price because pricing remains a proposal rather than a confirmed public price.
- Clearly stated that client-supplied product photos are used, client approval is required, and paid advertising/on-site shoots are separate.

### Verification
- Static source checks passed: the new route exists, all agreed monthly deliverables are present, and the contact-form option matches the API allowlist.
- `tsc --noEmit` could not run to completion because dependencies/types are absent from the supplied ZIP.
- Two `npm ci --ignore-scripts` attempts timed out before dependency installation completed; no dependencies or lockfile were changed. A production build therefore remains unverified.

### Known limitations / next steps
- Review the page in a local browser at desktop and mobile widths.
- Confirm the public monthly price and whether a package/pricing section should be shown.
- Add real portfolio examples only after approved assets or client work are available.


## 2026-11-01 — Fix jewellery page build error

### Root cause
- The installed `lucide-react` package does not export brand-logo components named `Facebook` or `Instagram`; importing them caused the Next.js module build to fail before the route could render.

### Changes
- Removed the unsupported icon imports in `app/jewellery-social-media-management/page.tsx`.
- Reused `Camera` for the Instagram service row and `UsersRound` for the Facebook service row. Service labels and copy are unchanged.
- Updated `PROJECT_CONTEXT.md` with the compatibility decision.

### Verification
- Confirmed the failing imports are removed from the page source.
- Dependency installation was attempted but did not complete within the execution window; a full Next.js build remains unverified and should be run locally.

### Next steps
- Run `npm run build` locally. If any further icon export error appears, verify that icon against the installed Lucide package before changing dependencies.


## 2026-11-01 — Complete jewellery page icon replacement

### Root cause
- The first compatibility fix removed the unsupported `Instagram` and `Facebook` imports and replaced the icons in the deliverables data, but three JSX references remained in the hero and feature sections.
- TypeScript therefore failed with `Cannot find name 'Instagram'` (and would also fail on the remaining `Facebook` reference).

### Changes
- Replaced all remaining JSX uses of `<Instagram />` with `<Camera />`.
- Replaced the remaining `<Facebook />` use with `<UsersRound />`.
- Kept platform names and all service copy unchanged.

### Verification
- Scanned the page source: no `Instagram` or `Facebook` icon component references remain; those words remain only as user-facing text.
- Full production build still needs to be rerun in the user's local environment.

## 2026-11-09 — Jewellery landing page, admin CMS, and enquiry CRM

### Inspected
- Existing Next.js 16 / React 19 / Prisma 7 / PostgreSQL / Cloudinary stack.
- Existing admin auth, media uploads, general enquiry API, shared layout and sidebar, and current jewellery page.

### Implemented
- Scoped pink/ivory/rose-gold landing page with admin-driven hero, floating image treatment, third-section portrait video gallery, services, process and dedicated lead form.
- Admin-only Cloudinary uploads for hero images and product videos, CRUD metadata, ordering and visibility controls.
- Dedicated jewellery enquiry storage model, validation, protected admin listing and status/notes updates.
- WhatsApp response link with prefilled introduction, and separate New / Followed Up / Cancelled filtered lists.
- Added admin sidebar links for Jewellery CMS and Jewellery Leads.
- Prepared additive SQL schema migration; did not run any migration or modify existing database records.

### Changed files
- `prisma/schema.prisma`, `prisma/jewellery_additions.sql`, `app/jewellery-social-media-management/page.tsx`, `app/globals.css`, `components/admin/AdminSidebar.tsx`.
- New `components/jewellery/*`, `components/admin/JewelleryCMS.tsx`, `components/admin/JewelleryLeadManager.tsx`.
- New `app/admin/jewellery/*`, `app/api/jewellery/enquiry/*`, `app/api/admin/jewellery/*`.
- Updated `PROJECT_CONTEXT.md` and `DEVELOPMENT_LOG.md`.

### Verification and limitations
- Parsed all 111 TS/TSX source files with TypeScript compiler parser: no syntax errors.
- Offline `npm ci` blocked by missing cached package (`zod-validation-error`); full typecheck and production build **not verified**.
- No live database or Cloudinary credentials were used; API/upload flows require local integration testing.
- Content reordering uses integer sort priorities and may require fine-tuning for equal priorities.
- Cloudinary video thumbnail generation is not yet implemented; video preview uses a play overlay.

### Next steps
1. Back up production DB, review additive SQL and apply to the intended database only with approval.
2. Run `npm install`, `npx prisma generate`, `npx tsc --noEmit`, and `npm run build` locally.
3. Test admin auth, image/video upload, status changes, form submission and WhatsApp link.
4. Upload actual jewellery images and videos; inspect desktop/mobile rendering.

## 2026-11-10 — Jewellery CMS usability and designs showcase
- Added admin-managed JewelleryDesign model, content API CRUD and image upload support.
- Added `prisma/jewellery_design_only.sql` for safe additive production migration; not executed.
- Added `JewelleryDesigns` public gallery before the video showcase, with full-size preview.
- Replaced the About section's abstract “Made to shine” card with an admin-managed image (first design, falling back to first hero slide).
- Improved JewelleryCMS upload UI with drag/drop selection, validation, upload progress, saving states, status notifications, and content preview/list states.
- Namespaced React list keys by content type to address duplicate-key warning.
- Verification: full TypeScript/build unavailable in sandbox due to incomplete npm dependency cache/network installation; user must run `npm install`, `npx prisma generate`, `npx tsc --noEmit`, `npm run build` and integration tests.
- Known issue: design gallery requires new table before visiting the admin CMS/public page; run additive SQL only after backup.

## 2026-11-10 — Image-only jewellery hero
- Removed all hero overlay gradients, heading, subtitle, and CTA buttons from the public jewellery slider.
- Retained admin-uploaded images, automatic fade transitions and slide dots. Images use object-contain to avoid cropping.
- Removed hero title/subtitle editing fields from Jewellery CMS; database fields retained unchanged.
- No changes to authentication, enquiry CRM, media upload API, or database schema.
- Verification: source inspected; local production build not run in this environment.

## 2026-11-10 — Hero banner full-image sizing
- Root cause: fixed 16:9 / 21:9 hero wrapper did not match uploaded 3.2:1 banners; absolute images could be letterboxed or appear cropped in constrained layouts.
- Hero wrapper now uses the active image natural aspect ratio from onLoad, with a 3.2:1 initial fallback and object-contain; no text/overlay/buttons.
- No changes to database, admin, uploads, or enquiry workflow.
- Verification: source inspection and archive integrity; local Next.js build not available here.
