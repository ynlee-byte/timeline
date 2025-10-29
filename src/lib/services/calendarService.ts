import { createClient } from '../supabase/client';

export interface CalendarConfirmation {
  id: string;
  user_id: string;
  confirmed_at: string;
  week_start: string;
}

/**
 * 이번 주 월요일 날짜 계산
 */
function getThisWeekMonday(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 그 외는 월요일까지의 차이
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * 일정 확인 저장
 */
export async function confirmCalendar() {
  const supabase = createClient();

  // 현재 로그인한 사용자 확인
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 이번 주 월요일 날짜
  const weekStart = getThisWeekMonday();
  const weekStartStr = weekStart.toISOString().split('T')[0];

  // 이미 확인했는지 체크
  const { data: existing } = await supabase
    .from('calendar_confirmations')
    .select('*')
    .eq('user_id', user.id)
    .eq('week_start', weekStartStr)
    .single();

  // 이미 확인했으면 업데이트
  if (existing) {
    const { data: confirmation, error } = await supabase
      .from('calendar_confirmations')
      .update({
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating calendar confirmation:', error);
      throw error;
    }

    return confirmation;
  }

  // 확인하지 않았으면 새로 생성
  const { data: confirmation, error } = await supabase
    .from('calendar_confirmations')
    .insert([
      {
        user_id: user.id,
        week_start: weekStartStr,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating calendar confirmation:', error);
    throw error;
  }

  return confirmation;
}

/**
 * 이번 주에 일정 확인했는지 체크
 */
export async function hasConfirmedCalendarThisWeek(): Promise<boolean> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return false;
  }

  // 이번 주 월요일 날짜
  const weekStart = getThisWeekMonday();
  const weekStartStr = weekStart.toISOString().split('T')[0];

  const { data: confirmations, error } = await supabase
    .from('calendar_confirmations')
    .select('id')
    .eq('user_id', user.id)
    .eq('week_start', weekStartStr)
    .limit(1);

  if (error) {
    console.error('Error checking calendar confirmation:', error);
    return false;
  }

  return confirmations && confirmations.length > 0;
}

/**
 * 사용자의 모든 일정 확인 기록 조회
 */
export async function getUserCalendarConfirmations() {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: confirmations, error } = await supabase
    .from('calendar_confirmations')
    .select('*')
    .eq('user_id', user.id)
    .order('confirmed_at', { ascending: false });

  if (error) {
    console.error('Error fetching calendar confirmations:', error);
    throw error;
  }

  return confirmations as CalendarConfirmation[];
}

// ==================== 기대표현 관련 함수 ====================

export interface CalendarExpectation {
  id: string;
  user_id: string;
  event_id: number;
  week_start: string;
  created_at: string;
}

/**
 * 기대표현 저장 (최대 3개)
 * @param eventIds - 선택한 일정 ID 배열 (최대 3개)
 */
export async function saveCalendarExpectations(eventIds: number[]) {
  const supabase = createClient();

  // 현재 로그인한 사용자 확인
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 최대 3개 검증
  if (eventIds.length > 3) {
    throw new Error('최대 3개의 일정만 선택할 수 있습니다.');
  }

  // 이번 주 월요일 날짜
  const weekStart = getThisWeekMonday();
  const weekStartStr = weekStart.toISOString().split('T')[0];

  // 기존 기대표현 삭제 (이번 주)
  await supabase
    .from('calendar_expectations')
    .delete()
    .eq('user_id', user.id)
    .eq('week_start', weekStartStr);

  // 새로운 기대표현 저장
  const expectations = eventIds.map(eventId => ({
    user_id: user.id,
    event_id: eventId,
    week_start: weekStartStr,
  }));

  const { data, error } = await supabase
    .from('calendar_expectations')
    .insert(expectations)
    .select();

  if (error) {
    console.error('Error saving calendar expectations:', error);
    throw error;
  }

  return data as CalendarExpectation[];
}

/**
 * 각 일정별 기대표현 개수 조회
 * @returns eventId를 key로 하는 개수 맵
 */
export async function getExpectationCounts(): Promise<Record<number, number>> {
  const supabase = createClient();

  // 이번 주 월요일 날짜
  const weekStart = getThisWeekMonday();
  const weekStartStr = weekStart.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('calendar_expectations')
    .select('event_id')
    .eq('week_start', weekStartStr);

  if (error) {
    console.error('Error fetching expectation counts:', error);
    return {};
  }

  // event_id별로 카운트
  const counts: Record<number, number> = {};
  data?.forEach((item: any) => {
    counts[item.event_id] = (counts[item.event_id] || 0) + 1;
  });

  return counts;
}

/**
 * 현재 사용자가 이번 주에 선택한 일정 조회
 */
export async function getUserExpectations(): Promise<number[]> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  // 이번 주 월요일 날짜
  const weekStart = getThisWeekMonday();
  const weekStartStr = weekStart.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('calendar_expectations')
    .select('event_id')
    .eq('user_id', user.id)
    .eq('week_start', weekStartStr);

  if (error) {
    console.error('Error fetching user expectations:', error);
    return [];
  }

  return data?.map((item: any) => item.event_id) || [];
}