import { createClient } from '../supabase/client';

export interface Judgment {
  id: string;
  user_id: string;
  goal_id?: string;
  achieved: boolean;
  comment: string;
  created_at: string;
}

export interface CreateJudgmentData {
  achieved: boolean;
  comment: string;
}

/**
 * 새로운 판정 생성
 */
export async function createJudgment(data: CreateJudgmentData) {
  const supabase = createClient();

  // 현재 로그인한 사용자 확인
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 가장 최근 goal 가져오기 (있다면)
  const { data: latestGoal } = await supabase
    .from('goals')
    .select('id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const { data: judgment, error } = await supabase
    .from('judgments')
    .insert([
      {
        user_id: user.id,
        goal_id: latestGoal?.id || null, // 최근 목표가 있으면 연결, 없으면 null
        achieved: data.achieved,
        comment: data.comment,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating judgment:', error);
    throw error;
  }

  return judgment;
}

/**
 * 사용자의 모든 판정 조회
 */
export async function getUserJudgments() {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: judgments, error } = await supabase
    .from('judgments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching judgments:', error);
    throw error;
  }

  return judgments as Judgment[];
}

/**
 * 이번 주에 판정을 작성했는지 확인
 */
export async function hasWrittenJudgmentThisWeek(): Promise<boolean> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return false;
  }

  // 이번 주 월요일 00:00:00 계산
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 그 외는 월요일까지의 차이
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  const { data: judgments, error } = await supabase
    .from('judgments')
    .select('id')
    .eq('user_id', user.id)
    .gte('created_at', monday.toISOString())
    .limit(1);

  if (error) {
    console.error('Error checking judgment:', error);
    return false;
  }

  return judgments && judgments.length > 0;
}

/**
 * 최신 판정 가져오기
 */
export async function getLatestJudgment(): Promise<Judgment | null> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: judgments, error } = await supabase
    .from('judgments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching latest judgment:', error);
    return null;
  }

  return judgments && judgments.length > 0 ? (judgments[0] as Judgment) : null;
}

/**
 * 특정 판정 조회
 */
export async function getJudgment(judgmentId: string) {
  const supabase = createClient();

  const { data: judgment, error } = await supabase
    .from('judgments')
    .select('*')
    .eq('id', judgmentId)
    .single();

  if (error) {
    console.error('Error fetching judgment:', error);
    throw error;
  }

  return judgment as Judgment;
}

/**
 * 판정 수정
 */
export async function updateJudgment(judgmentId: string, data: Partial<CreateJudgmentData>) {
  const supabase = createClient();

  const { data: judgment, error } = await supabase
    .from('judgments')
    .update(data)
    .eq('id', judgmentId)
    .select()
    .single();

  if (error) {
    console.error('Error updating judgment:', error);
    throw error;
  }

  return judgment;
}

/**
 * 판정 삭제
 */
export async function deleteJudgment(judgmentId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('judgments')
    .delete()
    .eq('id', judgmentId);

  if (error) {
    console.error('Error deleting judgment:', error);
    throw error;
  }

  return true;
}