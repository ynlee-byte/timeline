import { createClient } from '../supabase/client';

export interface Recognition {
  id: string;
  from_user_id: string;
  to_user_id: string;
  review_id?: string;
  goal_id?: string;
  created_at: string;
}

/**
 * 리뷰에 인정 보내기
 */
export async function sendRecognitionToReview(reviewId: string, toUserId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 본인의 리뷰인지 확인
  if (user.id === toUserId) {
    throw new Error('본인의 것에는 인정/응원을 남길 수 없어요!');
  }

  // 이미 5명에게 인정을 보냈는지 확인
  const { data: sentCount, error: sentError } = await supabase
    .from('recognitions_review')
    .select('to_user_id', { count: 'exact', head: false })
    .eq('from_user_id', user.id);

  if (sentError) throw sentError;

  // 고유한 to_user_id 개수 세기
  const uniqueRecipients = new Set(sentCount?.map((r: any) => r.to_user_id) || []);
  if (uniqueRecipients.size >= 5) {
    throw new Error('이미 5명에게 인정을 날렸네요!');
  }

  // 받는 사람이 이미 5개를 받았는지 확인
  const { count: receivedCount, error: receivedError } = await supabase
    .from('recognitions_review')
    .select('*', { count: 'exact', head: true })
    .eq('to_user_id', toUserId);

  if (receivedError) throw receivedError;

  if (receivedCount && receivedCount >= 5) {
    throw new Error('5개 넘게 받은 인정이라, 다른 사람에게 인정을 날려주세요!');
  }

  // 인정 보내기
  const { data, error } = await supabase
    .from('recognitions_review')
    .insert([{
      from_user_id: user.id,
      to_user_id: toUserId,
      review_id: reviewId
    }])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }
  return data;
}

/**
 * 리뷰 인정 취소
 */
export async function cancelRecognitionOnReview(reviewId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { error } = await supabase
    .from('recognitions_review')
    .delete()
    .eq('from_user_id', user.id)
    .eq('review_id', reviewId);

  if (error) throw error;
  return true;
}

/**
 * 목표에 응원 보내기
 */
export async function sendRecognitionToGoal(goalId: string, toUserId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 본인의 목표인지 확인
  if (user.id === toUserId) {
    throw new Error('본인의 것에는 인정/응원을 남길 수 없어요!');
  }

  // 이미 5명에게 응원을 보냈는지 확인
  const { data: sentCount, error: sentError } = await supabase
    .from('recognitions_goal')
    .select('to_user_id', { count: 'exact', head: false })
    .eq('from_user_id', user.id);

  if (sentError) throw sentError;

  // 고유한 to_user_id 개수 세기
  const uniqueRecipients = new Set(sentCount?.map((r: any) => r.to_user_id) || []);
  if (uniqueRecipients.size >= 5) {
    throw new Error('이미 5명에게 응원을 날렸네요!');
  }

  // 받는 사람이 이미 5개를 받았는지 확인
  const { count: receivedCount, error: receivedError } = await supabase
    .from('recognitions_goal')
    .select('*', { count: 'exact', head: true })
    .eq('to_user_id', toUserId);

  if (receivedError) throw receivedError;

  if (receivedCount && receivedCount >= 5) {
    throw new Error('5개 넘게 받은 응원이라, 다른 사람에게 응원을 날려주세요!');
  }

  // 응원 보내기
  const { data, error } = await supabase
    .from('recognitions_goal')
    .insert([{
      from_user_id: user.id,
      to_user_id: toUserId,
      goal_id: goalId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 목표 응원 취소
 */
export async function cancelRecognitionOnGoal(goalId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { error } = await supabase
    .from('recognitions_goal')
    .delete()
    .eq('from_user_id', user.id)
    .eq('goal_id', goalId);

  if (error) throw error;
  return true;
}

/**
 * 현재 사용자가 보낸 리뷰 인정 목록 가져오기
 */
export async function getUserSentReviewRecognitions() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from('recognitions_review')
    .select('*')
    .eq('from_user_id', user.id);

  if (error) {
    console.error('Error fetching user sent review recognitions:', error);
    return [];
  }

  return data || [];
}

/**
 * 현재 사용자가 보낸 목표 응원 목록 가져오기
 */
export async function getUserSentGoalRecognitions() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from('recognitions_goal')
    .select('*')
    .eq('from_user_id', user.id);

  if (error) {
    console.error('Error fetching user sent goal recognitions:', error);
    return [];
  }

  return data || [];
}

/**
 * 모든 리뷰 인정 가져오기 (카드에 표시할 개수 세기용)
 */
export async function getAllReviewRecognitions() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('recognitions_review')
    .select('*');

  if (error) {
    console.error('Error fetching all review recognitions:', error);
    return [];
  }

  return data || [];
}

/**
 * 모든 목표 응원 가져오기 (카드에 표시할 개수 세기용)
 */
export async function getAllGoalRecognitions() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('recognitions_goal')
    .select('*');

  if (error) {
    console.error('Error fetching all goal recognitions:', error);
    return [];
  }

  return data || [];
}