import { createClient } from '../supabase/client';

export interface Review {
  id: string;
  user_id: string;
  activity: string;
  review_text: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  activity: string;
  review_text: string;
  rating: number;
}

/**
 * 새로운 리뷰 생성
 */
export async function createReview(data: CreateReviewData) {
  const supabase = createClient();

  // 현재 로그인한 사용자 확인
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: review, error } = await supabase
    .from('reviews')
    .insert([
      {
        user_id: user.id,
        activity: data.activity,
        review_text: data.review_text,
        rating: data.rating,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating review:', error);
    throw error;
  }

  return review;
}

/**
 * 사용자의 모든 리뷰 조회
 */
export async function getUserReviews() {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }

  return reviews as Review[];
}

/**
 * 이번 주에 리뷰를 작성했는지 확인
 */
export async function hasWrittenReviewThisWeek(): Promise<boolean> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return false;
  }

  // 이번 주 월요일 00:00:00 계산
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 그 외는 월요일까지의 차이
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('id')
    .eq('user_id', user.id)
    .gte('created_at', monday.toISOString())
    .limit(1);

  if (error) {
    console.error('Error checking review:', error);
    return false;
  }

  return reviews && reviews.length > 0;
}

/**
 * 특정 리뷰 조회
 */
export async function getReview(reviewId: string) {
  const supabase = createClient();

  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', reviewId)
    .single();

  if (error) {
    console.error('Error fetching review:', error);
    throw error;
  }

  return review as Review;
}

/**
 * 리뷰 수정
 */
export async function updateReview(reviewId: string, data: Partial<CreateReviewData>) {
  const supabase = createClient();

  const { data: review, error } = await supabase
    .from('reviews')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reviewId)
    .select()
    .single();

  if (error) {
    console.error('Error updating review:', error);
    throw error;
  }

  return review;
}

/**
 * 리뷰 삭제
 */
export async function deleteReview(reviewId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  if (error) {
    console.error('Error deleting review:', error);
    throw error;
  }

  return true;
}

/**
 * 이번 주 또는 최근 리뷰 가져오기
 */
export async function getLatestReview(): Promise<Review | null> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching latest review:', error);
    return null;
  }

  return reviews && reviews.length > 0 ? (reviews[0] as Review) : null;
}

/**
 * 모든 사용자의 리뷰 가져오기 (프로필 정보 포함)
 */
export async function getAllReviews() {
  const supabase = createClient();

  // First get all reviews
  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (reviewsError) {
    console.error('Error fetching all reviews:', reviewsError);
    throw reviewsError;
  }

  if (!reviews || reviews.length === 0) {
    return [];
  }

  // Get unique user IDs
  const userIds = [...new Set(reviews.map((review: any) => review.user_id))];

  // Fetch profiles for these users
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', userIds);

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    // Continue without profiles if there's an error
  }

  // Create a map of user_id -> profile
  const profileMap = new Map();
  if (profiles) {
    profiles.forEach((profile: any) => {
      profileMap.set(profile.id, profile);
    });
  }

  // Combine reviews with profile data
  const reviewsWithProfiles = reviews.map((review: any) => ({
    ...review,
    profiles: profileMap.get(review.user_id) || null
  }));

  return reviewsWithProfiles;
}