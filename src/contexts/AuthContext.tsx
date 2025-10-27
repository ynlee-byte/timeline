"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Profile, getProfile, createProfile } from '@/lib/services/profileService';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setProfile(null); // Clear profile when checking session
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        // Clear profile immediately when user logs out
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Load profile when user changes
  useEffect(() => {
    if (user) {
      // Clear old profile first to prevent flashing old data
      setProfile(null);
      getProfile(user.id).then(setProfile).catch(console.error);
    } else {
      setProfile(null);
    }
  }, [user]);

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    // 회원가입 성공 시 프로필 생성 (트리거가 작동하지 않을 경우를 대비)
    if (!error && data.user) {
      try {
        await createProfile(data.user.id, name);
        console.log('Profile created successfully via manual call');
      } catch (profileError: any) {
        // 프로필이 이미 존재하면 무시 (트리거가 작동한 경우)
        // Error code 23505는 PostgreSQL의 unique_violation (중복 키)
        // 빈 에러 객체도 트리거가 정상 작동한 것으로 간주
        const hasRealError = profileError?.message || profileError?.code || profileError?.details || profileError?.hint;
        if (profileError?.code === '23505' ||
            profileError?.message?.includes('duplicate') ||
            !hasRealError) {
          // 트리거가 이미 프로필을 생성한 경우 - 정상 동작
          console.log('Profile already exists (created by trigger)');
        } else {
          // 진짜 예상치 못한 에러인 경우만 로깅
          console.error('Unexpected error creating profile:', {
            error: profileError,
            message: profileError?.message,
            code: profileError?.code,
            details: profileError?.details
          });
        }
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}