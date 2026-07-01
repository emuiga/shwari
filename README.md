# Shwari Movers — Web Frontend

Frontend for the Shwari Movers marketplace platform, connecting customers with vetted moving and transportation service providers.

## Tech Stack
- Next.js (App Router), TypeScript
- Tailwind CSS

## Structure
- `src/app/` — routes (thin, re-export the feature's page component)
- `src/features/<module>/presentation/pages/` — screen components per module
- `src/components/` — shared reusable components
- `src/lib/` — shared utilities

## Modules
- `auth` — login, registration, OTP verification, forgot/reset password

## Commands
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — run ESLint
