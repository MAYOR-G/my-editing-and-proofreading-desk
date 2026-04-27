# My Editing and Proofreading Desk Setup Guide

This guide reflects the current codebase. Follow it from top to bottom for a fresh setup, or use the troubleshooting section to repair an existing environment.

## 1. Project Overview

The app is a Next.js 14 App Router project backed by Supabase.

Main systems:

- Public marketing site and pricing pages
- Supabase email/password authentication
- Client dashboard at `/dashboard`
- Admin dashboard at `/admin`
- Private document uploads through Supabase Storage
- Paystack payment initialization, verification, and webhook handling
- Future payment-provider placeholders for Flutterwave, Stripe, and PayPal
- Resend email notifications and inbound email webhook route
- Optional Upstash Redis rate limiting

## 2. Install and Run Locally

From the project directory:

```bash
cd my-editing-and-proofreading-desk
npm install
cp .env.example .env.local
npm run dev
```

The local app usually runs at:

```text
http://localhost:3000
```

If port `3000` is busy, Next.js may choose another port such as `3001`.

## 3. Environment Variables

Create `.env.local` in the project root.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Paystack: active provider
PAYSTACK_SECRET_KEY="sk_test_or_live_..."
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_or_live_..."
PAYSTACK_WEBHOOK_SECRET="sk_test_or_live_..."
PAYMENT_ACTIVE_PROVIDER="paystack"

# Future providers: placeholders only, not required for the app to run
FLUTTERWAVE_SECRET_KEY=""
FLUTTERWAVE_PUBLIC_KEY=""
FLUTTERWAVE_WEBHOOK_HASH=""
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
PAYPAL_CLIENT_ID=""
PAYPAL_CLIENT_SECRET=""

# Email
RESEND_API_KEY="re_your_resend_api_key"
ADMIN_EMAIL="md.amurumep@gmail.com"

# AI editing tool
OPENROUTER_API_KEY="your-openrouter-api-key"

# Optional rate limiting
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Site URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Important:

- Never expose `SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`, or `PAYSTACK_WEBHOOK_SECRET` in browser code.
- `NEXT_PUBLIC_*` variables are visible to the browser.
- `PAYMENT_ACTIVE_PROVIDER` must stay `paystack` until another provider is fully implemented.

## 4. Supabase Setup

### 4.1 Create the Supabase Project

