import { createClient } from '../supabase/client';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

/**
 * 프로필 조회
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data as Profile;
}

/**
 * 현재 사용자의 프로필 조회
 */
export async function getCurrentUserProfile(): Promise<Profile | null> {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  return getProfile(user.id);
}

/**
 * 프로필 수정
 */
export async function updateProfile(userId: string, updates: UpdateProfileData): Promise<Profile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data as Profile;
}

/**
 * 프로필 생성 (회원가입 시)
 */
export async function createProfile(userId: string, full_name: string): Promise<Profile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        full_name: full_name,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating profile details:', {
      error,
      errorMessage: error?.message,
      errorCode: error?.code,
      errorDetails: error?.details,
      errorHint: error?.hint,
      userId,
      full_name
    });
    throw error;
  }

  return data as Profile;
}