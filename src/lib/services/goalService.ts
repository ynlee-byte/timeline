import { createClient } from '../supabase/client';

export interface Goal {
  id: string;
  user_id: string;
  activity: string;
  goal_text: string;
  rating: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGoalData {
  activity: string;
  goal_text: string;
  rating: number;
}

/**
 * 새로운 목표 생성
 */
export async function createGoal(data: CreateGoalData) {
  const supabase = createClient();

  // 현재 로그인한 사용자 확인
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 시작일: 오늘
  const startDate = new Date();
  // 종료일: 7일 후
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  const { data: goal, error } = await supabase
    .from('goals')
    .insert([
      {
        user_id: user.id,
        activity: data.activity,
        goal_text: data.goal_text,
        rating: data.rating,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating goal:', error);
    throw error;
  }

  return goal;
}

/**
 * 사용자의 모든 목표 조회
 */
export async function getUserGoals() {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: goals, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }

  return goals as Goal[];
}

/**
 * 이번 주에 목표를 작성했는지 확인
 */
export async function hasWrittenGoalThisWeek(): Promise<boolean> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return false;
  }

  // 이번 주 목요일 00:00:00 계산
  const now = new Date();
  const dayOfWeek = now.getDay();
  // 목요일 = 4
  // 일요일(0)이면 이전 주 목요일, 월-수(1-3)이면 이전 주 목요일, 목-토(4-6)이면 이번 주 목요일
  let diff = 4 - dayOfWeek; // 목요일까지의 차이
  if (dayOfWeek < 4) {
    diff -= 7; // 이전 주 목요일
  }
  const thursday = new Date(now);
  thursday.setDate(now.getDate() + diff);
  thursday.setHours(0, 0, 0, 0);

  const { data: goals, error } = await supabase
    .from('goals')
    .select('id')
    .eq('user_id', user.id)
    .gte('created_at', thursday.toISOString())
    .limit(1);

  if (error) {
    console.error('Error checking goal:', error);
    return false;
  }

  return goals && goals.length > 0;
}

/**
 * 최신 목표 가져오기
 */
export async function getLatestGoal(): Promise<Goal | null> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: goals, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching latest goal:', error);
    return null;
  }

  return goals && goals.length > 0 ? (goals[0] as Goal) : null;
}

/**
 * 특정 목표 조회
 */
export async function getGoal(goalId: string) {
  const supabase = createClient();

  const { data: goal, error } = await supabase
    .from('goals')
    .select('*')
    .eq('id', goalId)
    .single();

  if (error) {
    console.error('Error fetching goal:', error);
    throw error;
  }

  return goal as Goal;
}

/**
 * 목표 수정
 */
export async function updateGoal(goalId: string, data: Partial<CreateGoalData>) {
  const supabase = createClient();

  const { data: goal, error } = await supabase
    .from('goals')
    .update(data)
    .eq('id', goalId)
    .select()
    .single();

  if (error) {
    console.error('Error updating goal:', error);
    throw error;
  }

  return goal;
}

/**
 * 목표 삭제
 */
export async function deleteGoal(goalId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId);

  if (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }

  return true;
}

/**
 * 모든 사용자의 목표 가져오기 (프로필 정보 포함)
 */
export async function getAllGoals() {
  const supabase = createClient();

  // First get all goals
  const { data: goals, error: goalsError } = await supabase
    .from('goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (goalsError) {
    console.error('Error fetching all goals:', goalsError);
    throw goalsError;
  }

  if (!goals || goals.length === 0) {
    return [];
  }

  // Get unique user IDs
  const userIds = [...new Set(goals.map((goal: any) => goal.user_id))];

  // Fetch profiles for these users
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', userIds);

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    // Continue without profiles if there's an error
  }

  // Create a map of user_id -> profile
  const profileMap = new Map();
  if (profiles) {
    profiles.forEach((profile: any) => {
      profileMap.set(profile.id, profile);
    });
  }

  // Combine goals with profile data
  const goalsWithProfiles = goals.map((goal: any) => ({
    ...goal,
    profiles: profileMap.get(goal.user_id) || null
  }));

  return goalsWithProfiles;
}