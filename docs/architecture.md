# Fixora Architecture (India-first)

## Stack
- **Mobile**: Flutter (Android-first), Riverpod state management.
- **Backend**: Node.js + Express + TypeScript.
- **Database**: PostgreSQL.
- **Auth**: JWT + Email/password + Google OAuth endpoint.
- **Payments**: Stripe Connect / Razorpay Route webhook placeholders with escrow lifecycle.

## Clean Architecture (Backend)
- `modules/<domain>`: controllers and future services/repositories.
- `core/middleware`: auth, RBAC, cross-cutting concerns.
- `core/utils`: shared business logic (payment breakdown).
- `db/migrations`: SQL migrations.

## Commission / GST Logic
For project value **P**:
- Commission = `0.15 * P`
- GST = `0.18 * Commission`
- Gateway fee (client side) = `0.02 * P`
- Freelancer payout = `P - Commission - GST`
- Client total = `P + Gateway fee`
- Platform net revenue = `Commission - GST`

### Example (₹2000)
- Commission = ₹300
- GST = ₹54
- Freelancer receives = ₹1646
- Gateway fee = ₹40
- Client pays = ₹2040
- Platform net revenue = ₹246

## Escrow Flow
1. Client creates escrow payment intent with total including gateway fee.
2. Funds captured/held in escrow account.
3. Project marked `in_progress`.
4. Client approves completion.
5. Commission + GST deducted.
6. Remaining payout released to freelancer.

Withdrawal endpoints must check payment/project completion status before transfer.

## REST API Routes
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`

### Projects
- `GET /api/projects`
- `POST /api/projects` (client)
- `PATCH /api/projects/:projectId/in-progress` (client)
- `PATCH /api/projects/:projectId/approve` (client)

### Bids
- `POST /api/projects/:projectId/bids` (freelancer)
- `PATCH /api/bids/:bidId/accept` (client)

### Payments / Escrow
- `GET /api/payments/preview?budget=`
- `POST /api/payments/escrow` (client)
- `POST /api/payments/release` (client)
- `POST /api/webhooks/stripe`
- `POST /api/webhooks/razorpay`

### Freelancer Profiles
- `PATCH /api/freelancers/me` (freelancer)
- `GET /api/freelancers/:userId`

### Reviews & Admin
- `POST /api/projects/:projectId/reviews` (client)
- `GET /api/admin/dashboard` (admin)

## Future scalability hooks
- Subscription plans and featured listings via new `Plan`, `ListingBoost` modules.
- AI skill matching service can consume projects + skills via event bus.
- Multi-currency and international payments via payment provider adapters.
- Push notifications via FCM module.
