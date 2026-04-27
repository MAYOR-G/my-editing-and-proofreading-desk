# Supabase Setup Guide

This guide will walk you through creating your Supabase project, getting your API keys, and setting up the database schema for the "My Editing and Proofreading Desk" platform.

## Step 1: Create a Supabase Project
1. Go to [database.new](https://database.new) (which will redirect you to Supabase) and log in or sign up.
2. Click on **"New Project"**.
3. Select your organization, enter a **Name** for your project (e.g., `MEP Desk`), and generate a strong **Database Password**.
4. Choose a region closest to your users and click **Create new project**. 
5. *Wait a few minutes for the database to provision.*

## Step 2: Get Your API Keys
Once your project is ready, you need to copy the API keys into your `.env.local` file.

1. On the left sidebar of your Supabase dashboard, click the **Settings** icon (the gear icon at the very bottom).
2. Click on **API** under the Configuration section.
3. **Project URL:** Look for the "Project URL" section. Copy the URL and paste it into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`.
4. **Project API Keys:** Look for the "Project API keys" section.
   - Copy the `anon` `public` key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy the `service_role` `secret` key and paste it as `SUPABASE_SERVICE_ROLE_KEY`.

> **Important:** Never share your `SUPABASE_SERVICE_ROLE_KEY` with anyone or expose it in your frontend code. It bypasses all security rules.

## Step 3: Run the Database Schema
Now you need to create the tables, security policies, and the automated cron job. I have already written all the SQL you need.

1. On the left sidebar, click the **SQL Editor** icon.
2. Click **"New query"**.
3. Open the `supabase/schema.sql` file in your code editor.
4. Copy **ALL** the text inside `supabase/schema.sql` and paste it into the Supabase SQL Editor.
5. Click the **Run** button (or press `Cmd+Enter` / `Ctrl+Enter`).
6. You should see a "Success. No rows returned" message. Your database is now ready!

## Step 4: Create Storage Buckets
The application needs secure storage buckets to hold the uploaded drafts and the final delivered files.

1. On the left sidebar, click the **Storage** icon.
2. Click **"New Bucket"**.
3. Name the bucket exactly: `uploads`. 
   - **DO NOT** check "Public bucket" (we want this to be secure and private).
   - Click **Save**.
4. Click **"New Bucket"** again.
5. Name this bucket exactly: `deliveries`.
   - **DO NOT** check "Public bucket".
   - Click **Save**.

*(The security policies for these buckets were already created when you ran the SQL script in Step 3!)*

## Step 5: Start the Server
1. Make sure your `.env.local` is saved with the Supabase keys.
2. Stop your development server in the terminal (`Ctrl+C`).
3. Run `npm run dev` again to restart the server with the new environment variables. 
4. The server crash will be resolved, and you can now securely create an account and log in!
