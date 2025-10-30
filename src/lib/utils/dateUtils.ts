/**
 * 날짜 관련 유틸리티 함수
 */

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const MOCK_DAY_KEY = 'mock_day_of_week';

// 디버깅용 로그
if (typeof window !== 'undefined') {
  console.log('[dateUtils] DEV_MODE:', DEV_MODE);
  console.log('[dateUtils] NEXT_PUBLIC_DEV_MODE:', process.env.NEXT_PUBLIC_DEV_MODE);
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=일요일, 1=월요일, ..., 6=토요일

/**
 * 현재 요일 가져오기 (모의 요일 사용 가능)
 */
export function getCurrentDayOfWeek(): DayOfWeek {
  // 항상 localStorage를 확인하도록 수정
  if (typeof window !== 'undefined') {
    const mockDay = localStorage.getItem(MOCK_DAY_KEY);
    if (mockDay !== null) {
      console.log('[dateUtils] Using mock day:', mockDay);
      return parseInt(mockDay) as DayOfWeek;
    }
  }

  const realDay = new Date().getDay() as DayOfWeek;
  console.log('[dateUtils] Using real day:', realDay);
  return realDay;
}

/**
 * 모의 요일 설정
 */
export function setMockDayOfWeek(day: DayOfWeek): void {
  if (typeof window !== 'undefined') {
    console.log('[dateUtils] Setting mock day to:', day);
    localStorage.setItem(MOCK_DAY_KEY, day.toString());
  }
}

/**
 * 모의 요일 제거 (실제 요일로 복귀)
 */
export function clearMockDayOfWeek(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(MOCK_DAY_KEY);
  }
}

/**
 * 현재 모의 요일 가져오기
 */
export function getMockDayOfWeek(): DayOfWeek | null {
  if (DEV_MODE && typeof window !== 'undefined') {
    const mockDay = localStorage.getItem(MOCK_DAY_KEY);
    return mockDay !== null ? (parseInt(mockDay) as DayOfWeek) : null;
  }
  return null;
}

/**
 * 요일 이름 가져오기
 */
export function getDayName(day: DayOfWeek): string {
  const names = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return names[day];
}

/**
 * 리뷰 카드 작성 가능 여부 확인 (월, 화, 수)
 */
export function canWriteReview(): boolean {
  const day = getCurrentDayOfWeek();
  // 1=월요일, 2=화요일, 3=수요일
  return day >= 1 && day <= 3;
}

/**
 * 목표 카드 작성 가능 여부 확인 (목, 금, 토, 일)
 */
export function canWriteGoal(): boolean {
  const day = getCurrentDayOfWeek();
  // 0=일요일, 4=목요일, 5=금요일, 6=토요일
  return day === 0 || (day >= 4 && day <= 6);
}

/**
 * 판정 카드 작성 가능 여부 확인 (일)
 */
export function canWriteJudgment(): boolean {
  const day = getCurrentDayOfWeek();
  // 0=일요일
  return day === 0;
}

/**
 * 개발 모드 여부 확인
 */
export function isDevMode(): boolean {
  return DEV_MODE;
}

/**
 * Get the start of the current week (Sunday)
 */
export function getStartOfWeek(date: Date = new Date()): Date {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

/**
 * Get the end of the current week (Saturday)
 */
export function getEndOfWeek(date: Date = new Date()): Date {
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

/**
 * Format a date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get the Monday of the current week
 */
export function getCurrentWeekMonday(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 아니면 1-dayOfWeek
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Get the Sunday of the current week (6 days after Monday)
 */
export function getCurrentWeekSunday(): Date {
  const monday = getCurrentWeekMonday();
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
}

/**
 * Format date to "YYYY.MM.DD (요일)" format
 */
export function formatDateWithDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = date.getDay();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${year}.${month}.${day} (${dayNames[dayOfWeek]})`;
}