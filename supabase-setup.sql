-- Supabase 테이블 생성 스크립트
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- Reviews 테이블 생성
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 모든 리뷰를 볼 수 있음 (인정/응원을 위해)
CREATE POLICY "Everyone can view all reviews"
  ON reviews FOR SELECT
  USING (true);

-- 정책: 사용자는 자신의 리뷰만 생성 가능
CREATE POLICY "Users can create their own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 정책: 사용자는 자신의 리뷰만 수정 가능
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- 정책: 사용자는 자신의 리뷰만 삭제 가능
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Goals 테이블 생성 (나중을 위해)
CREATE TABLE IF NOT EXISTS goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  goal_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals 테이블 RLS 활성화
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Goals 테이블 정책들
CREATE POLICY "Everyone can view all goals"
  ON goals FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own goals"
  ON goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON goals FOR DELETE
  USING (auth.uid() = user_id);

-- Judgments 테이블 생성 (나중을 위해)
CREATE TABLE IF NOT EXISTS judgments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
  achieved BOOLEAN NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Judgments 테이블 RLS 활성화
ALTER TABLE judgments ENABLE ROW LEVEL SECURITY;

-- Judgments 테이블 정책들
-- 정책: 모든 사용자는 모든 판정을 볼 수 있음 (Next Challenger, Winner List용)
CREATE POLICY "Judgments are viewable by everyone"
  ON judgments FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own judgments"
  ON judgments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Calendar Confirmations 테이블 생성
CREATE TABLE IF NOT EXISTS calendar_confirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  confirmed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  week_start DATE NOT NULL, -- 해당 주의 시작일 (월요일)
  UNIQUE(user_id, week_start) -- 한 주에 한 번만 확인 가능
);

-- Calendar Confirmations 테이블 RLS 활성화
ALTER TABLE calendar_confirmations ENABLE ROW LEVEL SECURITY;

-- Calendar Confirmations 테이블 정책들
CREATE POLICY "Users can view their own calendar confirmations"
  ON calendar_confirmations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own calendar confirmations"
  ON calendar_confirmations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar confirmations"
  ON calendar_confirmations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar confirmations"
  ON calendar_confirmations FOR DELETE
  USING (auth.uid() = user_id);

-- Profiles 테이블 생성
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles 테이블 RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 다른 사용자의 프로필을 볼 수 있음
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 정책: 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 정책: 사용자는 자신의 프로필만 삽입 가능
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 트리거: 회원가입 시 자동으로 프로필 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 기존 유저들의 프로필 생성 (이미 가입한 유저들)
INSERT INTO public.profiles (id, full_name)
SELECT
  id,
  raw_user_meta_data->>'full_name' as full_name
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- 트리거: profiles 테이블의 full_name이 변경되면 auth.users의 raw_user_meta_data도 업데이트
CREATE OR REPLACE FUNCTION public.sync_profile_to_auth()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data =
    COALESCE(raw_user_meta_data, '{}'::jsonb) ||
    jsonb_build_object('full_name', NEW.full_name)
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_updated
  AFTER UPDATE OF full_name ON public.profiles
  FOR EACH ROW
  WHEN (OLD.full_name IS DISTINCT FROM NEW.full_name)
  EXECUTE FUNCTION public.sync_profile_to_auth();

CREATE TRIGGER on_profile_inserted
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_to_auth();

-- Recognitions for Reviews 테이블 생성
CREATE TABLE IF NOT EXISTS recognitions_review (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, review_id) -- 한 사람이 같은 리뷰에 중복 인정 방지
);

-- Recognitions for Reviews RLS 활성화
ALTER TABLE recognitions_review ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 인정 내역을 볼 수 있음
CREATE POLICY "Everyone can view recognitions on reviews"
  ON recognitions_review FOR SELECT
  USING (true);

-- 정책: 사용자는 자신의 인정만 생성 가능
CREATE POLICY "Users can create their own recognitions on reviews"
  ON recognitions_review FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

-- 정책: 사용자는 자신의 인정만 삭제 가능 (취소 기능)
CREATE POLICY "Users can delete their own recognitions on reviews"
  ON recognitions_review FOR DELETE
  USING (auth.uid() = from_user_id);

-- Recognitions for Goals 테이블 생성
CREATE TABLE IF NOT EXISTS recognitions_goal (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, goal_id) -- 한 사람이 같은 목표에 중복 응원 방지
);

-- Recognitions for Goals RLS 활성화
ALTER TABLE recognitions_goal ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 응원 내역을 볼 수 있음
CREATE POLICY "Everyone can view recognitions on goals"
  ON recognitions_goal FOR SELECT
  USING (true);

-- 정책: 사용자는 자신의 응원만 생성 가능
CREATE POLICY "Users can create their own recognitions on goals"
  ON recognitions_goal FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

-- 정책: 사용자는 자신의 응원만 삭제 가능 (취소 기능)
CREATE POLICY "Users can delete their own recognitions on goals"
  ON recognitions_goal FOR DELETE
  USING (auth.uid() = from_user_id);

-- Applause 테이블 생성 (Next Challenger에게 보내는 박수)
CREATE TABLE IF NOT EXISTS applause (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID NOT NULL,  -- auth.users 참조 제거 (더미 데이터이므로)
  challenger_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, challenger_id) -- 한 사람이 같은 challenger에 중복 박수 방지
);

-- Applause RLS 활성화
ALTER TABLE applause ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 박수 내역을 볼 수 있음
CREATE POLICY "Everyone can view applause"
  ON applause FOR SELECT
  USING (true);

-- 정책: 사용자는 자신의 박수만 생성 가능
CREATE POLICY "Users can create their own applause"
  ON applause FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

-- 정책: 사용자는 자신의 박수만 삭제 가능 (취소 기능)
CREATE POLICY "Users can delete their own applause"
  ON applause FOR DELETE
  USING (auth.uid() = from_user_id);

-- Recognitions for Judgments 테이블 생성 (Winner List의 성공한 판정 카드에 보내는 귀감)
CREATE TABLE IF NOT EXISTS recognitions_judgment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  judgment_id UUID REFERENCES judgments(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, judgment_id) -- 한 사람이 같은 판정에 중복 귀감 방지
);

-- Recognitions for Judgments RLS 활성화
ALTER TABLE recognitions_judgment ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 귀감 내역을 볼 수 있음
CREATE POLICY "Everyone can view recognitions on judgments"
  ON recognitions_judgment FOR SELECT
  USING (true);

-- 정책: 사용자는 자신의 귀감만 생성 가능
CREATE POLICY "Users can create their own recognitions on judgments"
  ON recognitions_judgment FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

-- 정책: 사용자는 자신의 귀감만 삭제 가능 (취소 기능)
CREATE POLICY "Users can delete their own recognitions on judgments"
  ON recognitions_judgment FOR DELETE
  USING (auth.uid() = from_user_id);