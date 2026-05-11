-- ==============================================================================
-- Payment method settings and conditional service submission fields
-- ==============================================================================

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS formatting_instructions TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS translation_preference TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS translation_target_language TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS selected_services JSONB DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10, 2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS service_charge_percentage NUMERIC(5, 2) DEFAULT 5 NOT NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS service_charge_amount NUMERIC(10, 2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS selected_payment_method TEXT;

CREATE TABLE IF NOT EXISTS public.payment_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  paystack_enabled BOOLEAN DEFAULT true NOT NULL,
  flutterwave_enabled BOOLEAN DEFAULT false NOT NULL,
  paypal_enabled BOOLEAN DEFAULT false NOT NULL,
  stripe_enabled BOOLEAN DEFAULT false NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

INSERT INTO public.payment_settings (
  id,
  paystack_enabled,
  flutterwave_enabled,
  paypal_enabled,
  stripe_enabled
)
VALUES ('default', true, false, false, false)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view payment settings" ON public.payment_settings;
CREATE POLICY "Authenticated users can view payment settings" ON public.payment_settings
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update payment settings" ON public.payment_settings;
CREATE POLICY "Admins can update payment settings" ON public.payment_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can insert payment settings" ON public.payment_settings;
CREATE POLICY "Admins can insert payment settings" ON public.payment_settings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
