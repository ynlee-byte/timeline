import { supabase } from "../supabase/client";

export interface Judgment {
  id: string;
  user_id: string;
  content?: string;
  achieved?: boolean;
  comment?: string;
  target_user_id?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export interface CreateJudgmentData {
  achieved?: boolean;
  comment?: string;
  content?: string;
  target_user_id?: string;
}

/**
 * Create a new judgment
 */
export async function createJudgment(
  data: CreateJudgmentData | string,
  targetUserId?: string
): Promise<Judgment> {
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;

  if (!user) {
    throw new Error("User must be authenticated to create a judgment");
  }

  // Handle both string and object inputs
  let judgmentData: any = {
    user_id: user.id,
  };

  if (typeof data === 'string') {
    judgmentData.content = data;
    judgmentData.target_user_id = targetUserId;
  } else {
    judgmentData = {
      ...judgmentData,
      ...data,
    };
  }

  const { data: insertedData, error } = await supabase
    .from("judgments")
    .insert(judgmentData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return insertedData;
}

/**
 * Get the latest judgment by the current user
 */
export async function getLatestJudgment(): Promise<Judgment | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("judgments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching latest judgment:", error);
    return null;
  }

  return data;
}