1. Create a project in Supabase.
2. Go to Project Settings > API.
3. Copy:
   - Project URL into `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service role key into `SUPABASE_SERVICE_ROLE_KEY`

### 4.2 Configure Auth

In Supabase Authentication:

1. Enable Email provider.
2. Set the Site URL:
   - Local: `http://localhost:3000`
   - Production: your deployed domain
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-production-domain.com/auth/callback`
4. If email confirmation is enabled, users must verify their email before logging in.

### 4.3 Run Database SQL

For a fresh database:

1. Open Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. Run `supabase/admin_setup.sql`.

For an existing older database:

1. Run `supabase/migration_paystack_flutterwave.sql` if it has not been applied before.
2. Run `supabase/migration_multi_provider_paystack_only.sql`.
3. Run `supabase/admin_setup.sql`.

The schema creates:

- `profiles`
- `projects`
- `payment_records`
- `messages`
- user roles: `client`, `admin`
- project/payment status enums
- RLS policies
- automatic profile creation for new auth users
- automatic project friendly IDs

### 4.4 Create Storage Buckets

Create these private buckets in Supabase Storage:

- `uploads`
- `deliveries`

The SQL schema includes storage policies for users and admins. The buckets themselves still need to be created in the Supabase dashboard.

## 5. Admin Access Setup

Admin access is DB-role based. Gmail and any other valid email can be an admin. The app does not restrict admins by email domain.

The role lives here:

```text
public.profiles.role
```

Valid values:

```text
client
admin
```

### 5.1 Create an Admin User

1. Start the app locally.
2. Go to `/signup`.
3. Sign up with the exact email that should become admin.
4. Confirm the email if Supabase email confirmation is enabled.
5. Open Supabase SQL Editor.
6. Copy and run the full contents of `supabase/admin_setup.sql` in the Supabase SQL Editor. Do not run only the final `SELECT` line unless the function already exists.
7. Run:

```sql
SELECT * FROM make_user_admin('md.amurumep@gmail.com');
```

Use your actual admin email. The function is case-insensitive and trims surrounding spaces.
If the Supabase auth user exists but the `profiles` row is missing, the function creates the profile and marks it as admin.

### 5.2 Verify Admin Role

Run:

```sql
SELECT id, email, role
FROM public.profiles
WHERE lower(email) = lower('md.amurumep@gmail.com');
```

Expected:

```text
role = admin
```

### 5.3 Access Admin Dashboard

1. Go to `/admin/login`.
2. Log in with the admin email and password.
3. Successful admins are redirected to `/admin`.

Admin routing now works like this:

- `/admin` with no session redirects to `/admin/login`
- `/admin` with a signed-in non-admin redirects to `/admin/access-denied`
- `/admin` with `profiles.role = admin` loads the admin dashboard
- `/dashboard` remains the normal client dashboard

### 5.4 Why Admin Access May Have Failed

The common failure is an email mismatch. For example, these are different emails:

```text
md.amurumep@gmail.com
md.mondimep@gmail.com
md.mudimep@gmail.com
```

If `make_user_admin` was run with an email that did not match the account you used to sign up, no real user received the admin role in the old setup. The updated function now updates an existing profile, creates a missing profile when the auth user exists, and raises a clear error when no auth user exists.

Other checks:

- Make sure the user signed up before running `make_user_admin`.
- Make sure the user completed email confirmation if your Supabase project requires it.
- Make sure you are logging in at `/admin/login`, not only `/login`.
- If you changed a role while logged in, refresh the page or sign out and back in. The current middleware checks the database role on each admin request, so no custom JWT claim refresh is required.

## 6. Authentication and Routing

Auth files:

- `app/actions/auth.ts`: regular login, signup, signout, password reset
- `app/actions/admin.ts`: admin login and admin logout
- `middleware.ts`: route protection and RBAC checks
- `lib/admin-auth.ts`: server-side admin guard for admin pages and sensitive admin actions

Client routes:

- `/signup`: create a client account
- `/login`: regular user login
- `/dashboard`: user dashboard entry, redirects to `/dashboard/overview`

Admin routes:

- `/admin/login`: admin login
- `/admin`: admin dashboard
- `/admin/users`: user registry
- `/admin/requests`: messages and broadcasts
- `/admin/access-denied`: shown to signed-in users who are not admins

Security notes:

- Admin status is never trusted from the frontend.
- Admin pages validate the role server-side.
- Admin pages use `SUPABASE_SERVICE_ROLE_KEY` only after the admin guard passes.
- Non-admin users cannot access admin data by changing frontend state.

## 7. Payment Setup

Paystack is the only functional payment provider.

Active code paths:

- `app/api/payments/initialize/route.ts`
- `app/api/payments/verify/route.ts`
- `app/api/webhooks/paystack/route.ts`
- `lib/payment.ts`

Checkout UI displays:

- Paystack: Available
- Flutterwave: Coming soon
- Stripe: Coming soon
- PayPal: Coming soon

Future providers are intentionally disabled. Missing Flutterwave, Stripe, or PayPal keys should not crash the app.

### 7.1 Paystack Configuration

In Paystack:

1. Copy your secret key to `PAYSTACK_SECRET_KEY`.
2. Copy your public key to `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.
3. Set `PAYMENT_ACTIVE_PROVIDER=paystack`.
4. Configure the webhook URL:

```text
https://your-production-domain.com/api/webhooks/paystack
```

Paystack webhook signature verification uses:

```text
PAYSTACK_WEBHOOK_SECRET
```

If this is blank, the code falls back to `PAYSTACK_SECRET_KEY`.

### 7.2 Payment Flow

1. Client uploads a document.
2. Server calculates the price.
3. Server creates a pending project and payment record.
4. Server initializes a Paystack transaction.
5. Client is redirected to Paystack.
6. Paystack redirects back to `/dashboard/payment/success`.
7. Server verifies the transaction using Paystack.
8. Only verified payments mark the order as paid.
9. Paystack webhooks can also mark delayed successful payments as paid.

## 8. Email Setup

The app uses Resend for notification emails.

Set:

```env
RESEND_API_KEY="re_your_resend_api_key"
ADMIN_EMAIL="md.amurumep@gmail.com"
```

Routes and files:

