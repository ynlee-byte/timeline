import { supabase } from "../supabase/client";

export interface Applause {
  id: string;
  from_user_id: string;
  to_user_id: string;
  challenger_id: number;
  created_at: string;
}

/**
 * Send applause to a user for a specific challenger
 */
export async function sendApplause(toUserId: string, challengerId: number): Promise<Applause> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to send applause");
  }

  const { data, error } = await supabase
    .from("applause")
    .insert({
      from_user_id: user.id,
      to_user_id: toUserId,
      challenger_id: challengerId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Cancel applause sent to a challenger
 */
export async function cancelApplause(challengerId: number): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to cancel applause");
  }

  const { error } = await supabase
    .from("applause")
    .delete()
    .eq("from_user_id", user.id)
    .eq("challenger_id", challengerId);

  if (error) {
    throw error;
  }
}

/**
 * Get all applause sent by the current user
 */
export async function getUserSentApplause(): Promise<Applause[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("applause")
    .select("*")
    .eq("from_user_id", user.id);

  if (error) {
    console.error("Error fetching sent applause:", error);
    return [];
  }

  return data || [];
}

/**
 * Get count of applause received by a user
 */
export async function getReceivedApplauseCount(userId?: string): Promise<number> {
  let targetUserId = userId;

  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return 0;
    }
    targetUserId = user.id;
  }

  const { count, error } = await supabase
    .from("applause")
    .select("*", { count: "exact", head: true })
    .eq("to_user_id", targetUserId);

  if (error) {
    console.error("Error fetching received applause count:", error);
    return 0;
  }

  return count || 0;
}