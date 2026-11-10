# Project Context — Arvik Digital

## Project
- Production website and admin CMS for Arvik Digital.
- Stack: Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS 4, PostgreSQL with Prisma 7, Cloudinary media uploads.
- Existing visual identity: dark background with gold accents; shared Navbar and Footer; WhatsApp enquiry CTAs.

## Existing architecture
- Public pages live in `app/` and shared UI in `components/`.
- Services are database-managed through the `Service` model and admin CMS.
- Enquiries are stored through `app/api/enquiry/route.ts`; service values are validated against an explicit allowlist.
- Sitemap is generated in `app/sitemap.ts`.

## Current change
- Added a dedicated static landing page at `/jewellery-social-media-management` for jewellery businesses.
- Added the page to the public navbar and sitemap.
- Added "Jewellery Social Media Management" to the contact form and enquiry API allowlist.
- No database schema, existing CMS records, authentication, or unrelated page behaviour was changed.
- Pricing is intentionally not published because the monthly fee has not been confirmed as final.

## Service scope represented on the page
- 12 designed product posts and 2 product reels per month.
- Instagram and Facebook content management and publishing.
- Captions, hashtag research, monthly content calendar, organic growth recommendations, and performance reporting.
- Client supplies product photographs; Arvik Digital creates the designs and reels using photo animation and AI-assisted video where appropriate.
- Content requires client approval before publishing. Paid ads, ad spend, on-site photography, and additional content are separate.


## Latest fix — icon compatibility
- Replaced unsupported `Facebook` and `Instagram` Lucide exports on the jewellery landing page with supported generic icons (`UsersRound` and `Camera`). Platform names and page content remain unchanged.
- No dependencies, database schema, APIs, or unrelated UI were changed.

- Follow-up TypeScript fix: replaced the remaining JSX brand-icon component references with supported generic Lucide icons; platform names remain in page copy.

## Jewellery marketing CMS and CRM — 2026-11-09
- Dedicated public landing page at `/jewellery-social-media-management`, using a scoped blush-pink/ivory/rose-gold palette. Shared navbar/footer and all other routes remain unchanged.
- Hero slides (`JewelleryHeroSlide`) and video showcases (`JewelleryVideo`) are database-managed and uploaded through an admin-authenticated Cloudinary endpoint. The gallery displays four portrait cards on large desktop and two on mobile.
- Separate `JewelleryEnquiry` model/table in the **existing** PostgreSQL database, distinct from general `Enquiry`. The new form posts to `/api/jewellery/enquiry`; admin records are available at `/admin/jewellery/enquiries`.
- Statuses are `NEW`, `FOLLOWED_UP`, `CANCELLED`; changes preserve records and store relevant timestamps. WhatsApp opens an external chat but does not automatically mark a lead as followed up.
- Admin CMS route: `/admin/jewellery`; content APIs require the existing admin cookie authentication.
- Additive SQL migration prepared at `prisma/jewellery_additions.sql`. **Not applied** to any database; review and back up before applying. Prisma Client must be regenerated after schema changes.
- Video file cap 100 MB; image cap 10 MB. Upload limits also depend on Cloudinary account configuration and hosting limits.
- No production sample media was supplied; the public page displays a fallback hero and an empty-state video section until the admin uploads actual media.

## Jewellery showcase update (2026-11-10)
- Landing page order: hero slider, About with admin-managed jewellery image, Creative Designs Showcase, Product Videos, services, process and enquiry.
- JewelleryDesign is a separate Prisma model/table for images with title, order and visibility. Existing enquiry, hero and video models are unchanged.
- Admin `/admin/jewellery` now handles hero, designs and videos with drag-and-drop upload and progress/status feedback. Existing Cloudinary upload integration reused.
- Deployment prerequisite: apply `prisma/jewellery_design_only.sql` to the intended Neon database after backup; do not reset or drop existing tables.
- Verification still required on user's machine: TypeScript, production build, Cloudinary uploads, public gallery, existing enquiry flow.

### Jewellery hero presentation (2026-11-10)
- Hero is image-only: no overlay, heading, subtitle or CTA. Admin-uploaded images are displayed without cropping; optional navigation dots for multiple slides.
- Hero title/subtitle fields remain in database for compatibility but are hidden from CMS UI.

- Jewellery public hero: image-only, no overlay, and dynamically sized to each uploaded image natural aspect ratio (initial 3.2:1), preserving full banner without crop.
