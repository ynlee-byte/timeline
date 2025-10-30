-- Migrate applause table from challenger_id (INTEGER) to judgment_id (UUID)
-- 기존 데이터를 유지하면서 마이그레이션

-- 1. 임시 테이블 생성 (기존 데이터 백업)
CREATE TABLE applause_backup AS SELECT * FROM applause;

-- 2. 기존 테이블 삭제
DROP TABLE IF EXISTS applause CASCADE;

-- 3. 새 구조로 applause 테이블 생성
CREATE TABLE applause (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID NOT NULL,
  judgment_id UUID REFERENCES judgments(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, judgment_id)
);

-- 4. 기존 데이터 복원 시도
-- challenger_id를 judgment_id로 변환
-- 주의: challenger_id가 정수였으므로, judgments 테이블의 실제 UUID와 매핑이 필요합니다.
-- 만약 challenger_id가 judgments.id와 일치하지 않는다면 이 단계는 실패할 수 있습니다.
-- 그런 경우, 기존 데이터는 applause_backup 테이블에 보관됩니다.

-- 데이터 복원 (가능한 경우만)
INSERT INTO applause (id, from_user_id, to_user_id, judgment_id, created_at)
SELECT
  ab.id,
  ab.from_user_id,
  ab.to_user_id,
  j.id as judgment_id,
  ab.created_at
FROM applause_backup ab
INNER JOIN judgments j ON j.id::text = ab.challenger_id::text
ON CONFLICT (from_user_id, judgment_id) DO NOTHING;

-- 5. RLS 활성화
ALTER TABLE applause ENABLE ROW LEVEL SECURITY;

-- 6. RLS 정책 생성
CREATE POLICY "Anyone can view applause"
  ON applause FOR SELECT
  USING (true);

CREATE POLICY "Users can send their own applause"
  ON applause FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can delete their own applause"
  ON applause FOR DELETE
  USING (auth.uid() = from_user_id);

-- 7. 인덱스 생성
CREATE INDEX idx_applause_judgment_id ON applause(judgment_id);
CREATE INDEX idx_applause_from_user_id ON applause(from_user_id);
CREATE INDEX idx_applause_to_user_id ON applause(to_user_id);

-- 8. 백업 테이블 삭제 (선택사항 - 필요시 주석 해제)
-- DROP TABLE applause_backup;

-- 마이그레이션 완료 확인
SELECT COUNT(*) as "Original Count" FROM applause_backup;
SELECT COUNT(*) as "Migrated Count" FROM applause;
