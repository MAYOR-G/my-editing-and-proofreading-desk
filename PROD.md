# Product Requirements Document (PRD)

## My Editing and Proofreading Desk

### Domain: editandproofread.com

## 1. Document Overview

**Project Name:** My Editing and Proofreading Desk  
**Domain:** editandproofread.com  
**Product Type:** Editorial services website with user portal and admin dashboard  
**Primary Goal:** Enable users to create an account, upload documents, choose editing-related services, pay online with PayPal, track order progress, and download completed files from their dashboard.

This product combines a premium marketing website with a secure service portal for managing document-based editorial work.

---

## 2. Product Vision

My Editing and Proofreading Desk should feel professional, trustworthy, simple, and premium. The platform is designed for users who need services such as proofreading, editing, formatting, translation, and writing support for academic, business, or personal documents.

The website should not feel like a basic brochure site. It should operate like a real service platform with a polished front end, a structured order workflow, and a simple internal admin system.

---

## 3. Product Objectives

1. Present the brand professionally and build trust.
2. Allow users to register and manage their projects securely.
3. Let users upload documents and receive automatic pricing based on word count, service type, and turnaround time.
4. Accept payments via PayPal.
5. Allow the admin team to manage jobs, upload completed work, and update statuses.
6. Notify users by email at every important step.
7. Maintain a clean, scalable architecture for future upgrades.

---

## 4. Target Users

### Primary User Groups

- Students
- Academic researchers
- Business professionals
- Authors and writers
- General users with document editing needs

### Internal Users

- Business owner / admin
- Staff editor(s) if expanded later

---

## 5. Core Services at Launch

The launch version should include the following service categories:

- Proofreading
- Editing
- Formatting
- Translation
- Writing support

Optional future services:

- CV/resume editing
- Statement of purpose/personal statement review
- Citation/reference formatting
- Technical/business document polishing

---

## 6. Product Scope

### In Scope (Version 1)

- Marketing website
- Account registration and login
- User dashboard
- Document upload
- Automatic word count
- Dynamic pricing calculation
- PayPal payment flow
- Order tracking
- Admin dashboard
- Completed file upload and delivery
- Branded email notifications
- Contact form / client note system

### Out of Scope (Version 1)

- Live chat between client and admin
- Team collaboration between multiple editors
- Mobile app
- PDF word-count support for pricing
- Subscription billing
- Automated editing using AI
- Public order tracking without login

---

## 7. Recommended Tech Stack

### Frontend

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI** for clean dashboard components

### Backend / Platform

- **Supabase** for:
  - PostgreSQL database
  - Authentication
  - File storage
  - Row-level security

### Hosting

- **Vercel** for frontend deployment

### Payments

- **PayPal Checkout** using server-side order creation and capture verification

### Email

- **Resend** for transactional emails

### Version Control

- **GitHub**

### Domain / DNS

- **Namecheap** for domain management

### Monitoring / Protection

- Basic analytics and error tracking can be added later (optional)

---

## 8. Functional Requirements

## 8.1 Public Website

### Required Pages

1. Home
2. Services
3. Pricing / How Pricing Works
4. About
5. FAQ
6. Contact
7. Login
8. Sign Up

### Home Page Requirements

- Premium hero section
- Clear value proposition
- CTA to submit document / create account
- Services overview
- Why choose us
- Turnaround options
- Confidentiality section
- Testimonials or trust section
- FAQ preview
- Footer with contact and legal links

### Services Page Requirements

- Service categories and explanations
- Suitable audience examples (academic, business, personal)
- Turnaround explanation
- CTA to upload document

### Pricing Page Requirements

- Explain that pricing depends on:
  - word count
  - service type
  - turnaround speed
- Clarify that final pricing is calculated automatically during submission

### Contact Page Requirements

- Contact form
- Business email information
- Optional WhatsApp/contact details if desired later

---

## 8.2 Authentication

### User Authentication Requirements

- Sign up with email and password
- Login with email and password
- Forgot password flow
- Reset password flow
- Email confirmation after sign-up
- Protected routes for logged-in users

### Admin Authentication Requirements

- Separate admin role
- Admin-only protected dashboard
- Admin access must not rely only on hidden URL path
- Admin users should authenticate securely like normal users but with role-based access

---

## 8.3 User Dashboard

### Dashboard Features

- View profile information
- View all submitted projects
- See order status
- View service type
- View price paid
- View submission date
- Download completed files when available
- Send a message/note to admin by form

### Project Status for Version 1

- In Progress
- Ready
- Completed

### Optional Internal Statuses (admin-facing only)

- Submitted
- Payment Pending
- Paid
- Assigned
- In Review
- Delivered
- Archived

---

## 8.4 Document Submission Flow

### Submission Requirements

1. User must be logged in.
2. User starts a new submission.
3. User enters:
   - full name
   - email
   - service type
   - selected turnaround time
   - optional notes/instructions
