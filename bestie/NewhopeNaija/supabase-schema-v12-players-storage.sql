-- Supabase Schema Version 12 - Players Storage
-- Creates the 'players' storage bucket for player profile and passport photos.

-- 1. Create the players storage bucket
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
    'players',
    'players',
    true,
    false,
    5242880, -- 5MB limit
    '{image/jpeg, image/png, image/webp}'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Public read access (so player photos show on the website)
CREATE POLICY "Public can view player photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'players');

-- 3. Authenticated admins can upload player photos
CREATE POLICY "Admins can upload player photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'players');

-- 4. Authenticated admins can update player photos
CREATE POLICY "Admins can update player photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'players');

-- 5. Authenticated admins can delete player photos
CREATE POLICY "Admins can delete player photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'players');
