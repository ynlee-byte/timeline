import { createClient } from '../supabase/client';

export interface NextChallengerCard {
  id: number;
  userId: string;
  judgment_id?: string; // UUID for Winner List cards
  profileImage?: string;
  title: string;
  crewName: string;
  description: string;
  bgImage: string;
  bgSubImage: string;
  badgeImage: string;
  created_at: string;
}

/**
 * 목표 달성에 실패한 판정 카드 목록 가져오기 (Next Challenger)
 */
export async function getNextChallengerCards(): Promise<NextChallengerCard[]> {
  const supabase = createClient();

  // 먼저 모든 판정 데이터 확인
  const { data: allJudgments } = await supabase
    .from('judgments')
    .select('id, achieved, comment, created_at')
    .order('created_at', { ascending: false });

  console.log('All judgments in DB:', allJudgments);

  // achieved: false인 판정 데이터 가져오기
  const { data: judgments, error } = await supabase
    .from('judgments')
    .select('id, user_id, comment, created_at, achieved')
    .eq('achieved', false)
    .order('created_at', { ascending: false })
    .limit(20); // 최근 20개만

  if (error) {
    console.error('Error fetching next challenger cards:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return [];
  }

  console.log('Judgments data:', judgments);
  console.log('Number of judgments found:', judgments?.length || 0);

  if (!judgments || judgments.length === 0) {
    console.log('No judgments found with achieved: false');
    return [];
  }

  // 각 판정에 대해 프로필 정보 가져오기
  const cardsWithProfiles = await Promise.all(
    judgments.map(async (judgment: any, index: number) => {
      // 프로필 정보 조회
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', judgment.user_id)
        .single();

      // 배경 이미지 순환
      const bgImages = [
        "https://c.animaapp.com/O1XpzcZm/img/bg-5.svg",
        "https://c.animaapp.com/O1XpzcZm/img/bg-6.svg",
        "https://c.animaapp.com/O1XpzcZm/img/bg-7.svg"
      ];

      const badgeImages = [
        "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
        "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
        "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg"
      ];

      return {
        id: index + 1, // 순차적인 ID
        userId: judgment.user_id,
        profileImage: profile?.avatar_url || "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
        title: "지난주 목표", // 나중에 goal 정보와 연결
        crewName: profile?.full_name ? `${profile.full_name} 크루` : "익명 크루",
        description: judgment.comment,
        bgImage: bgImages[index % bgImages.length],
        bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
        badgeImage: badgeImages[index % badgeImages.length],
        created_at: judgment.created_at
      };
    })
  );

  return cardsWithProfiles;
}

/**
 * 목표 달성에 성공한 판정 카드 목록 가져오기 (Winner List)
 */
export async function getWinnerCards(): Promise<NextChallengerCard[]> {
  const supabase = createClient();

  // achieved: true인 판정 데이터 가져오기
  const { data: judgments, error } = await supabase
    .from('judgments')
    .select('id, user_id, comment, created_at')
    .eq('achieved', true)
    .order('created_at', { ascending: false })
    .limit(20); // 최근 20개만

  if (error) {
    console.error('Error fetching winner cards:', error);
    return [];
  }

  if (!judgments || judgments.length === 0) {
    return [];
  }

  // 각 판정에 대해 프로필 정보 가져오기
  const cardsWithProfiles = await Promise.all(
    judgments.map(async (judgment: any, index: number) => {
      // 프로필 정보 조회
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', judgment.user_id)
        .single();

      // 배경 이미지 순환 (성공 카드는 초록색 배경)
      const bgImages = [
        "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
        "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
        "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg"
      ];

      const badgeImages = [
        "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
        "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
        "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg"
      ];

      return {
        id: index + 1, // 순차적인 ID
        userId: judgment.user_id,
        judgment_id: judgment.id, // UUID for recognition system
        profileImage: profile?.avatar_url || "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
        title: "지난주 목표", // 나중에 goal 정보와 연결
        crewName: profile?.full_name ? `${profile.full_name} 크루` : "익명 크루",
        description: judgment.comment,
        bgImage: bgImages[index % bgImages.length],
        bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
        badgeImage: badgeImages[index % badgeImages.length],
        created_at: judgment.created_at
      };
    })
  );

  return cardsWithProfiles;
}

/**
 * Create a new goal
 */
export async function createNextChallengerCard(
  title: string,
  description: string
): Promise<NextChallengerCard> {
  const supabase = createClient();
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

  return data as any;
}

/**
 * Update card status (this would be updating a judgment)
 */
export async function updateCardStatus(
  cardId: string,
  status: "pending" | "completed" | "winner"
): Promise<NextChallengerCard> {
  const supabase = createClient();
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

  return data as any;
}