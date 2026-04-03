-- ==============================================================================
-- Migration V4: Salary History
-- ==============================================================================

-- 1. Create the salary_history table
CREATE TABLE IF NOT EXISTS public.salary_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  month_year TEXT NOT NULL, -- e.g. "2026-03"
  base_salary NUMERIC DEFAULT 0,
  bonus NUMERIC DEFAULT 0,
  deduction NUMERIC DEFAULT 0,
  net_pay NUMERIC GENERATED ALWAYS AS (base_salary + bonus - deduction) STORED,
  payment_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending', -- 'pending', 'paid'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.salary_history ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for admin and players

-- Admins can do everything
CREATE POLICY "Admins can manage all salary records" ON public.salary_history
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Players can only view their own salary records
CREATE POLICY "Players can view their own salary records" ON public.salary_history
  FOR SELECT
  USING (
    auth.uid() = player_id
  );
