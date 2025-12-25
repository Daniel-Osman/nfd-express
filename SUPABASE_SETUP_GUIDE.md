# Supabase Setup Guide for NFD Express

This guide walks you through connecting your NFD Express app to Supabase from scratch.

---

## Prerequisites

- A Vercel account (for deployment)
- Basic understanding of SQL

---

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Fill in the details:
   - **Name**: `nfd-express` (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to your users (e.g., Europe for Lebanon)
4. Click **Create New Project**
5. Wait 2-3 minutes for the project to be created

---

## Step 2: Get Your Environment Variables

### From Supabase Dashboard:

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **API** in the settings menu
3. Copy the following values:

```bash
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Anon/Public Key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here

# Service Role Key (keep this secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-key-here
```

4. Go to **Project Settings** → **Database**
5. Scroll down to **Connection String** → **URI**
6. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password:

```bash
POSTGRES_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
```

---

## Step 3: Add Environment Variables to Vercel

### If using Vercel:

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `POSTGRES_URL`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` = `http://localhost:3000/auth/callback` (for local dev)

### If using v0:

1. Click the **Vars** button in the left sidebar of your v0 chat
2. Add each environment variable listed above
3. Click **Save**

---

## Step 4: Run SQL Scripts

You need to run the SQL scripts in order to set up your database schema.

### In Supabase Dashboard:

1. Go to **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the contents of each script file and run them **in order**:

#### Script 1: Create Enums
```sql
-- Copy and paste contents of scripts/001_create_enums.sql
-- Then click "Run" or press Cmd/Ctrl + Enter
```

#### Script 2: Create Profiles Table
```sql
-- Copy and paste contents of scripts/002_create_profiles.sql
-- Then click "Run"
```

#### Script 3: Create Shipments Table
```sql
-- Copy and paste contents of scripts/003_create_shipments.sql
-- Then click "Run"
```

#### Script 4: Create Shipment Events Table
```sql
-- Copy and paste contents of scripts/004_create_shipment_events.sql
-- Then click "Run"
```

#### Script 5: Create Profile Trigger
```sql
-- Copy and paste contents of scripts/005_create_profile_trigger.sql
-- Then click "Run"
```

#### Script 6: Create Storage Bucket
```sql
-- Copy and paste contents of scripts/006_create_storage_bucket.sql
-- Then click "Run"
```

#### Script 7: Fix RLS Policies
```sql
-- Copy and paste contents of scripts/007_fix_profiles_rls.sql
-- Then click "Run"
```

#### Script 8: Add Email Column
```sql
-- Copy and paste contents of scripts/009_add_email_to_profiles.sql
-- Then click "Run"
```

### Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `profiles`
   - `shipments`
   - `shipment_events`

---

## Step 5: Create Test Users

### In Supabase Dashboard:

1. Go to **Authentication** → **Users** in the left sidebar
2. Click **Add User** → **Create New User**

#### Create Admin User:
- **Email**: `admin@nfd-express.com`
- **Password**: `Admin123!`
- **✓ Check**: Auto Confirm User
- Click **Create User**

#### Create Test Customer:
- **Email**: `user@nfd-express.com`
- **Password**: `User123!`
- **✓ Check**: Auto Confirm User
- Click **Create User**

---

## Step 6: Seed Test Data

Now that you have users in the Auth table, you can populate their profiles and add sample shipments.

1. Go back to **SQL Editor**
2. Create a **New Query**
3. Copy and paste the contents of `scripts/008_seed_test_data.sql`
4. Click **Run**

This will:
- Create profiles for both users with unique mailbox IDs
- Add 5 sample shipments for the test user
- Create shipment tracking events

---

## Step 7: Verify Setup

### Check Tables:

1. Go to **Table Editor** → **profiles**
   - Should see 2 profiles (admin and user)
   - Each should have a unique `mailbox_id` (e.g., `NFD-A1B2C3`)

2. Go to **Table Editor** → **shipments**
   - Should see 5 sample shipments
   - Various statuses: pending, received, in_transit, customs, delivered

3. Go to **Table Editor** → **shipment_events**
   - Should see multiple tracking events

---

## Step 8: Test Authentication

### Login as Admin:

1. Go to `/auth/login` in your app
2. Enter:
   - Email: `admin@nfd-express.com`
   - Password: `Admin123!`
3. You should be redirected to `/admin/dashboard`

### Login as User:

1. Log out (if logged in)
2. Go to `/auth/login`
3. Enter:
   - Email: `user@nfd-express.com`
   - Password: `User123!`
4. You should be redirected to `/dashboard`

---

## Step 9: Test Admin Features

As admin (`admin@nfd-express.com`):

1. **Scanner View**: Create a new shipment
   - Enter tracking number
   - Upload photos
   - Update status

2. **Shipments Table**: View all shipments
   - Filter by status
   - Update shipment status
   - Add verification notes

3. **Users Table**: Manage customers
   - View all users
   - Change subscription tiers

---

## Step 10: Test User Features

As user (`user@nfd-express.com`):

1. **Dashboard**: View your profile
   - See your unique mailbox ID (e.g., `NFD-A1B2C3`)
   - Check your subscription tier
   - View tier features

2. **My Shipments**: Track packages
   - See package details
   - View photos (Bronze+ only)
   - Check verification status (Silver+ only)

---

## Troubleshooting

### "Infinite recursion detected in policy for relation profiles"

**Solution**: Make sure you ran `scripts/007_fix_profiles_rls.sql` which creates the `is_admin()` function.

### "Email not found" when running seed script

**Solution**: Create the users in **Authentication** → **Users** first (Step 5), then run the seed script.

### Can't upload photos

**Solution**: Check that the `shipment-photos` storage bucket was created in Step 4, script 006.

### Users can't sign up

**Solution**: 
1. Go to **Authentication** → **Settings** → **Auth Providers**
2. Make sure **Email** provider is enabled
3. Disable email confirmation for testing (or set up email in Supabase)

### RLS policies blocking queries

**Solution**: 
- For admin routes: Make sure the user's `role` is set to `'admin'` in the profiles table
- For user routes: Make sure you're querying only the logged-in user's data

---

## Security Checklist

Before going to production:

- [ ] Change default admin email and password
- [ ] Enable email confirmation in Supabase Auth settings
- [ ] Review all RLS policies
- [ ] Test that users can only see their own data
- [ ] Test that admins can access admin routes
- [ ] Set up email templates for password reset
- [ ] Configure custom SMTP (optional)
- [ ] Add rate limiting for API routes
- [ ] Review storage bucket policies

---

## Next Steps

Your app is now connected to Supabase! Here's what you can do next:

1. **Customize the design**: Update colors, fonts, and layout
2. **Add WhatsApp notifications**: Integrate WhatsApp API for shipment updates
3. **Add payment processing**: Integrate Stripe for tier upgrades
4. **Email notifications**: Set up email alerts for shipment status changes
5. **Public tracking page**: Create `/track/[trackingNumber]` for public tracking
6. **Analytics**: Add Vercel Analytics to track usage

---

## Support

If you encounter issues:

1. Check the Supabase logs: **Database** → **Logs**
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Make sure all SQL scripts ran successfully

---

## Environment Variables Summary

Here's a complete list of all required environment variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Database (optional, for direct SQL queries)
POSTGRES_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Local Development
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

Copy these to your `.env.local` file for local development, and add them to Vercel for production.
