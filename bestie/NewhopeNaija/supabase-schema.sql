-- ==============================================
-- 1. Create Profiles Table (Links to auth.users)
-- ==============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'player')),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Admins can read/update all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' );

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' );

-- Players can read/update their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );


-- ==============================================
-- 2. Create Player Stats Table
-- ==============================================
CREATE TABLE public.player_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Salary Info
  salary_amount DECIMAL,
  last_payment_date DATE,
  payment_status TEXT CHECK (payment_status IN ('paid', 'pending', 'overdue')),
  
  -- Performance
  matches_played INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  pass_accuracy DECIMAL DEFAULT 0.0,
  
  -- Medical / Health
  health_status TEXT CHECK (health_status IN ('fit', 'injured', 'recovering', 'suspended')),
  last_medical DATE,
  medical_notes TEXT,
  
  -- Achievements
  achievements JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;

-- Admins can manage all player stats
CREATE POLICY "Admins can do everything on player_stats"
  ON public.player_stats FOR ALL
  USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' );

-- Players can only read their own stats
CREATE POLICY "Players can view their own stats"
  ON public.player_stats FOR SELECT
  USING ( auth.uid() = player_id );


-- ==============================================
-- 3. Trigger to Create Profile on Signup
-- ==============================================
-- Automatically add a row to 'profiles' when a user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'player') -- Default to player
  );
  
  -- Also initialize an empty player_stats row if role is player
  IF COALESCE(new.raw_user_meta_data->>'role', 'player') = 'player' THEN
    INSERT INTO public.player_stats (player_id) VALUES (new.id);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
