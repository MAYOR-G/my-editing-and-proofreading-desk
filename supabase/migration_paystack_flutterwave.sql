-- ==============================================================================
-- Migration: PayPal → Paystack + Flutterwave
-- Run this in your Supabase SQL Editor AFTER backing up your data.
-- ==============================================================================

-- 1. Add new payment columns
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_provider TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS transaction_reference TEXT UNIQUE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS transaction_id TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_currency TEXT DEFAULT 'USD';

-- 2. Remove old PayPal column
ALTER TABLE public.projects DROP COLUMN IF EXISTS paypal_order_id;

-- 3. Security: Restrict client updates to non-payment fields only
-- Remove the old permissive policy
DROP POLICY IF EXISTS "Clients can update own projects" ON public.projects;

-- Create a new, safer policy:
-- Clients can only update client_notes (not payment_status, not provider fields)
CREATE POLICY "Clients can update own project notes" ON public.projects 
  FOR UPDATE USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);

-- 4. Index for faster webhook lookups
CREATE INDEX IF NOT EXISTS idx_projects_transaction_reference 
  ON public.projects (transaction_reference);
CREATE INDEX IF NOT EXISTS idx_projects_payment_status 
  ON public.projects (payment_status);
CREATE INDEX IF NOT EXISTS idx_projects_payment_provider 
  ON public.projects (payment_provider);

-- 5. Add a processed_at column to prevent duplicate webhook processing
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ;
