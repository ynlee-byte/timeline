-- 임시 기대 표현 데이터 삽입
-- 사용하기 전에 YOUR_USER_ID를 실제 사용자 ID로 변경하세요

-- 현재 로그인한 사용자 ID 확인하기
-- SELECT auth.uid();

-- 이번 주 월요일 날짜 계산
WITH week_info AS (
  SELECT
    CURRENT_DATE - ((EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6) % 7) AS week_start,
    CURRENT_DATE - INTERVAL '1 day' AS yesterday
)
-- 임시 기대 표현 데이터 삽입 (event_id 7, 8, 9에 각각 2, 3, 1개)
INSERT INTO calendar_expectations (user_id, event_id, week_start, created_at)
SELECT
  auth.uid() AS user_id,
  event_id,
  week_info.week_start::DATE,
  week_info.yesterday + INTERVAL '12 hours'
FROM week_info,
LATERAL (
  VALUES
    (7),
    (7),
    (8),
    (8),
    (8),
    (9)
) AS events(event_id);

-- 삽입된 데이터 확인
SELECT * FROM calendar_expectations
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;
