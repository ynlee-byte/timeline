import { supabase } from "../supabase/client";

export interface Goal {
  id: string;
  user_id: string;
  content?: string;
  activity?: string;
  goal_text?: string;
  rating?: number;
  target_user_id?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export interface CreateGoalData {
  activity?: string;
  goal_text?: string;
  rating?: number;
  content?: string;
  target_user_id?: string;
}

/**
 * Create a new goal
 */
export async function createGoal(
  data: CreateGoalData | string,
  targetUserId?: string
): Promise<Goal> {
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;

  if (!user) {
    throw new Error("User must be authenticated to create a goal");
  }

  // Handle both string and object inputs
  let goalData: any = {
    user_id: user.id,
  };

  if (typeof data === 'string') {
    goalData.content = data;
    goalData.target_user_id = targetUserId;
  } else {
    goalData = {
      ...goalData,
      ...data,
    };
  }

  const { data: insertedData, error } = await supabase
    .from("goals")
    .insert(goalData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return insertedData;
}

/**
 * Get the latest goal by the current user
 */
export async function getLatestGoal(): Promise<Goal | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching latest goal:", error);
    return null;
  }

  return data;
}

/**
 * Get all goals
 */
export async function getAllGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all goals:", error);
    return [];
  }

  return data || [];
}