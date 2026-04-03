-- ============================================================
-- NEWHOPE NAIJA FC – Supabase Schema v6 (Fixture Logos)
-- Run this in the Supabase SQL Editor
-- ============================================================

ALTER TABLE public.fixtures
  ADD COLUMN IF NOT EXISTS home_logo TEXT,
  ADD COLUMN IF NOT EXISTS away_logo TEXT;
