-- Supabase Schema Version 13 - News Storage
-- Creates the 'news-images' storage bucket for news articles.

-- 1. Create the news-images storage bucket
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
    'news-images',
    'news-images',
    true,
    false,
    10485760, -- 10MB limit
    '{image/jpeg, image/png, image/webp, image/gif, image/avif, image/svg+xml, application/octet-stream}'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Public read access
CREATE POLICY "Public can view news images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'news-images');

-- 3. Authenticated admins can upload news images
CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'news-images');

-- 4. Authenticated admins can update news images
CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'news-images');

-- 5. Authenticated admins can delete news images
CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'news-images');
