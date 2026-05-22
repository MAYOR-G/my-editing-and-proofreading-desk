-- ==============================================================================
-- My Editing and Proofreading Desk - Supabase Database Schema
-- Run this script in your Supabase SQL Editor.
-- ==============================================================================

-- 1. Create custom types
CREATE TYPE project_status AS ENUM ('Pending', 'In Progress', 'Ready', 'Completed');
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
  selected_services JSONB DEFAULT '[]'::jsonb NOT NULL,
  document_type TEXT DEFAULT 'Other' NOT NULL,
  target_journal TEXT,
  formatting_style TEXT DEFAULT 'None / Standard Consistency' NOT NULL,
  formatting_instructions TEXT,
  translation_preference TEXT,
  translation_target_language TEXT,
  english_type TEXT DEFAULT 'No preference' NOT NULL,
  turnaround TEXT NOT NULL,
  turnaround_days INTEGER,
  turnaround_hours INTEGER,
  detected_word_count INTEGER,
  adjusted_word_count INTEGER,
  final_word_count INTEGER,
  word_count INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  calculated_price NUMERIC(10, 2),
  subtotal NUMERIC(10, 2),
  service_charge_percentage NUMERIC(5, 2) DEFAULT 5 NOT NULL,
  service_charge_amount NUMERIC(10, 2),
  final_price NUMERIC(10, 2),
  minimum_applied BOOLEAN DEFAULT false NOT NULL,
  status project_status DEFAULT 'Pending'::project_status NOT NULL,
  payment_status payment_status DEFAULT 'pending'::payment_status NOT NULL,
  payment_provider TEXT,           -- 'paystack' | 'flutterwave' | 'stripe' | 'paypal'
  selected_payment_method TEXT,
  payment_reference TEXT UNIQUE,
  transaction_reference TEXT UNIQUE, -- Provider transaction reference
  transaction_id TEXT,             -- Provider unique transaction ID
  payment_currency TEXT DEFAULT 'USD',
  payment_verified_at TIMESTAMPTZ,
  client_notes TEXT,
  upload_file_path TEXT NOT NULL, -- Path in Supabase Storage
  uploaded_file_path TEXT,
  delivery_file_path TEXT, -- Path in Supabase Storage
  delivery_file_name TEXT,
  delivery_content_type TEXT,
  delivery_file_size INTEGER,
  delivery_sent_at TIMESTAMPTZ,
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

-- 5. Payment Settings Table
CREATE TABLE public.payment_settings (
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

CREATE POLICY "Authenticated users can view payment settings" ON public.payment_settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update payment settings" ON public.payment_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can insert payment settings" ON public.payment_settings
  FOR INSERT WITH CHECK (
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

-- 6. Contact/support inbox used by public contact form and dashboard support.
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'Contact Form' NOT NULL,
  status TEXT DEFAULT 'New' NOT NULL CHECK (status IN ('New', 'Open', 'Replied', 'Closed')),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  thread_key TEXT,
  inbound_message_id TEXT,
  email_references TEXT,
  latest_message TEXT,
  latest_message_at TIMESTAMPTZ,
  last_sender TEXT DEFAULT 'user' NOT NULL CHECK (last_sender IN ('user', 'admin')),
  unread_count INTEGER DEFAULT 1 NOT NULL,
  attachment_file_path TEXT,
  attachment_file_name TEXT,
  attachment_content_type TEXT,
  attachment_file_size INTEGER,
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.contact_message_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES public.contact_messages(id) ON DELETE CASCADE NOT NULL,
  reply TEXT NOT NULL,
  sent_to TEXT NOT NULL,
  sender_type TEXT DEFAULT 'admin' NOT NULL CHECK (sender_type IN ('user', 'admin')),
  sender_name TEXT,
  sender_email TEXT,
  inbound_message_id TEXT,
  email_references TEXT,
  attachment_file_path TEXT,
  attachment_file_name TEXT,
  attachment_content_type TEXT,
  attachment_file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_message_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update contact messages" ON public.contact_messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view contact message replies" ON public.contact_message_replies FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can insert contact message replies" ON public.contact_message_replies FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

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
-- 6. RETENTION
-- ==============================================================================

-- Paid project records are preserved. The admin UI filters in-progress work older
-- than 30 days into an archive/history view instead of deleting business records.
