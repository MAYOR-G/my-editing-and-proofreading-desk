# My Editing and Proofreading Desk

Website: [editandproofread.com](https://www.editandproofread.com)

## Configuration Hooks

The following environment variables / configuration hooks are supported for external profile and review links:

- `NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL`: URL to Google Business Profile. When set, renders "Find us on Google" link on `/contact` and is added to Organization `sameAs` structured data.
- `NEXT_PUBLIC_GOOGLE_REVIEW_URL`: URL to leave a Google review. When set, renders "Review us on Google" link on `/contact` and is added to Organization `sameAs` structured data.
- `NEXT_PUBLIC_TRUSTPILOT_URL`: URL to Trustpilot profile. When set, is included in Organization `sameAs` structured data.
- `NEXT_PUBLIC_LINKEDIN_URL`: URL to LinkedIn company page. When set, is included in Organization `sameAs` structured data.

When these values are empty, nothing is rendered and no map embed is inserted.
