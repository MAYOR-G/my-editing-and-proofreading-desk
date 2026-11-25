-- ==============================================================================
-- Google OAuth 2.0 & Provider Metadata Migration for public.profiles
-- Adds auth_provider, name, and avatar_url columns and updates handle_new_user
-- to support graceful account linking when a user signs in with Google using
-- an email that already exists.
-- ==============================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'credentials' NOT NULL,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT;

UPDATE public.profiles
SET name = full_name
WHERE name IS NULL AND full_name IS NOT NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_provider TEXT;
  v_name TEXT;
  v_avatar TEXT;
BEGIN
  v_provider := CASE
    WHEN COALESCE(new.raw_app_meta_data->>'provider', 'email') = 'google' THEN 'google'
    ELSE 'credentials'
  END;

  v_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name'
  );

  v_avatar := COALESCE(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture'
  );

  INSERT INTO public.profiles (id, email, full_name, name, avatar_url, auth_provider, role)
  VALUES (
    new.id,
    new.email,
    v_name,
    v_name,
    v_avatar,
    v_provider,
    'client'
  )
  ON CONFLICT (email) DO UPDATE
  SET
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    name = COALESCE(public.profiles.name, EXCLUDED.name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    auth_provider = CASE
      WHEN EXCLUDED.auth_provider = 'google' THEN 'google'
      ELSE public.profiles.auth_provider
    END;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