4. User uploads file.
5. System validates file type.
6. System calculates word count.
7. System calculates price.
8. User reviews order summary.
9. User proceeds to PayPal payment.
10. On successful payment:

- order is created/updated as paid
- user sees confirmation screen
- user receives email confirmation
- admin receives new order email
- order appears in dashboard as In Progress

### Supported File Types

- .doc
- .docx
- .txt

### File Validation Rules

- Block unsupported formats
- Max file size limit should be configurable
- Virus/malware scanning can be added later if needed

---

## 8.5 Word Count and Pricing Engine

### Word Count Requirements

- Extract text from uploaded `.doc`, `.docx`, and `.txt` files
- Calculate total word count automatically
- Save word count to database
- Display word count in order summary

### Pricing Variables

Pricing should be based on:

- service type
- turnaround option
- total word count

### Suggested Logic Structure

- Base rate per word depends on service
- Faster turnaround applies a multiplier or premium rate
- System computes total automatically before payment

### Turnaround Options

- 7 days
- 14 days
- 4 weeks

### Admin Configurability

Rates should be stored in a way that can be updated later without code rewrite.

---

## 8.6 PayPal Payment Flow

### Payment Requirements

- Create PayPal order on the server
- Present PayPal checkout to user
- Capture/verify payment on success
- Store transaction reference and status in database
- Mark order as paid only after server verification

### Required Payment Records

- internal order ID
- PayPal order ID
- capture/payment ID if available
- payment status
- amount
- currency
- paid_at timestamp
- payer email if returned

### Payment Statuses

- pending
- approved
- captured
- failed
- refunded (future-ready)

### Important Rule

The system must never mark an order as paid based only on a client-side callback. Server-side verification is required.

---

## 8.7 Email Notification System

### User Emails

1. Welcome email after sign-up
2. Payment received email
3. Document received / order created email
4. Project ready/completed email
5. Password reset email
6. Optional support reply email later

### Admin Emails

1. New user sign-up notification (optional)
2. New paid order notification
3. New dashboard message from client
4. Optional delivery reminder notifications later

### Email Content Requirements

- Branded sender name
- Clear subject lines
- Order reference where applicable
- Professional tone
- Support contact information

---

## 8.8 Admin Dashboard

### Admin Capabilities

- Login securely
- View all orders
- Filter by status
- Open individual order
- View uploaded file details
- View user notes/instructions
- Update order status
- Upload completed document
- Add optional admin note
- Trigger completion email
- View payment metadata
- View contact messages

### Admin Content Management (Basic Version)

Admin should be able to update simple website content later, but this can be phase two if needed.

Potential editable content:

- hero text
- service descriptions
- FAQ entries
- contact information
- pricing explanations

---

## 8.9 File Delivery and Retention

### Completed File Delivery

- Admin uploads completed file to secure private storage
- User sees downloadable file only when status is Ready/Completed
- Download should use secure signed access or authenticated file access

### Retention Policy

Recommended initial policy:

- Original uploaded files retained for a fixed period after completion
- Completed files retained for a fixed period after delivery
- Database order records remain permanently

Suggested default:

- keep files for 60 days after completion, then archive/delete based on policy

This policy should be disclosed in the website's terms or FAQ.

---

## 9. Non-Functional Requirements

### Performance

- Fast page load on public pages
- Smooth dashboard navigation
- Reliable uploads for supported files

### Security

- HTTPS everywhere
- Secure authentication
- Password hashing managed by auth provider
- Rate limiting on login and forms
- File type validation
- Role-based access control for admin routes
- Private file buckets/storage
- Server-side payment verification
- Audit-friendly order records

### Scalability

- Architecture should allow more services and staff later
- Database schema should support additional statuses and service types
- Pricing logic should be extendable

### Reliability

- Graceful failure for file upload errors
- Graceful failure for payment interruption
- Logging for important actions

---

## 10. User Experience Requirements

### Brand Tone

- Premium
- Trustworthy
- Clear
- Professional
- Calm and polished

### Design Direction

- Clean whitespace
- Strong typography
- Minimal visual clutter
- Premium service-business look
- Better visual experience than typical proofreading websites

### Accessibility

- Clear contrast
- Keyboard-accessible forms where possible
- Form validation messages
- Responsive design for mobile and desktop

---

## 11. Core User Flows

## 11.1 User Registration Flow

1. Visit website
2. Click Sign Up
3. Enter email/password
4. Confirm email
5. Access dashboard

## 11.2 Submission and Payment Flow

1. Login
2. Start new project
3. Upload document
4. Select service type
5. Select turnaround time
6. Add notes
7. Review calculated price and word count
8. Pay via PayPal
9. Receive confirmation
10. View project in dashboard as In Progress

## 11.3 Project Completion Flow

1. Admin reviews order
2. Admin completes work offline
3. Admin uploads finished file
4. Admin changes status to Ready or Completed
5. User gets email notification
6. User logs in and downloads file

