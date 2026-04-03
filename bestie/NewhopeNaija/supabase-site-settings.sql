-- SQL to create site_settings table for dynamic ad banner
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to READ
CREATE POLICY "Allow public read-only access to site_settings"
ON public.site_settings FOR SELECT
USING (true);

-- Allow admins to ALL
CREATE POLICY "Allow admins all access to site_settings"
ON public.site_settings FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
