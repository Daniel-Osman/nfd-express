# NFD Express - Website Usage Guide

## Overview

NFD Express is a package forwarding service that helps Lebanese customers shop from US stores (Amazon, AliExpress, Shein, Temu, etc.) and have their packages delivered to Lebanon.

---

## Test Credentials

### Admin Account
- **Email:** `admin@nfd-express.com`
- **Password:** `Admin123!`
- **Access:** Full admin dashboard with shipment management, user management, and scanner functionality

### User Account
- **Email:** `user@nfd-express.com`
- **Password:** `User123!`
- **Access:** Personal dashboard with shipment tracking and mailbox ID

---

## Setup Instructions

### Step 1: Run Database Migrations

Run the SQL scripts in order (001-007) to set up the database schema:

1. `001_create_enums.sql` - Creates status and tier enums
2. `002_create_profiles.sql` - Creates profiles table with RLS
3. `003_create_shipments.sql` - Creates shipments table with RLS
4. `004_create_shipment_events.sql` - Creates tracking events table
5. `005_create_profile_trigger.sql` - Auto-creates profile on signup
6. `006_create_storage_bucket.sql` - Creates storage for package photos
7. `007_fix_profiles_rls.sql` - Fixes admin RLS policies

### Step 2: Create Test Users

In the Supabase Dashboard:

1. Go to **Authentication** > **Users**
2. Click **Add User** > **Create New User**
3. Create the admin user:
   - Email: `admin@nfd-express.com`
   - Password: `Admin123!`
   - Check "Auto Confirm User"
4. Create the test user:
   - Email: `user@nfd-express.com`
   - Password: `User123!`
   - Check "Auto Confirm User"

### Step 3: Seed Test Data

Run the script `008_seed_test_data.sql` to populate the database with:
- Updated profile information for both users
- 5 sample shipments at various stages
- Tracking events for each shipment

---

## User Guide

### For Customers (User Role)

#### 1. Sign Up / Login

- Visit `/auth/login` to sign in
- Visit `/auth/sign-up` to create a new account
- After signing up, you'll receive a unique **Mailbox ID** (e.g., `NFD-XXXXXX`)

#### 2. Get Your US Shipping Address

Once logged in, go to `/dashboard` to find your US shipping address:

\`\`\`
Your Name (Mailbox ID: NFD-XXXXXX)
1234 NFD Express Way
Suite [Your Mailbox ID]
Wilmington, DE 19801
USA
\`\`\`

Use this address when shopping on US websites.

#### 3. Track Your Packages

On the dashboard, you can:
- View all your shipments with current status
- See tracking history for each package
- View package photos (Silver tier and above)
- Access verification notes (Silver tier and above)

#### 4. Subscription Tiers

| Feature | Free | Bronze | Silver | Gold |
|---------|------|--------|--------|------|
| Basic Tracking | ✓ | ✓ | ✓ | ✓ |
| Package Photos | ✗ | ✓ | ✓ | ✓ |
| Content Verification | ✗ | ✗ | ✓ | ✓ |
| Package Consolidation | ✗ | ✗ | ✗ | ✓ |
| Priority Support | ✗ | ✗ | ✗ | ✓ |

#### 5. Shipment Statuses

- **Pending** - Order placed, awaiting arrival at US warehouse
- **Received (US)** - Package arrived at NFD US warehouse
- **In Transit** - Package shipped to Lebanon
- **Customs** - Package at Lebanese customs
- **Out for Delivery** - Package with local courier
- **Delivered** - Package delivered successfully

---

### For Administrators (Admin Role)

#### 1. Access Admin Dashboard

Login with admin credentials and visit `/admin/dashboard`

#### 2. Dashboard Tabs

**Scanner Tab**
- Search shipments by tracking number
- Create new shipments for users (search by mailbox ID)
- Update shipment status
- Upload package photos
- Add admin verification notes

**Shipments Tab**
- View all shipments in the system
- Filter by status
- Select multiple packages for consolidation (Gold users only)
- Quick status updates

**Users Tab**
- View all registered users
- Update subscription tiers
- See user statistics

**Stats Tab**
- Overview of total shipments
- Active shipments count
- Delivered packages count
- Registered users count

#### 3. Processing a New Package

1. Go to **Scanner** tab
2. Enter tracking number in search box
3. If package exists, update its status
4. If new package:
   - Click "Create New Shipment"
   - Search for user by mailbox ID (e.g., "NFD-")
   - Enter package details (tracking, carrier, description, weight)
   - Click "Create Shipment"

#### 4. Updating Package Status

1. Search for package by tracking number
2. Select new status from dropdown
3. Add optional notes
4. Click "Update Status"
5. Upload photos if needed

#### 5. Consolidating Packages

1. Go to **Shipments** tab
2. Check boxes next to packages from the same Gold-tier user
3. Click "Consolidate Selected"
4. Packages will be merged into one shipment

---

## Page Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/auth/login` | Login page | Public |
| `/auth/sign-up` | Registration page | Public |
| `/dashboard` | User dashboard | Authenticated users |
| `/admin/dashboard` | Admin dashboard | Admin only |

---

## Test Data Overview

After running the seed script, the test user will have:

| Tracking | Carrier | Status | Description |
|----------|---------|--------|-------------|
| TBA123456789 | Amazon | Delivered | iPhone 15 Pro Case |
| LP00123456789CN | AliExpress | In Transit | Wireless Earbuds |
| SH2024789456 | Shein | Customs | Summer Dress Collection |
| TM98765432100 | Temu | Received (US) | Kitchen Gadgets Set |
| TBA987654321 | Amazon | Pending | Kindle Paperwhite |

---

## Troubleshooting

### "Infinite recursion detected in policy"
Run `007_fix_profiles_rls.sql` to fix the RLS policy issue.

### "User not found" when creating shipment
Make sure you're searching by the mailbox ID prefix (e.g., "NFD-") not the email.

### Photos not uploading
Ensure the storage bucket was created by running `006_create_storage_bucket.sql`.

### User can't access dashboard
Check that the user is authenticated and has a profile created (should happen automatically on signup).

---

## Support

For technical issues, check the browser console for error messages and ensure all migration scripts have been run successfully.
