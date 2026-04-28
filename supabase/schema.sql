-- ==============================================================================
-- My Editing and Proofreading Desk - Supabase Database Schema
-- Run this script in your Supabase SQL Editor.
-- ==============================================================================

-- 1. Create custom types
CREATE TYPE project_status AS ENUM ('In Progress', 'Ready', 'Completed');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'paid', 'failed', 'cancelled');
CREATE TYPE user_role AS ENUM ('client', 'admin');

-- 2. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'client'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Trigger to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'client');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Projects Table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  friendly_id TEXT UNIQUE NOT NULL, -- e.g., MEP-1024
  title TEXT NOT NULL,
  service_type TEXT NOT NULL,
  document_type TEXT DEFAULT 'Other' NOT NULL,
  formatting_style TEXT DEFAULT 'None / Standard Consistency' NOT NULL,
  english_type TEXT DEFAULT 'No preference' NOT NULL,
  turnaround TEXT NOT NULL,
  turnaround_days INTEGER,
  turnaround_hours INTEGER,
  word_count INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  calculated_price NUMERIC(10, 2),
  final_price NUMERIC(10, 2),
  minimum_applied BOOLEAN DEFAULT false NOT NULL,
  status project_status DEFAULT 'In Progress'::project_status NOT NULL,
  payment_status payment_status DEFAULT 'pending'::payment_status NOT NULL,
  payment_provider TEXT,           -- 'paystack' | 'flutterwave' | 'stripe' | 'paypal'
  payment_reference TEXT UNIQUE,
  transaction_reference TEXT UNIQUE, -- Provider transaction reference
  transaction_id TEXT,             -- Provider unique transaction ID
  payment_currency TEXT DEFAULT 'USD',
  payment_verified_at TIMESTAMPTZ,
  client_notes TEXT,
  upload_file_path TEXT NOT NULL, -- Path in Supabase Storage
  uploaded_file_path TEXT,
  delivery_file_path TEXT, -- Path in Supabase Storage
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects Policies
CREATE POLICY "Clients can view own projects" ON public.projects FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Clients can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Admins can view all projects" ON public.projects FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update all projects" ON public.projects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Trigger to auto-generate friendly_id (MEP-XXXX)
CREATE SEQUENCE project_id_seq START 1000;
CREATE OR REPLACE FUNCTION set_project_friendly_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.friendly_id := 'MEP-' || nextval('project_id_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_friendly_id
BEFORE INSERT ON public.projects
FOR EACH ROW EXECUTE PROCEDURE set_project_friendly_id();

-- 4. Payment Records Table
CREATE TABLE public.payment_records (
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

CREATE POLICY "Clients can view own payment records" ON public.payment_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all payment records" ON public.payment_records FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. Messages/Support Notes Table
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages for their projects" ON public.messages FOR SELECT USING (
  auth.uid() = sender_id OR 
  EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.client_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 5. Storage Buckets Setup
-- You need to create these manually in the Supabase Dashboard -> Storage:
-- 1. 'uploads' (Private bucket for client documents)
-- 2. 'deliveries' (Private bucket for edited documents)

-- Storage Policies for 'uploads'
-- Admin can do everything. Clients can select/insert their own.
CREATE POLICY "Uploads: Admin Full Access" ON storage.objects FOR ALL USING (
  bucket_id = 'uploads' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Uploads: Client Insert" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads' AND auth.uid()::text = (string_to_array(name, '/'))[1]
);
CREATE POLICY "Uploads: Client Select" ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads' AND auth.uid()::text = (string_to_array(name, '/'))[1]
);

-- Storage Policies for 'deliveries'
CREATE POLICY "Deliveries: Admin Full Access" ON storage.objects FOR ALL USING (
  bucket_id = 'deliveries' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Deliveries: Client Select" ON storage.objects FOR SELECT USING (
  bucket_id = 'deliveries' AND auth.uid()::text = (string_to_array(name, '/'))[1]
);


-- ==============================================================================
-- 6. AUTOMATED 30-DAY DELETION (CRON JOB)
-- This requires pg_cron extension to be enabled in Supabase.
-- ==============================================================================

-- First, ensure pg_cron is enabled (this usually requires Superuser, but Supabase allows it via Dashboard -> Database -> Extensions)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to delete old projects and their files
CREATE OR REPLACE FUNCTION delete_old_completed_projects()
RETURNS void AS $$
DECLARE
  old_project RECORD;
BEGIN
  -- Find projects completed more than 30 days ago
  FOR old_project IN 
    SELECT id, upload_file_path, delivery_file_path 
    FROM public.projects 
    WHERE status = 'Completed' 
    AND completed_at < NOW() - INTERVAL '30 days'
  LOOP
    -- Note: To delete from storage securely, you normally call the Supabase storage API.
    -- However, doing it via pure SQL is complex because storage API uses a separate schema/service.
    -- The easiest way in Supabase is to let ON DELETE CASCADE handle relational data, 
    -- and use a Supabase Edge Function triggered by a cron job to call the Storage API and delete the db row.
    
    -- But since you want DB-level deletion, we can delete the record here. 
    -- YOU MUST ensure your Edge Function handles the actual file deletion if you want storage cleared!
    DELETE FROM public.projects WHERE id = old_project.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule the cron job to run daily at 2:00 AM
SELECT cron.schedule('delete_old_projects_job', '0 2 * * *', 'SELECT delete_old_completed_projects();');
