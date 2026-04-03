-- ==============================================================================
-- Migration V7: League Standings
-- ==============================================================================

-- 1. Create league_standings table
CREATE TABLE IF NOT EXISTS public.league_standings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_name TEXT NOT NULL,
  club_badge TEXT, -- Can be an emoji or image URL
  played INTEGER DEFAULT 0,
  won INTEGER DEFAULT 0,
  drawn INTEGER DEFAULT 0,
  lost INTEGER DEFAULT 0,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  form TEXT[] DEFAULT '{}', -- Array of 'W', 'D', 'L'
  is_highlighted BOOLEAN DEFAULT FALSE, -- To highlight NewHope Naija FC
  sort_order INTEGER DEFAULT 0, -- Manual override for sorting if needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.league_standings ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Public: Read access to everyone
CREATE POLICY "Anyone can view league standings" ON public.league_standings
  FOR SELECT USING (TRUE);

-- Admins: Full access
CREATE POLICY "Admins can manage league standings" ON public.league_standings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 4. Initial Data (Optional, based on the static data in the app)
-- You can run these manually in the SQL editor if you want to seed the table.
/*
INSERT INTO public.league_standings (club_name, club_badge, played, won, drawn, lost, goals_for, goals_against, points, form, is_highlighted)
VALUES 
('NewHope Naija FC', '🔴', 14, 10, 2, 2, 28, 10, 32, ARRAY['W','W','D','W','W'], TRUE),
('Lagos Stars', '⚡', 14, 9, 2, 3, 24, 10, 29, ARRAY['W','L','W','W','D'], FALSE),
('Sunrise FC', '🌟', 14, 8, 3, 3, 22, 12, 27, ARRAY['D','W','L','W','W'], FALSE),
('Future Eagles FC', '🦅', 14, 7, 4, 3, 20, 12, 25, ARRAY['W','D','D','L','W'], FALSE),
('Victoria Island FC', '🏙️', 14, 5, 3, 6, 16, 20, 18, ARRAY['L','L','W','D','L'], FALSE),
('Abuja United FC', '🏛️', 14, 4, 2, 8, 10, 22, 14, ARRAY['L','W','L','L','D'], FALSE);
*/
