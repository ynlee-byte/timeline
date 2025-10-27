import { createClient } from '../supabase/client';

export interface RecognitionJudgment {
  id: string;
  from_user_id: string;
  to_user_id: string;
  judgment_id: string;
  created_at: string;
}

/**
 * Winner List의 판정 카드에 귀감 보내기
 */
export async function sendRecognitionToJudgment(judgmentId: string, toUserId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 본인에게는 보낼 수 없음
  if (user.id === toUserId) {
    throw new Error('본인에게는 귀감을 보낼 수 없어요!😅');
  }

  // 이미 5명에게 귀감을 보냈는지 확인
  const { data: sentCount, error: sentError } = await supabase
    .from('recognitions_judgment')
    .select('to_user_id', { count: 'exact', head: false })
    .eq('from_user_id', user.id);

  if (sentError) throw sentError;

  // 고유한 to_user_id 개수 세기
  const uniqueRecipients = new Set(sentCount?.map((r: any) => r.to_user_id) || []);
  if (uniqueRecipients.size >= 5) {
    throw new Error('이미 5명한테 귀감을 보냈어요 😊');
  }

  // 귀감 보내기
  const { data, error } = await supabase
    .from('recognitions_judgment')
    .insert([{
      from_user_id: user.id,
      to_user_id: toUserId,
      judgment_id: judgmentId
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
 * 귀감 취소
 */
export async function cancelRecognitionToJudgment(judgmentId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { error } = await supabase
    .from('recognitions_judgment')
    .delete()
    .eq('from_user_id', user.id)
    .eq('judgment_id', judgmentId);

  if (error) throw error;
  return true;
}

/**
 * 현재 사용자가 보낸 귀감 목록 가져오기
 */
export async function getUserSentRecognitionsToJudgments() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from('recognitions_judgment')
    .select('*')
    .eq('from_user_id', user.id);

  if (error) {
    console.error('Error fetching user sent recognitions:', error);
    return [];
  }

  return data || [];
}

/**
 * 모든 귀감 가져오기 (카드에 표시할 개수 세기용)
 */
export async function getAllRecognitionsForJudgments() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('recognitions_judgment')
    .select('*');

  if (error) {
    console.error('Error fetching all recognitions:', error);
    return [];
  }

  return data || [];
}

/**
 * 특정 사용자가 받은 귀감 개수 가져오기
 */
export async function getReceivedRecognitionCount(userId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from('recognitions_judgment')
    .select('*', { count: 'exact', head: true })
    .eq('to_user_id', userId);

  if (error) {
    console.error('Error counting received recognitions:', error);
    return 0;
  }

  return count || 0;
}