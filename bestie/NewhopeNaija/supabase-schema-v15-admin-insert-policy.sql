-- Schema v15: Allow admins to INSERT new profiles
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)

-- Allow admins to insert new profiles (needed when re-inviting a player after deleting stale auth user)
CREATE POLICY "Admins can insert profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles AS admin_profile
    WHERE admin_profile.id = auth.uid()
    AND admin_profile.role = 'admin'
  )
);

-- Also allow the system trigger (service role) to insert profiles automatically on new user creation
-- This is usually already allowed via service role bypass, but added for safety.
-- (No SQL needed — service role bypasses RLS by default)
