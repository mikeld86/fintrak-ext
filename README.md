# FINTRAK Netlify Deployment

## Setup Instructions

### 1. Supabase Database
1. Create project at supabase.com
2. Copy Project URL and anon key from Settings → API  
3. Run `supabase-setup.sql` in SQL Editor

### 2. Netlify Deploy
1. Drag entire folder to Netlify dashboard
2. Build settings auto-configure from netlify.toml
3. Set environment variables:
   - `SUPABASE_URL` = Your Project URL
   - `SUPABASE_ANON_KEY` = Your anon key

### 3. Login
- Username: `admin`
- Password: `fintrak2025`

## Features
- Australian cash calculator
- Multi-week financial planning
- Inventory & sales tracking with break-even analysis
- PWA with offline functionality
- Supabase database persistence