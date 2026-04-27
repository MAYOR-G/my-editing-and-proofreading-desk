-- ==============================================================================
-- Multi-provider payment architecture with Paystack active only
-- ==============================================================================

-- Expand payment_status enum for the full payment lifecycle.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'processing' AND enumtypid = 'payment_status'::regtype) THEN
    ALTER TYPE payment_status ADD VALUE 'processing';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'failed' AND enumtypid = 'payment_status'::regtype) THEN
    ALTER TYPE payment_status ADD VALUE 'failed';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'cancelled' AND enumtypid = 'payment_status'::regtype) THEN
    ALTER TYPE payment_status ADD VALUE 'cancelled';
  END IF;
END $$;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_provider TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS transaction_reference TEXT UNIQUE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS transaction_id TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_currency TEXT DEFAULT 'USD';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.payment_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL,
  transaction_reference TEXT NOT NULL,
  transaction_id TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD' NOT NULL,
  status payment_status DEFAULT 'pending'::payment_status NOT NULL,
  paid_at TIMESTAMPTZ,
  raw_provider_response JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(provider, transaction_reference)
);

ALTER TABLE public.payment_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients can view own payment records" ON public.payment_records;
CREATE POLICY "Clients can view own payment records" ON public.payment_records
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all payment records" ON public.payment_records;
CREATE POLICY "Admins can view all payment records" ON public.payment_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX IF NOT EXISTS idx_projects_transaction_reference ON public.projects (transaction_reference);
CREATE INDEX IF NOT EXISTS idx_projects_payment_status ON public.projects (payment_status);
CREATE INDEX IF NOT EXISTS idx_projects_payment_provider ON public.projects (payment_provider);
CREATE INDEX IF NOT EXISTS idx_payment_records_order_id ON public.payment_records (order_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_user_id ON public.payment_records (user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON public.payment_records (status);
