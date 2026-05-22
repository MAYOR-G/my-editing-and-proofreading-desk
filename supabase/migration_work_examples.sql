-- ==============================================================================
-- Migration for Document-Driven Work Examples System
-- Run this script in your Supabase SQL Editor.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.work_examples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_key TEXT NOT NULL,
  category_label TEXT NOT NULL,
  category TEXT,
  title TEXT,
  description TEXT,
  source_doc_url TEXT,
  source_file_path TEXT,
  source_file_name TEXT,
  parsed_content_json JSONB DEFAULT '[]'::jsonb NOT NULL,
  parsed_content JSONB DEFAULT '[]'::jsonb NOT NULL,
  parse_status TEXT DEFAULT 'none' NOT NULL CHECK (parse_status IN ('none', 'parsed', 'failed')),
  parse_warning TEXT,
  parsed_block_count INTEGER DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'inactive', 'deleted')),
  is_active BOOLEAN DEFAULT true NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Upgrade Antigravity's initial table if it already exists.
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS category_key TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS category_label TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS source_doc_url TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS source_file_path TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS source_file_name TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS parsed_content_json JSONB DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS parsed_content JSONB DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS parse_status TEXT DEFAULT 'none' NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS parse_warning TEXT;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS parsed_block_count INTEGER DEFAULT 0 NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE public.work_examples ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now() NOT NULL;

UPDATE public.work_examples
SET
  category_key = COALESCE(
    NULLIF(category_key, ''),
    CASE
      WHEN lower(category) = 'geological engineering' THEN 'geological-engineering'
      ELSE regexp_replace(lower(COALESCE(category, category_label, title, '')), '[^a-z0-9]+', '-', 'g')
    END
  ),
  category_label = COALESCE(NULLIF(category_label, ''), category, title, 'Work example'),
  parsed_content_json = CASE
    WHEN parsed_content_json IS NULL OR parsed_content_json = '[]'::jsonb THEN COALESCE(parsed_content, '[]'::jsonb)
    ELSE parsed_content_json
  END,
  parse_status = CASE
    WHEN COALESCE(jsonb_array_length(parsed_content_json), jsonb_array_length(parsed_content), 0) > 0 THEN 'parsed'
    ELSE COALESCE(parse_status, 'none')
  END,
  status = COALESCE(status, CASE WHEN is_active = false THEN 'inactive' ELSE 'active' END)
WHERE category_key IS NULL OR category_label IS NULL OR parsed_content_json = '[]'::jsonb;

ALTER TABLE public.work_examples ALTER COLUMN category_key SET NOT NULL;
ALTER TABLE public.work_examples ALTER COLUMN category_label SET NOT NULL;

DELETE FROM public.work_examples
WHERE ctid IN (
  SELECT duplicate_ctid
  FROM (
    SELECT
      ctid AS duplicate_ctid,
      row_number() OVER (
        PARTITION BY category_key
        ORDER BY updated_at DESC NULLS LAST, created_at DESC NULLS LAST
      ) AS row_rank
    FROM public.work_examples
  ) ranked
  WHERE row_rank > 1
);

CREATE UNIQUE INDEX IF NOT EXISTS work_examples_one_active_per_category
ON public.work_examples (category_key);

ALTER TABLE public.work_examples ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active work examples" ON public.work_examples;
DROP POLICY IF EXISTS "Admins can view all work examples" ON public.work_examples;
DROP POLICY IF EXISTS "Admins can manage work examples" ON public.work_examples;

CREATE POLICY "Anyone can view active work examples"
ON public.work_examples FOR SELECT
USING (is_active = true AND status = 'active' AND parse_status = 'parsed');

CREATE POLICY "Admins can view all work examples"
ON public.work_examples FOR SELECT
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can manage work examples"
ON public.work_examples FOR ALL
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_work_examples_updated_at ON public.work_examples;
CREATE TRIGGER update_work_examples_updated_at
BEFORE UPDATE ON public.work_examples
FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Uploaded DOCX files are stored in the existing private "uploads" bucket under examples/{category_key}/.
