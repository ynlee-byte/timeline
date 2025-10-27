import { supabase } from "../supabase/client";

export interface RecognitionReview {
  id: string;
  from_user_id: string;
  to_user_id: string;
  review_id: string;
  created_at: string;
}

export interface RecognitionGoal {
  id: string;
  from_user_id: string;
  to_user_id: string;
  goal_id: string;
  created_at: string;
}

/**
 * Send recognition to a review
 */
export async function sendRecognitionToReview(
  toUserId: string,
  reviewId: string
): Promise<RecognitionReview> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to send recognition");
  }

  const { data, error } = await supabase
    .from("recognitions_review")
    .insert({
      from_user_id: user.id,
      to_user_id: toUserId,
      review_id: reviewId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Cancel recognition on a review
 */
export async function cancelRecognitionOnReview(reviewId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to cancel recognition");
  }

  const { error } = await supabase
    .from("recognitions_review")
    .delete()
    .eq("from_user_id", user.id)
    .eq("review_id", reviewId);

  if (error) {
    throw error;
  }
}

/**
 * Send recognition to a goal
 */
export async function sendRecognitionToGoal(
  toUserId: string,
  goalId: string
): Promise<RecognitionGoal> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to send recognition");
  }

  const { data, error } = await supabase
    .from("recognitions_goal")
    .insert({
      from_user_id: user.id,
      to_user_id: toUserId,
      goal_id: goalId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Cancel recognition on a goal
 */
export async function cancelRecognitionOnGoal(goalId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to cancel recognition");
  }

  const { error } = await supabase
    .from("recognitions_goal")
    .delete()
    .eq("from_user_id", user.id)
    .eq("goal_id", goalId);

  if (error) {
    throw error;
  }
}

/**
 * Get all review recognitions sent by the current user
 */
export async function getUserSentReviewRecognitions(): Promise<RecognitionReview[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("recognitions_review")
    .select("*")
    .eq("from_user_id", user.id);

  if (error) {
    console.error("Error fetching sent review recognitions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get all goal recognitions sent by the current user
 */
export async function getUserSentGoalRecognitions(): Promise<RecognitionGoal[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("recognitions_goal")
    .select("*")
    .eq("from_user_id", user.id);

  if (error) {
    console.error("Error fetching sent goal recognitions:", error);
    return [];
  }

  return data || [];
}