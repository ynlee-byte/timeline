-- calendar_expectations 테이블 생성
CREATE TABLE IF NOT EXISTS public.calendar_expectations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id INTEGER NOT NULL,
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_calendar_expectations_user_id
  ON public.calendar_expectations(user_id);

CREATE INDEX IF NOT EXISTS idx_calendar_expectations_week_start
  ON public.calendar_expectations(week_start);

CREATE INDEX IF NOT EXISTS idx_calendar_expectations_event_id
  ON public.calendar_expectations(event_id);

CREATE INDEX IF NOT EXISTS idx_calendar_expectations_created_at
  ON public.calendar_expectations(created_at);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.calendar_expectations ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 사용자는 자신의 기대 표현만 볼 수 있음
CREATE POLICY "Users can view their own expectations"
  ON public.calendar_expectations
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS 정책: 사용자는 자신의 기대 표현을 생성할 수 있음
CREATE POLICY "Users can insert their own expectations"
  ON public.calendar_expectations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS 정책: 사용자는 자신의 기대 표현을 삭제할 수 있음
CREATE POLICY "Users can delete their own expectations"
  ON public.calendar_expectations
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS 정책: 모든 사용자가 event_id별 카운트를 볼 수 있음 (통계용)
CREATE POLICY "Anyone can view expectation counts"
  ON public.calendar_expectations
  FOR SELECT
  USING (true);

-- 확인
SELECT * FROM public.calendar_expectations LIMIT 5;
