-- ─── Admin Audit Logs ─────────────────────────────────────────
-- Run this in Supabase SQL Editor
--
-- This table records every admin action platform-wide.
-- All admin accounts can READ all logs (not just their own).
-- The admin's name is stored directly on each log row (admin_name)
-- so it is always visible even if the account is later deleted.

CREATE TABLE IF NOT EXISTS admin_logs (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_name   TEXT,           -- Stored at write-time: always visible
    action_type  TEXT NOT NULL,  -- e.g. CREATE | UPDATE | DELETE | ROLE CHANGE
    entity       TEXT,           -- e.g. Player | News | Fixture | User
    details      TEXT,           -- Human-readable description of the action
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (safe to re-run)
DROP POLICY IF EXISTS "Admins can read logs"       ON admin_logs;
DROP POLICY IF EXISTS "All admins can view all logs" ON admin_logs;
DROP POLICY IF EXISTS "Admins can insert logs"     ON admin_logs;

-- ALL admins can see ALL logs (including logs by other admins)
CREATE POLICY "All admins can view all logs"
    ON admin_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Any admin can write a log entry (system uses this automatically)
CREATE POLICY "Admins can insert logs"
    ON admin_logs FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS admin_logs_admin_id_idx  ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS admin_logs_created_at_idx ON admin_logs(created_at DESC);
