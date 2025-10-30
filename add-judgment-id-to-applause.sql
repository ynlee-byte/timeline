-- applause 테이블에 judgment_id 컬럼 추가 (기존 데이터 유지)

-- 1. judgment_id 컬럼 추가 (nullable로 먼저 추가)
ALTER TABLE applause
ADD COLUMN IF NOT EXISTS judgment_id UUID REFERENCES judgments(id) ON DELETE CASCADE;

-- 2. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_applause_judgment_id ON applause(judgment_id);

-- 3. UNIQUE 제약조건 추가 (from_user_id, judgment_id)
-- 기존 (from_user_id, challenger_id) 제약조건과 병행
ALTER TABLE applause
DROP CONSTRAINT IF EXISTS applause_from_user_id_judgment_id_key;

ALTER TABLE applause
ADD CONSTRAINT applause_from_user_id_judgment_id_key
UNIQUE (from_user_id, judgment_id);

-- 완료 확인
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'applause'
ORDER BY ordinal_position;