## 11.4 Client Message Flow

1. User opens project/dashboard
2. Sends note/message via form
3. Message stored or forwarded appropriately
4. Admin receives email alert

---

## 12. Database Requirements

### Suggested Tables

1. **users**
   - id
   - email
   - full_name
   - role
   - created_at

2. **orders**
   - id
   - user_id
   - service_type
   - turnaround_option
   - word_count
   - price_amount
   - currency
   - status
   - payment_status
   - notes
   - uploaded_file_path
   - completed_file_path
   - created_at
   - updated_at
   - completed_at

3. **payments**
   - id
   - order_id
   - paypal_order_id
   - paypal_capture_id
   - amount
   - currency
   - status
   - payer_email
   - raw_response_json
   - created_at

4. **messages**
   - id
   - order_id
   - user_id
   - subject
   - body
   - created_at

5. **pricing_rules**
   - id
   - service_type
   - turnaround_option
   - base_rate_per_word
   - active
   - created_at
   - updated_at

6. **audit_logs** (optional but recommended)
   - id
   - actor_id
   - action_type
   - entity_type
   - entity_id
   - metadata
   - created_at

---

## 13. Role and Permissions

### Standard User

- register/login
- create new submission
- view own orders only
- download own completed files only
- send support/project notes

### Admin

- view all orders
- update statuses
- upload final files
- view payment information
- manage pricing rules later
- manage website content later if implemented

---

## 14. API / System Modules

### Frontend Modules

- Marketing website
- Auth pages
- User dashboard
- Project submission flow
- Payment confirmation flow
- Admin dashboard

### Backend Modules

- Auth/session module
- File upload module
- Word count service
- Pricing engine
- PayPal order module
- Payment verification module
- Order management module
- Email notification module
- Admin management module

---

## 15. Environment Variables

## 15.1 Frontend / App Variables

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `NEXT_PUBLIC_DEFAULT_CURRENCY`

## 15.2 Server-Side Variables

- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_ENVIRONMENT`
  Values: `sandbox` or `live`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ADMIN_NOTIFICATION_EMAIL`
- `SUPPORT_EMAIL`
- `MAX_UPLOAD_SIZE_MB`
- `FILE_RETENTION_DAYS`
- `WORD_COUNT_TIMEOUT_MS`
- `CRON_SECRET`

## 15.3 Optional Future Variables

- `SENTRY_DSN`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `ANALYTICS_ID`

---

## 16. Suggested Storage Structure

### Buckets / Folders

- `original-uploads/`
- `completed-files/`
- `public-assets/` (optional)

### Storage Rules

- original and completed files must be private
- public assets only for website media if needed
- users must only access their own order files
- admins can access all order files

---

## 17. Security Requirements

1. Protect admin routes by role-based auth.
2. Never expose service role keys to the browser.
3. Keep payment verification on the server.
4. Validate file size and file type.
5. Use signed/private access for completed files.
6. Implement anti-spam/rate limiting for login and forms.
7. Ensure secrets are stored in environment variables only.
8. Log important admin actions.

---

## 18. Analytics and Tracking (Optional but Recommended)

Track:

- sign-up conversions
- document submission starts
- completed payments
- service type demand
- turnaround option demand
- drop-off before payment

This can be added with privacy-conscious analytics later.

---

## 19. Acceptance Criteria

The system will be considered ready for launch when:

- users can register and log in successfully
- users can upload supported documents
- word count calculates correctly for supported files
- price updates correctly based on rules
- PayPal payment completes and verifies successfully
- paid orders appear in dashboard as In Progress
- admin can update order status and upload completed file
- users receive required emails
- users can download completed files securely
- admin dashboard is protected
- production deployment works on custom domain

---

## 20. Future Enhancements

- PDF support with better text extraction pipeline
- promo codes / discount system
- live chat or threaded messaging
- multiple admin/editor roles
- CMS for website content editing
- customer reviews/testimonials dashboard
- invoice generation
- refunds workflow
- multilingual website support
- analytics dashboard

---

## 21. Build Notes / Delivery Recommendation

### Recommended Delivery Phases

#### Phase 1: Foundation

- Brand UI design
- Database setup
- Auth setup
- Public pages

#### Phase 2: Core Submission Flow

- Upload form
- Word count logic
- Pricing engine
- PayPal integration

#### Phase 3: Operations

- User dashboard
- Admin dashboard
- Email notifications
- Completed file delivery

#### Phase 4: Hardening and Launch

- QA testing
- security review
- SEO basics
- launch deployment

---

## 22. Summary

Edit & Proofread Desk is a premium editorial services platform built to streamline client intake, document management, payments, and delivery. The product combines a strong public-facing website with a secure backend workflow that improves professionalism, reduces manual coordination, and gives clients a better overall experience.

The recommended stack for version 1 is:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- PayPal
- Resend
- Vercel
- GitHub
- Namecheap

This PRD provides the product and technical foundation required to begin design and implementation.
