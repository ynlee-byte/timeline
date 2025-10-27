-- Applause 테이블과 정책 초기화 및 재생성 스크립트
-- 주의: 기존 데이터가 삭제됩니다!

-- 1. 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Everyone can view applause" ON applause;
DROP POLICY IF EXISTS "Users can create their own applause" ON applause;
DROP POLICY IF EXISTS "Users can delete their own applause" ON applause;

-- 2. 기존 테이블 삭제 (있다면)
DROP TABLE IF EXISTS applause;

-- 3. Applause 테이블 생성
CREATE TABLE applause (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
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