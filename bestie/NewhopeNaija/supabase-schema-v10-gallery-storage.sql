-- Supabase Schema Version 10 - Gallery Storage
-- Adds a storage bucket for direct gallery photo uploads.

-- 1. Create a public bucket for gallery images
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
    'gallery-images',
    'gallery-images',
    true,
    false,
    10485760, -- 10MB limit
    '{image/jpeg, image/png, image/webp, image/gif}'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Public access policy (SELECT)
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery-images');

-- 4. Authenticated admin access policy (INSERT)
CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

-- 5. Authenticated admin access policy (UPDATE)
CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-images');

-- 6. Authenticated admin access policy (DELETE)
CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');
