"use client";

import { useEffect, useState, useRef } from 'react';
import { getTop10Expectations } from '@/lib/services/calendarService';
import borderSmallImg from '@/assets/border small.png';

interface RankingItem {
  id: number;
  summary: string;
  start_datetime: string;
  end_datetime: string;
  description: string | null;
  expectationCount: number;
}

export const ExpectationRanking = () => {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadRankings();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 마우스 휠로 가로 스크롤 (카드 1개씩 이동)
  useEffect(() => {
    if (!isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 280; // 카드 너비
    const gap = 12; // gap-3 = 12px
    const scrollAmount = cardWidth + gap; // 카드 1개 크기

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // 휠 방향에 따라 1개씩 스크롤
      if (e.deltaY > 0) {
        // 아래로 스크롤 = 오른쪽으로 이동
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else if (e.deltaY < 0) {
        // 위로 스크롤 = 왼쪽으로 이동
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile, rankings]);

  const loadRankings = async () => {
    try {
      setLoading(true);

      // 더미 데이터 (개발/테스트용)
      const dummyData: RankingItem[] = [
        {
          id: 1,
          summary: '엥크레 Wisdom 활동 피드백 제공하기',
          start_datetime: '2025-01-27T09:00:00',
          end_datetime: '2025-01-27T10:00:00',
          description: '팀원들의 위즈덤 활동에 대한 피드백',
          expectationCount: 42
        },
        {
          id: 2,
          summary: '주간 스프린트 회고',
          start_datetime: '2025-01-27T14:00:00',
          end_datetime: '2025-01-27T15:00:00',
          description: '이번 주 스프린트 되돌아보기',
          expectationCount: 35
        },
        {
          id: 3,
          summary: '신규 기능 데모 발표',
          start_datetime: '2025-01-28T10:00:00',
          end_datetime: '2025-01-28T11:00:00',
          description: '새로운 기능 시연 및 설명',
          expectationCount: 28
        },
        {
          id: 4,
          summary: '팀 빌딩 활동',
          start_datetime: '2025-01-28T15:00:00',
          end_datetime: '2025-01-28T17:00:00',
          description: '팀 단합을 위한 활동',
          expectationCount: 24
        },
        {
          id: 5,
          summary: '코드 리뷰 세션',
          start_datetime: '2025-01-29T11:00:00',
          end_datetime: '2025-01-29T12:00:00',
          description: '주요 PR에 대한 리뷰',
          expectationCount: 19
        },
        {
          id: 6,
          summary: '기술 세미나',
          start_datetime: '2025-01-29T14:00:00',
          end_datetime: '2025-01-29T15:00:00',
          description: '최신 기술 트렌드 공유',
          expectationCount: 15
        },
        {
          id: 7,
          summary: '월간 전체 회의',
          start_datetime: '2025-01-30T10:00:00',
          end_datetime: '2025-01-30T11:30:00',
          description: '월간 성과 공유 및 계획',
          expectationCount: 12
        },
        {
          id: 8,
          summary: '1:1 면담',
          start_datetime: '2025-01-30T14:00:00',
          end_datetime: '2025-01-30T15:00:00',
          description: '팀원과의 개별 면담',
          expectationCount: 9
        },
        {
          id: 9,
          summary: '프로젝트 킥오프',
          start_datetime: '2025-01-31T09:00:00',
          end_datetime: '2025-01-31T10:00:00',
          description: '신규 프로젝트 시작',
          expectationCount: 7
        },
        {
          id: 10,
          summary: '주간 점심 식사',
          start_datetime: '2025-01-31T12:00:00',
          end_datetime: '2025-01-31T13:00:00',
          description: '팀 전체 점심 식사',
          expectationCount: 5
        }
      ];

      setRankings(dummyData);

      // 실제 데이터도 함께 로드 (나중에 더미 데이터 제거 시)
      // const data = await getTop10Expectations();
      // setRankings(data as RankingItem[]);
    } catch (error) {
      console.error('Error loading rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return null;
    }
  };

  const getRankText = (rank: number) => {
    if (rank >= 3) {
      return `${rank + 1}위`;
    }
    return null;
  };

  if (loading) {
    return null;
  }

  if (rankings.length === 0) {
    return null;
  }

  const topFive = rankings.slice(0, 5);
  const topTen = rankings.slice(0, 10);

  return (
    <div className="w-full bg-[#1a1a1a]/50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* 헤더 */}
        <div className={`flex items-center mb-8 relative ${isMobile ? 'justify-start' : 'justify-center'}`}>
          <h3 className="[font-family:'Ria'] font-ria-sans font-bold text-white text-lg flex items-center gap-2">
            <span>🏆</span>
            <span>이번 주 인기 활동</span>
          </h3>
          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#21e786] hover:text-[#1bc876] text-xs transition-colors flex items-center gap-1 absolute right-0"
            >
              <span>{isExpanded ? '접기' : '더보기'}</span>
              <span>{isExpanded ? '▲' : '▼'}</span>
            </button>
          )}
        </div>

        {/* 모바일: 가로 스와이프 (1~10위) */}
        {isMobile ? (
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto -mx-6 px-6 pb-2 scrollbar-hide"
          >
            <div className="flex gap-3">
              {topTen.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 w-[280px] p-5 transition-all duration-200 border-2 cursor-pointer ${
                    index === 0
                      ? 'bg-[#2a2a2a] border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                      : index === 1
                      ? 'bg-[#2a2a2a] border-gray-400 shadow-[0_0_15px_rgba(156,163,175,0.4)]'
                      : index === 2
                      ? 'bg-[#2a2a2a] border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                      : 'bg-[#2a2a2a] border-[#21e786]/30'
                  }`}
                >
                  {/* 순위와 카운트 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getMedalIcon(index) && (
                        <div className={`text-3xl ${index === 0 ? 'animate-pulse' : ''}`}>
                          {getMedalIcon(index)}
                        </div>
                      )}
                      {getRankText(index) && (
                        <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-xl">
                          {getRankText(index)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-full">
                      <span className="text-base">🔥</span>
                      <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-sm">{item.expectationCount}</span>
                    </div>
                  </div>
                  {/* 활동명 */}
                  <h4 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-sm leading-tight line-clamp-3 min-h-[60px]">
                    {item.summary}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* 데스크톱: Top 5 - 1~3위 강조, 4~5위 작게 */}
        <div className="flex gap-4 items-end">
          {/* 1~3위 */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {topFive.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className={`relative p-6 transition-all duration-200 cursor-pointer hover:shadow-xl overflow-hidden ${
                  index === 0
                    ? 'shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:shadow-[0_0_30px_rgba(234,179,8,0.7)]'
                    : index === 1
                    ? 'shadow-[0_0_20px_rgba(156,163,175,0.5)] hover:shadow-[0_0_30px_rgba(156,163,175,0.7)]'
                    : 'shadow-[0_0_20px_rgba(184,115,51,0.5)] hover:shadow-[0_0_30px_rgba(184,115,51,0.7)]'
                }`}
                style={{
                  background: index === 0
                    ? 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(42,42,42,1) 50%, rgba(234,179,8,0.05) 100%)'
                    : index === 1
                    ? 'linear-gradient(135deg, rgba(156,163,175,0.08) 0%, rgba(42,42,42,1) 50%, rgba(156,163,175,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(184,115,51,0.08) 0%, rgba(42,42,42,1) 50%, rgba(184,115,51,0.05) 100%)'
                }}
              >
                {/* 반짝이는 오버레이 효과 */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: index === 0
                      ? 'radial-gradient(circle at 20% 50%, rgba(234,179,8,0.2) 0%, transparent 50%)'
                      : index === 1
                      ? 'radial-gradient(circle at 20% 50%, rgba(156,163,175,0.2) 0%, transparent 50%)'
                      : 'radial-gradient(circle at 20% 50%, rgba(184,115,51,0.2) 0%, transparent 50%)',
                    animation: 'shimmer-move 3s ease-in-out infinite'
                  }}
                />

                {/* 테두리 장식 - 좌상단 */}
                <img
                  src={borderSmallImg.src}
                  alt=""
                  className="absolute top-0 left-0 w-auto h-auto"
                  style={{
                    filter: index === 0
                      ? 'hue-rotate(-80deg) saturate(2) brightness(1.2)' // 금색
                      : index === 1
                      ? 'grayscale(1) brightness(1.3)' // 은색
                      : 'sepia(1) hue-rotate(-30deg) saturate(3) brightness(0.7)' // 동색 (구리색/갈색)
                  }}
                />

                {/* 테두리 장식 - 우하단 */}
                <img
                  src={borderSmallImg.src}
                  alt=""
                  className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                  style={{
                    filter: index === 0
                      ? 'hue-rotate(-80deg) saturate(2) brightness(1.2)' // 금색
                      : index === 1
                      ? 'grayscale(1) brightness(1.3)' // 은색
                      : 'sepia(1) hue-rotate(-30deg) saturate(3) brightness(0.7)' // 동색 (구리색/갈색)
                  }}
                />

                {/* 순위 */}
                <div className="flex items-center justify-between mb-[25px] relative z-10">
                  <div className={`text-4xl relative ${
                    index === 0 ? 'animate-bounce-slow' : ''
                  }`}
                    style={{
                      animation: index === 0 ? 'sparkle 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    {getMedalIcon(index)}
                  </div>
                  <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-full">
                    <span className="text-lg">🔥</span>
                    <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-base">{item.expectationCount}</span>
                  </div>
                </div>
                {/* 활동명 */}
                <h4 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-lg leading-tight line-clamp-2 min-h-[48px] relative z-10">
                  {item.summary}
                </h4>
              </div>
            ))}
          </div>

          {/* 4~5위 */}
          <div className="flex flex-col gap-2" style={{ width: '200px' }}>
            {topFive.slice(3, 5).map((item, index) => (
              <div
                key={item.id}
                className="bg-[#2a2a2a] p-3 hover:bg-[#3a3a3a] transition-all duration-200 cursor-pointer border border-[#21e786]/20 hover:border-[#21e786]/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-base flex-shrink-0">
                    {index + 4}위
                  </span>
                  <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-0.5 rounded-full ml-auto">
                    <span className="text-xs">🔥</span>
                    <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[10px]">{item.expectationCount}</span>
                  </div>
                </div>
                <h4 className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[11px] leading-tight line-clamp-2">
                  {item.summary}
                </h4>
              </div>
            ))}
          </div>
        </div>


            {/* 6~10위 펼치기 */}
            {isExpanded && rankings.length > 5 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {rankings.slice(5, 10).map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#2a2a2a] px-5 py-4 hover:bg-[#3a3a3a] transition-all duration-200 cursor-pointer border border-[#21e786]/20 hover:border-[#21e786]/50"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#21e786]/20 flex-shrink-0">
                        <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#21e786] text-base">
                          {index + 6}위
                        </span>
                      </div>
                      <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-sm truncate">
                        {item.summary}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-4 flex-shrink-0 bg-[#1a1a1a] px-3 py-1.5 rounded-full">
                      <span className="text-base">🔥</span>
                      <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-sm">{item.expectationCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
