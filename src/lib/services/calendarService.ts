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