- `lib/email.ts`: payment and delivery notifications
- `app/actions/messages.ts`: client/admin message notifications
- `app/api/webhooks/inbound/route.ts`: inbound email webhook placeholder/handler

For production, verify your sending domain in Resend and configure DNS as Resend requires.

## 9. AI Editing Tool

The AI editing routes use:

```env
OPENROUTER_API_KEY="your-openrouter-api-key"
```

Relevant files:

- `app/api/ai-edit/route.ts`
- `app/api/ai-edit/extract/route.ts`
- `lib/ai-editing.ts`

## 10. Rate Limiting

Rate limiting uses Upstash Redis when configured:

```env
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

If these are blank, the app falls back to an in-memory limiter. That is acceptable for local development but not ideal for production or multi-instance hosting.

## 11. Deployment

Recommended deployment target: Vercel.

1. Push the project to GitHub.
2. Import the project into Vercel.
3. Add all production environment variables in Vercel.
4. Set `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` to the production domain.
5. In Supabase Auth, add the production callback URL:

```text
https://your-production-domain.com/auth/callback
```

6. In Paystack, set the production webhook:

```text
https://your-production-domain.com/api/webhooks/paystack
```

7. Deploy.

Before going live:

- Use live Paystack keys.
- Confirm Supabase RLS policies are enabled.
- Confirm buckets are private.
- Confirm service-role key is only stored as a server-side environment variable.
- Create and verify at least one admin account.

## 12. Troubleshooting

### `/admin` redirects to `/dashboard`

This was old behavior. Current behavior should send non-admin users to `/admin/access-denied`.

If it still redirects to `/dashboard`, redeploy/restart the app and confirm `middleware.ts` contains the updated admin access-denied logic.

### Admin login says "Access denied"

Check the role:

```sql
SELECT id, email, role
FROM public.profiles
WHERE lower(email) = lower('your-admin-email@example.com');
```

If no row appears, the user has not signed up or the email is different.

If `role = client`, run:

```sql
SELECT * FROM make_user_admin('your-admin-email@example.com');
```

### `make_user_admin` throws "No Supabase auth user found"

The email does not exist in Supabase Auth. Sign up first with that exact email, confirm the account if required, then run the function again.

### Admin login says "no profile role was found"

Run the full `supabase/admin_setup.sql` file, then run:

```sql
SELECT * FROM make_user_admin('md.amurumep@gmail.com');
```

Then verify:

```sql
SELECT id, email, role
FROM public.profiles
WHERE lower(email) = lower('md.amurumep@gmail.com');
```

Expected result: `role = admin`.

### Admin was granted but still denied

1. Verify `public.profiles.role = admin`.
2. Confirm you are logging in with the same email.
3. Sign out and sign back in at `/admin/login`.
4. Restart the dev server if you edited middleware.

### Payment initialization fails

Check:

- `PAYSTACK_SECRET_KEY` is set.
- `PAYMENT_ACTIVE_PROVIDER=paystack`.
- `NEXT_PUBLIC_APP_URL` points to the current app URL.
- The user is signed in.
- The upload bucket exists.

### Paystack webhook rejected

Check:

- Webhook URL is `/api/webhooks/paystack`.
- `PAYSTACK_WEBHOOK_SECRET` matches the key used for Paystack signatures, or leave it blank to fall back to `PAYSTACK_SECRET_KEY`.
- The transaction reference exists in `projects.transaction_reference`.

### Signup works but no profile row is created

Confirm `supabase/schema.sql` was run successfully and the `on_auth_user_created` trigger exists.

### Storage upload fails

Confirm:

- The `uploads` bucket exists.
- The bucket is private.
- Storage policies from `schema.sql` were applied.

## 13. Quick Admin Repair Checklist

Use this exact sequence when admin access is broken:

1. Sign up at `/signup` with the intended admin email.
2. Confirm the email if required.
3. Run:

```sql
SELECT * FROM make_user_admin('your-admin-email@example.com');
```

4. Verify:

```sql
SELECT email, role
FROM public.profiles
WHERE lower(email) = lower('your-admin-email@example.com');
```

5. Sign out.
6. Visit `/admin/login`.
7. Log in with the admin email and password.

If the email in step 3 is not exactly the email used in step 1, the admin grant will not apply to the account you are using.
