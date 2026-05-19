-- Migration: optional user-adjusted word count for checkout pricing.
-- Run this in the Supabase SQL Editor for existing projects.

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS detected_word_count INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS adjusted_word_count INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS final_word_count INTEGER;

UPDATE public.projects
SET
  detected_word_count = COALESCE(detected_word_count, word_count),
  final_word_count = COALESCE(final_word_count, word_count)
WHERE word_count IS NOT NULL;
