-- ============================================================
-- SQL to add new requested columns to profiles table
-- ============================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS nin_number TEXT,
  ADD COLUMN IF NOT EXISTS height_cm NUMERIC,
  ADD COLUMN IF NOT EXISTS weight_kg NUMERIC,
  ADD COLUMN IF NOT EXISTS current_license_no TEXT,
  ADD COLUMN IF NOT EXISTS previous_license_no TEXT,
  ADD COLUMN IF NOT EXISTS previous_club TEXT,
  ADD COLUMN IF NOT EXISTS passport_photo_url TEXT;

-- IMPORTANT: You will also need to create a storage bucket in Supabase named: 'players'
-- Ensure the bucket is set to "Public" so uploaded photos can be displayed!
