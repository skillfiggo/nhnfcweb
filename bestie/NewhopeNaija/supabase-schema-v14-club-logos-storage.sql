-- Supabase Schema Version 14 - Club Logos Storage
-- Creates the 'club-logos' storage bucket for reusable team logos.

-- 1. Create the club-logos storage bucket
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
    'club-logos',
    'club-logos',
    true,
    false,
    1048576, -- 1MB limit
    '{image/jpeg, image/png, image/webp, image/gif, image/avif, image/svg+xml, application/octet-stream}'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Public read access
CREATE POLICY "Public can view club logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'club-logos');

-- 3. Authenticated admins can upload club logos
CREATE POLICY "Admins can upload club logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'club-logos');

-- 4. Authenticated admins can update club logos
CREATE POLICY "Admins can update club logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'club-logos');

-- 5. Authenticated admins can delete club logos
CREATE POLICY "Admins can delete club logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'club-logos');
