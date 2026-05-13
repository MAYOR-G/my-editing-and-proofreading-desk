-- Migration: optional target journal for document submissions.
-- Run this in the Supabase SQL Editor for existing projects.

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS target_journal TEXT;

CREATE INDEX IF NOT EXISTS idx_projects_target_journal
  ON public.projects (target_journal)
  WHERE target_journal IS NOT NULL;
