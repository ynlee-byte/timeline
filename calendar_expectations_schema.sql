-- 캘린더 일정별 기대표현 테이블
CREATE TABLE IF NOT EXISTS public.calendar_expectations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  event_id integer NOT NULL,
  week_start date NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT calendar_expectations_pkey PRIMARY KEY (id),
  CONSTRAINT calendar_expectations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  -- 한 사용자가 같은 주에 같은 일정을 중복으로 선택할 수 없도록
  CONSTRAINT calendar_expectations_unique UNIQUE (user_id, event_id, week_start)
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_calendar_expectations_event_id ON public.calendar_expectations(event_id);
CREATE INDEX IF NOT EXISTS idx_calendar_expectations_week_start ON public.calendar_expectations(week_start);
CREATE INDEX IF NOT EXISTS idx_calendar_expectations_user_id ON public.calendar_expectations(user_id);

-- Row Level Security 활성화
ALTER TABLE public.calendar_expectations ENABLE ROW LEVEL SECURITY;

-- 정책: 사용자는 자신의 기대표현만 생성/조회/삭제 가능
CREATE POLICY "Users can insert their own expectations"
  ON public.calendar_expectations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all expectations"
  ON public.calendar_expectations
  FOR SELECT
  USING (true);

CREATE POLICY "Users can delete their own expectations"
  ON public.calendar_expectations
  FOR DELETE
  USING (auth.uid() = user_id);
