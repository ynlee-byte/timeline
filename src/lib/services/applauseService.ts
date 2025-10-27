import { createClient } from '../supabase/client';

export interface Applause {
  id: string;
  from_user_id: string;
  to_user_id: string;
  challenger_id: number;
  created_at: string;
}

/**
 * Next Challenger에게박수 보내기
 */
export async function sendApplause(challengerId: number, toUserId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 본인에게는 보낼 수 없음
  if (user.id === toUserId) {
    throw new Error('본인에게는 박수를 보낼 수 없어요!😅');
  }

  // 이미 5명에게 박수를 보냈는지 확인
  const { data: sentCount, error: sentError } = await supabase
    .from('applause')
    .select('to_user_id', { count: 'exact', head: false })
    .eq('from_user_id', user.id);

  if (sentError) throw sentError;

  // 고유한 to_user_id 개수 세기
  const uniqueRecipients = new Set(sentCount?.map((r: any) => r.to_user_id) || []);
  if (uniqueRecipients.size >= 5) {
    throw new Error('이미 5명한테 박수를 보냈어요 😊');
  }

  // 박수 보내기
  const { data, error } = await supabase
    .from('applause')
    .insert([{
      from_user_id: user.id,
      to_user_id: toUserId,
      challenger_id: challengerId
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
 * 박수 취소
 */
export async function cancelApplause(challengerId: number) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { error } = await supabase
    .from('applause')
    .delete()
    .eq('from_user_id', user.id)
    .eq('challenger_id', challengerId);

  if (error) throw error;
  return true;
}

/**
 * 현재 사용자가 보낸 박수 목록 가져오기
 */
export async function getUserSentApplause() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from('applause')
    .select('*')
    .eq('from_user_id', user.id);

  if (error) {
    console.error('Error fetching user sent applause:', error);
    return [];
  }

  return data || [];
}

/**
 * 모든 박수 가져오기 (카드에 표시할 개수 세기용)
 */
export async function getAllApplause() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('applause')
    .select('*');

  if (error) {
    console.error('Error fetching all applause:', error);
    return [];
  }

  return data || [];
}

/**
 * 특정 사용자가 받은 박수 개수 가져오기
 */
export async function getReceivedApplauseCount(userId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from('applause')
    .select('*', { count: 'exact', head: true })
    .eq('to_user_id', userId);

  if (error) {
    console.error('Error counting received applause:', error);
    return 0;
  }

  return count || 0;
}