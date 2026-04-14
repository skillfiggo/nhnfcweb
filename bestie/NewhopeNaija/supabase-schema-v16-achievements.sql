-- ==============================================================
-- Schema Update v16: Player Achievements
-- ==============================================================

-- 1. Create player_achievements table
CREATE TABLE IF NOT EXISTS public.player_achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  image_url text NOT NULL,
  awarded_date date DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add Row Level Security (RLS)
ALTER TABLE public.player_achievements ENABLE ROW LEVEL SECURITY;

-- 3. Policies for player_achievements
-- Anyone can read achievements
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.player_achievements FOR SELECT
  USING (true);

-- Only admins can insert/update/delete achievements
CREATE POLICY "Super Admins can insert achievements"
  ON public.player_achievements FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Super Admins can update achievements"
  ON public.player_achievements FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Super Admins can delete achievements"
  ON public.player_achievements FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

-- ==============================================================
-- STORAGE BUCKET setup
-- ==============================================================
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('achievements', 'achievements', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Drop existing policies if running multiple times securely
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;

-- Storage Policies for 'achievements' bucket
CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'achievements');

CREATE POLICY "Admin Upload Access"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'achievements' 
        AND auth.role() = 'authenticated'
        AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
    );

CREATE POLICY "Admin Update Access"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'achievements'
        AND auth.role() = 'authenticated'
        AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
    );

CREATE POLICY "Admin Delete Access"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'achievements'
        AND auth.role() = 'authenticated'
        AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
    );
