import { supabase } from "../supabase/client";

export interface Review {
  id: string;
  user_id: string;
  content?: string;
  activity?: string;
  review_text?: string;
  rating?: number;
  target_user_id?: string;
  created_at: string;
  updated_at: string;
  week_start?: string;
  [key: string]: any;
}

export interface CreateReviewData {
  activity?: string;
  review_text?: string;
  rating?: number;
  content?: string;
  target_user_id?: string;
}

/**
 * Create a new review
 */
export async function createReview(
  data: CreateReviewData | string,
  targetUserId?: string
): Promise<Review> {
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;

  if (!user) {
    throw new Error("User must be authenticated to create a review");
  }

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  // Handle both string and object inputs
  let reviewData: any = {
    user_id: user.id,
    week_start: startOfWeek.toISOString(),
  };

  if (typeof data === 'string') {
    reviewData.content = data;
    reviewData.target_user_id = targetUserId;
  } else {
    reviewData = {
      ...reviewData,
      ...data,
    };
  }

  const { data: insertedData, error } = await supabase
    .from("reviews")
    .insert(reviewData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return insertedData;
}

/**
 * Check if user has written a review this week
 */
export async function hasWrittenReviewThisWeek(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", user.id)
    .gte("week_start", startOfWeek.toISOString())
    .limit(1);

  if (error) {
    console.error("Error checking review:", error);
    return false;
  }

  return data && data.length > 0;
}

/**
 * Get the latest review by the current user
 */
export async function getLatestReview(): Promise<Review | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching latest review:", error);
    return null;
  }

  return data;
}

/**
 * Get all reviews
 */
export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }

  return data || [];
}