import { supabase } from "../supabase/client";

export interface RecognitionJudgment {
  id: string;
  from_user_id: string;
  to_user_id: string;
  judgment_id: string;
  created_at: string;
}

/**
 * Send recognition to a judgment
 */
export async function sendRecognitionToJudgment(
  toUserId: string,
  judgmentId: string
): Promise<RecognitionJudgment> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to send recognition");
  }

  const { data, error } = await supabase
    .from("recognitions_judgment")
    .insert({
      from_user_id: user.id,
      to_user_id: toUserId,
      judgment_id: judgmentId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Cancel recognition sent to a judgment
 */
export async function cancelRecognitionToJudgment(judgmentId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to cancel recognition");
  }

  const { error } = await supabase
    .from("recognitions_judgment")
    .delete()
    .eq("from_user_id", user.id)
    .eq("judgment_id", judgmentId);

  if (error) {
    throw error;
  }
}

/**
 * Get all recognitions to judgments sent by the current user
 */
export async function getUserSentRecognitionsToJudgments(): Promise<RecognitionJudgment[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("recognitions_judgment")
    .select("*")
    .eq("from_user_id", user.id);

  if (error) {
    console.error("Error fetching sent recognitions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get count of recognitions received by a user
 */
export async function getReceivedRecognitionCount(userId?: string): Promise<number> {
  let targetUserId = userId;

  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return 0;
    }
    targetUserId = user.id;
  }

  const { count, error } = await supabase
    .from("recognitions_judgment")
    .select("*", { count: "exact", head: true })
    .eq("to_user_id", targetUserId);

  if (error) {
    console.error("Error fetching received recognition count:", error);
    return 0;
  }

  return count || 0;
}