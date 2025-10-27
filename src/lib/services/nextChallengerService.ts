import { supabase } from "../supabase/client";

export interface NextChallengerCard {
  id: string | number;
  user_id?: string;
  userId?: string;
  title: string;
  description: string;
  status?: "pending" | "completed" | "winner";
  created_at?: string;
  updated_at?: string;
  applause_count?: number;
  recognition_count?: number;
  profileImage?: string;
  crewName?: string;
  bgImage?: string;
  bgSubImage?: string;
  badgeImage?: string;
  [key: string]: any;
}

/**
 * Get all next challenger cards (judgments where achieved = false)
 * These are users who didn't achieve their goals
 */
export async function getNextChallengerCards(): Promise<NextChallengerCard[]> {
  try {
    const { data, error } = await supabase
      .from("judgments")
      .select(`
        *,
        goal:goals(*),
        profile:profiles(*)
      `)
      .eq("achieved", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Database not configured or table missing, using fallback data");
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn("Database error, using fallback data:", error);
    return [];
  }
}

/**
 * Get all winner cards (judgments where achieved = true)
 * These are users who achieved their goals
 */
export async function getWinnerCards(): Promise<NextChallengerCard[]> {
  try {
    const { data, error } = await supabase
      .from("judgments")
      .select(`
        *,
        goal:goals(*),
        profile:profiles(*)
      `)
      .eq("achieved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Database not configured or table missing, using fallback data");
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn("Database error, using fallback data:", error);
    return [];
  }
}

/**
 * Create a new goal
 */
export async function createNextChallengerCard(
  title: string,
  description: string
): Promise<NextChallengerCard> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to create a card");
  }

  // This would create a goal, not a challenger card directly
  const { data, error } = await supabase
    .from("goals")
    .insert({
      user_id: user.id,
      activity: title,
      goal_text: description,
      rating: 3, // default rating
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Update card status (this would be updating a judgment)
 */
export async function updateCardStatus(
  cardId: string,
  status: "pending" | "completed" | "winner"
): Promise<NextChallengerCard> {
  const achieved = status === "winner";

  const { data, error } = await supabase
    .from("judgments")
    .update({ achieved })
    .eq("id", cardId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}