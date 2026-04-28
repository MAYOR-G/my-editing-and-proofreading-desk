-- Migration: richer submission details, accurate pricing audit fields, and upload bucket hardening
-- Run this in the Supabase SQL Editor for existing projects.

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS document_type TEXT DEFAULT 'Other' NOT NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS formatting_style TEXT DEFAULT 'None / Standard Consistency' NOT NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS english_type TEXT DEFAULT 'No preference' NOT NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS turnaround_days INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS turnaround_hours INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS calculated_price NUMERIC(10, 2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS final_price NUMERIC(10, 2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS minimum_applied BOOLEAN DEFAULT false NOT NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_reference TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS uploaded_file_path TEXT;

UPDATE public.projects
SET
  final_price = COALESCE(final_price, price),
  calculated_price = COALESCE(calculated_price, price),
  payment_reference = COALESCE(payment_reference, transaction_reference),
  uploaded_file_path = COALESCE(uploaded_file_path, upload_file_path),
  turnaround_days = COALESCE(
    turnaround_days,
    CASE
      WHEN lower(turnaround) LIKE '%24%' THEN 1
      WHEN lower(turnaround) LIKE '%48%' THEN 2
      WHEN lower(turnaround) LIKE '%week%' THEN 28
      WHEN substring(turnaround from '[0-9]+') IS NOT NULL THEN LEAST(28, GREATEST(1, substring(turnaround from '[0-9]+')::integer))
      ELSE 14
    END
  ),
  turnaround_hours = COALESCE(
    turnaround_hours,
    CASE
      WHEN lower(turnaround) LIKE '%24%' THEN 24
      WHEN lower(turnaround) LIKE '%48%' THEN 48
      WHEN lower(turnaround) LIKE '%week%' THEN 672
      WHEN substring(turnaround from '[0-9]+') IS NOT NULL THEN LEAST(28, GREATEST(1, substring(turnaround from '[0-9]+')::integer)) * 24
      ELSE 336
    END
  );

CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_payment_reference_unique
  ON public.projects (payment_reference)
  WHERE payment_reference IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_projects_service_type ON public.projects (service_type);
CREATE INDEX IF NOT EXISTS idx_projects_document_type ON public.projects (document_type);
CREATE INDEX IF NOT EXISTS idx_projects_turnaround_days ON public.projects (turnaround_days);

-- Keep private storage buckets present in environments where SQL setup is used.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  false,
  52428800,
  ARRAY[
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO UPDATE
SET public = false;

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('deliveries', 'deliveries', false, 52428800)
ON CONFLICT (id) DO UPDATE
SET public = false;

DROP POLICY IF EXISTS "Clients can update own projects" ON public.projects;
DROP POLICY IF EXISTS "Clients can update own project notes" ON public.projects;

DROP POLICY IF EXISTS "Uploads: Client Insert" ON storage.objects;
CREATE POLICY "Uploads: Client Insert" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads' AND auth.uid()::text = (string_to_array(name, '/'))[1]
);

DROP POLICY IF EXISTS "Uploads: Client Select" ON storage.objects;
CREATE POLICY "Uploads: Client Select" ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads' AND auth.uid()::text = (string_to_array(name, '/'))[1]
);
