-- ============================================================
-- NEWHOPE NAIJA FC – Supabase Schema v2
-- Run this AFTER supabase-schema.sql (or in the same editor)
-- ============================================================

-- ============================================================
-- 1. Extend the Profiles Table with Player Details
-- ============================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS position TEXT,
  ADD COLUMN IF NOT EXISTS shirt_number INTEGER,
  ADD COLUMN IF NOT EXISTS nationality TEXT,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS photo_url TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;


-- ============================================================
-- 2. Create News Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Everyone can read published news
CREATE POLICY "Anyone can view published news"
  ON public.news FOR SELECT
  USING ( published = TRUE );

-- Admins can do everything on news
CREATE POLICY "Admins can manage all news"
  ON public.news FOR ALL
  USING ( public.get_my_role() = 'admin' );


-- ============================================================
-- 3. Create Fixtures Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.fixtures (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  home_team TEXT NOT NULL DEFAULT 'NewHope Naija FC',
  away_team TEXT NOT NULL,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT,
  competition TEXT,
  home_score INTEGER,
  away_score INTEGER,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'postponed')),
  match_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.fixtures ENABLE ROW LEVEL SECURITY;

-- Everyone can view fixtures
CREATE POLICY "Anyone can view fixtures"
  ON public.fixtures FOR SELECT
  USING ( TRUE );

-- Admins can manage fixtures
CREATE POLICY "Admins can manage fixtures"
  ON public.fixtures FOR ALL
  USING ( public.get_my_role() = 'admin' );


-- ============================================================
-- 4. Fix Player Stats RLS to use get_my_role() (no recursion)
-- ============================================================
DROP POLICY IF EXISTS "Admins can do everything on player_stats" ON public.player_stats;

CREATE POLICY "Admins can do everything on player_stats"
  ON public.player_stats FOR ALL
  USING ( public.get_my_role() = 'admin' );


-- ============================================================
-- NOTE: Make sure you have already run the get_my_role()
-- function from the RLS fix SQL before running this file!
-- ============================================================
