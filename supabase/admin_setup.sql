-- ==============================================================================
-- Admin Setup & Schema Updates
-- Run this in your Supabase SQL Editor
-- ==============================================================================

-- 1. Ensure the messages table has the `is_from_admin` flag for UI threading
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS is_from_admin BOOLEAN DEFAULT false NOT NULL;

-- 2. Create an admin user function
-- Usage: SELECT * FROM make_user_admin('your_email@example.com');
-- Sign up first, then run this. If the auth user exists but the profile row is
-- missing, this function creates the profile and marks it as admin.
DROP FUNCTION IF EXISTS public.make_user_admin(TEXT);

CREATE OR REPLACE FUNCTION public.make_user_admin(admin_email TEXT)
RETURNS TABLE(profile_id UUID, profile_email TEXT, profile_role user_role) AS $$
DECLARE
  normalized_email TEXT := lower(trim(admin_email));
BEGIN
  RETURN QUERY
  UPDATE public.profiles p
  SET role = 'admin'::user_role
  WHERE lower(p.email) = normalized_email
  RETURNING p.id, p.email, p.role;

  IF FOUND THEN
    RETURN;
  END IF;

  RETURN QUERY
  INSERT INTO public.profiles (id, email, full_name, role)
  SELECT
    u.id,
    u.email,
    u.raw_user_meta_data->>'full_name',
    'admin'::user_role
  FROM auth.users u
  WHERE lower(u.email) = normalized_email
  ON CONFLICT (id) DO UPDATE
    SET role = 'admin'::user_role,
        email = EXCLUDED.email,
        full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name)
  RETURNING profiles.id, profiles.email, profiles.role;

  IF FOUND THEN
    RETURN;
  END IF;

  RAISE EXCEPTION 'No Supabase auth user found for email %. Sign up with this exact email first, confirm the email if required, then run make_user_admin again.', admin_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional verification query:
-- SELECT id, email, role FROM public.profiles WHERE lower(email) = lower('your_email@example.com');

-- 3. Set your admin email (REPLACE THIS WITH YOUR ACTUAL ADMIN EMAIL!)
-- First, ensure you have signed up normally via the /signup page.
-- Then run this line:
-- SELECT * FROM make_user_admin('md.amurumep@gmail.com');
