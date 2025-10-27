-- Applause 테이블의 외래 키 제약 조건 수정
-- to_user_id는 더미 데이터이므로 auth.users 참조 제거

-- 1. 기존 정책 삭제
DROP POLICY IF EXISTS "Everyone can view applause" ON applause;
DROP POLICY IF EXISTS "Users can create their own applause" ON applause;
DROP POLICY IF EXISTS "Users can delete their own applause" ON applause;

-- 2. 기존 테이블 삭제
DROP TABLE IF EXISTS applause;

-- 3. Applause 테이블 재생성 (to_user_id 외래 키 제약 조건 제거)
CREATE TABLE applause (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID NOT NULL,  -- auth.users 참조 제거 (더미 데이터이므로)
  challenger_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, challenger_id) -- 한 사람이 같은 challenger에 중복 박수 방지
);

-- 4. RLS 활성화
ALTER TABLE applause ENABLE ROW LEVEL SECURITY;

-- 5. 정책 생성
CREATE POLICY "Everyone can view applause"
  ON applause FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own applause"
  ON applause FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can delete their own applause"
  ON applause FOR DELETE
  USING (auth.uid() = from_user_id);