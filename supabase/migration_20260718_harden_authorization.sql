-- Apply this migration to production immediately, then audit profiles.role and
-- recent project/message activity for unexpected changes.

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
REVOKE UPDATE ON public.profiles FROM authenticated;

DROP POLICY IF EXISTS "Clients can create projects" ON public.projects;
REVOKE INSERT ON public.projects FROM authenticated;

DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1
      FROM public.projects p
      WHERE p.id = project_id AND p.client_id = auth.uid()
    )
  );
