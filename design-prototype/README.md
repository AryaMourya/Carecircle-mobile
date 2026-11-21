# CareCircle design prototype (reference, not wired into the app)

A mobile-first UI design and starter code for the caregiver and patient screens
(see `screenshots/`). It was written for Next.js 14 with its own `app/`, `lib/` and
`@/` alias, and has NOT been tested against this repo's Next.js setup.

Treat it as a design reference to port into `src/` (plans P4 patient experience and
P5 dashboard/notifications). It is excluded from `tsc` and ESLint on purpose.

What is in it
- Bottom nav with a center "+" quick-actions sheet (components/BottomNav.tsx)
- Welcome, login/register, home, medicines, records, family circle, profile pages
- Notification bell with unread count (components/NotificationBell.tsx)
- Patient "Today" view with large "I took it" / "Skipped" buttons
- Prescription review (human-in-the-loop) screen
- logo.svg (public/logo.svg)

Page data is placeholder. Dose acknowledgements are patient-reported, not verified intake.
