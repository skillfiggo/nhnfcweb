-- Create gallery_photos table
CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    caption TEXT,
    category TEXT DEFAULT 'Match Day', -- categories: Match Day, Training, Events
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Allow public to select
CREATE POLICY "Public can view gallery photos"
ON public.gallery_photos
FOR SELECT
USING (true);

-- Allow authenticated admins to insert/update/delete
CREATE POLICY "Admins can manage gallery photos"
ON public.gallery_photos
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
