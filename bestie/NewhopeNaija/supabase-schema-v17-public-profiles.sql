-- ==============================================================
-- Schema Update v17: Public Player Profiles Access
-- ==============================================================

-- Allow public read access to player profiles so they can be displayed on the frontend / players page
CREATE POLICY "Public can view player profiles"
ON public.profiles
FOR SELECT
USING ( role = 'player' );
