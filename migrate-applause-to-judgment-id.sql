-- Migrate applause table from challenger_id (INTEGER) to judgment_id (UUID)

-- 1. Drop existing table (since we're in development)
DROP TABLE IF EXISTS applause CASCADE;

-- 2. Create new applause table with judgment_id as UUID
CREATE TABLE applause (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID NOT NULL,
  judgment_id UUID REFERENCES judgments(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, judgment_id) -- 한 사람이 같은 판정에 중복 박수 방지
);

-- 3. Enable RLS
ALTER TABLE applause ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies

-- Policy: 모든 사용자는 박수 내역을 볼 수 있음
CREATE POLICY "Anyone can view applause"
  ON applause FOR SELECT
  USING (true);

-- Policy: 사용자는 자신의 박수만 생성 가능
CREATE POLICY "Users can send their own applause"
  ON applause FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

-- Policy: 사용자는 자신의 박수만 삭제 가능 (취소 기능)
CREATE POLICY "Users can delete their own applause"
  ON applause FOR DELETE
  USING (auth.uid() = from_user_id);

-- 5. Create index for better query performance
CREATE INDEX idx_applause_judgment_id ON applause(judgment_id);
CREATE INDEX idx_applause_from_user_id ON applause(from_user_id);
CREATE INDEX idx_applause_to_user_id ON applause(to_user_id);
