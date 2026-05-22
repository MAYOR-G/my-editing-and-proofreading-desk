-- Admin overview/projects/messages refinement.
-- Preserves paid project records and adds optional support-message attachments.

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS attachment_file_path TEXT,
  ADD COLUMN IF NOT EXISTS attachment_file_name TEXT,
  ADD COLUMN IF NOT EXISTS attachment_content_type TEXT,
  ADD COLUMN IF NOT EXISTS attachment_file_size INTEGER,
  ADD COLUMN IF NOT EXISTS thread_key TEXT,
  ADD COLUMN IF NOT EXISTS inbound_message_id TEXT,
  ADD COLUMN IF NOT EXISTS email_references TEXT,
  ADD COLUMN IF NOT EXISTS latest_message TEXT,
  ADD COLUMN IF NOT EXISTS latest_message_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_sender TEXT DEFAULT 'user' NOT NULL,
  ADD COLUMN IF NOT EXISTS unread_count INTEGER DEFAULT 1 NOT NULL;

ALTER TABLE public.contact_message_replies
  ADD COLUMN IF NOT EXISTS sender_type TEXT DEFAULT 'admin' NOT NULL,
  ADD COLUMN IF NOT EXISTS sender_name TEXT,
  ADD COLUMN IF NOT EXISTS sender_email TEXT,
  ADD COLUMN IF NOT EXISTS inbound_message_id TEXT,
  ADD COLUMN IF NOT EXISTS email_references TEXT,
  ADD COLUMN IF NOT EXISTS attachment_file_path TEXT,
  ADD COLUMN IF NOT EXISTS attachment_file_name TEXT,
  ADD COLUMN IF NOT EXISTS attachment_content_type TEXT,
  ADD COLUMN IF NOT EXISTS attachment_file_size INTEGER;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS delivery_file_name TEXT,
  ADD COLUMN IF NOT EXISTS delivery_content_type TEXT,
  ADD COLUMN IF NOT EXISTS delivery_file_size INTEGER,
  ADD COLUMN IF NOT EXISTS delivery_sent_at TIMESTAMPTZ;

ALTER TABLE public.projects
  ALTER COLUMN status SET DEFAULT 'Pending'::project_status;

UPDATE public.projects
SET status = 'Pending'::project_status
WHERE status = 'In Progress'::project_status
  AND completed_at IS NULL;

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('deliveries', 'deliveries', false, 52428800)
ON CONFLICT (id) DO UPDATE
SET public = false;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_messages_last_sender_check'
  ) THEN
    ALTER TABLE public.contact_messages
      ADD CONSTRAINT contact_messages_last_sender_check
      CHECK (last_sender IN ('user', 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_message_replies_sender_type_check'
  ) THEN
    ALTER TABLE public.contact_message_replies
      ADD CONSTRAINT contact_message_replies_sender_type_check
      CHECK (sender_type IN ('user', 'admin'));
  END IF;
END $$;

UPDATE public.contact_messages
SET
  thread_key = COALESCE(thread_key, lower(trim(email))),
  latest_message = COALESCE(latest_message, admin_reply, message),
  latest_message_at = COALESCE(latest_message_at, replied_at, updated_at, created_at),
  last_sender = COALESCE(last_sender, CASE WHEN admin_reply IS NOT NULL THEN 'admin' ELSE 'user' END),
  unread_count = COALESCE(unread_count, CASE WHEN status = 'New' THEN 1 ELSE 0 END);

UPDATE public.contact_message_replies
SET
  sender_type = COALESCE(sender_type, 'admin'),
  sender_name = COALESCE(sender_name, 'Support'),
  sender_email = COALESCE(sender_email, sent_to);

CREATE INDEX IF NOT EXISTS idx_contact_messages_attachment_file_path
  ON public.contact_messages (attachment_file_path)
  WHERE attachment_file_path IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_contact_messages_thread_key_latest
  ON public.contact_messages (thread_key, latest_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_inbound_message_id
  ON public.contact_messages (inbound_message_id)
  WHERE inbound_message_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_contact_message_replies_message_created
  ON public.contact_message_replies (message_id, created_at);

CREATE INDEX IF NOT EXISTS idx_contact_message_replies_inbound_message_id
  ON public.contact_message_replies (inbound_message_id)
  WHERE inbound_message_id IS NOT NULL;

-- Earlier schema drafts scheduled automatic deletion of completed projects after
-- 30 days. Business/payment records should be retained; the app now archives
-- older in-progress work in the admin UI instead.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron')
    AND EXISTS (
      SELECT 1
      FROM cron.job
      WHERE jobname = 'delete_old_projects_job'
    )
  THEN
    PERFORM cron.unschedule('delete_old_projects_job');
  END IF;
EXCEPTION
  WHEN undefined_function OR undefined_table OR insufficient_privilege THEN
    NULL;
END $$;

DROP FUNCTION IF EXISTS public.delete_old_completed_projects();
