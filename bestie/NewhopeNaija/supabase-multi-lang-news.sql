-- SQL to add Chinese language support to news table
ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS title_zh TEXT,
  ADD COLUMN IF NOT EXISTS body_zh TEXT;
