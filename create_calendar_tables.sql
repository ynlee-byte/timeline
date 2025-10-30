-- calendar_confirmations 테이블 생성 (일정 확인 기록)
CREATE TABLE IF NOT EXISTS public.calendar_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  confirmed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  week_start DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- calendar_expectations 테이블 생성 (기대표현 기록)
CREATE TABLE IF NOT EXISTS public.calendar_expectations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id INTEGER NOT NULL,
  week_start DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, event_id, week_start)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_calendar_confirmations_user_week
  ON public.calendar_confirmations(user_id, week_start);

CREATE INDEX IF NOT EXISTS idx_calendar_expectations_user_week
  ON public.calendar_expectations(user_id, week_start);

CREATE INDEX IF NOT EXISTS idx_calendar_expectations_event
  ON public.calendar_expectations(event_id, week_start);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.calendar_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_expectations ENABLE ROW LEVEL SECURITY;

-- calendar_confirmations 정책
DROP POLICY IF EXISTS "Users can view own confirmations" ON public.calendar_confirmations;
CREATE POLICY "Users can view own confirmations"
  ON public.calendar_confirmations
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own confirmations" ON public.calendar_confirmations;
CREATE POLICY "Users can insert own confirmations"
  ON public.calendar_confirmations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own confirmations" ON public.calendar_confirmations;
CREATE POLICY "Users can update own confirmations"
  ON public.calendar_confirmations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- calendar_expectations 정책
DROP POLICY IF EXISTS "Users can view own expectations" ON public.calendar_expectations;
CREATE POLICY "Users can view own expectations"
  ON public.calendar_expectations
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view expectation counts" ON public.calendar_expectations;
CREATE POLICY "Anyone can view expectation counts"
  ON public.calendar_expectations
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert own expectations" ON public.calendar_expectations;
CREATE POLICY "Users can insert own expectations"
  ON public.calendar_expectations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own expectations" ON public.calendar_expectations;
CREATE POLICY "Users can delete own expectations"
  ON public.calendar_expectations
  FOR DELETE
  USING (auth.uid() = user_id);

-- 완료 메시지
SELECT 'Calendar tables created successfully!' as message;
