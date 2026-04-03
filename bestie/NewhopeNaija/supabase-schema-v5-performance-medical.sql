-- ==============================================================================
-- Migration V5: Performance and Medical Logs
-- ==============================================================================

-- 1. Create performance_logs table
CREATE TABLE IF NOT EXISTS public.performance_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  match_date DATE NOT NULL,
  opponent TEXT,
  minutes_played INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  rating NUMERIC(3,1), -- e.g. 8.5
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create medical_logs table
CREATE TABLE IF NOT EXISTS public.medical_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  log_date DATE NOT NULL,
  type TEXT NOT NULL, -- 'injury', 'recovery', 'checkup'
  status TEXT NOT NULL, -- 'fit', 'injured', 'recovering'
  description TEXT,
  expected_return DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE public.performance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_logs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Admins: Full access to both
CREATE POLICY "Admins can manage performance logs" ON public.performance_logs
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Admins can manage medical logs" ON public.medical_logs
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Players: Read access to their own logs
CREATE POLICY "Players can view own performance logs" ON public.performance_logs
  FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Players can view own medical logs" ON public.medical_logs
  FOR SELECT USING (auth.uid() = player_id);
