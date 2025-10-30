import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useWindowWidth } from "../../../../breakpoints";
import lineImage from "../../../../assets/line.png";
import paginationImage from "../../../../assets/pagenation.png";
import bgImage from "../../../../assets/인정응원BG.png";
import cardMobileBg from "../../../../assets/cardReview - mobile.png";
import cardMy02 from "../../../../assets/cardMy02.png";
import borderSmall from "../../../../assets/border small.png";
import { getAllReviews } from "../../../../lib/services/reviewService";
import { getAllGoals } from "../../../../lib/services/goalService";
import {
  sendRecognitionToReview,
  cancelRecognitionOnReview,
  sendRecognitionToGoal,
  cancelRecognitionOnGoal,
  getUserSentReviewRecognitions,
  getUserSentGoalRecognitions
} from "../../../../lib/services/recognitionService";
import { useAuth } from "../../../../contexts/AuthContext";
import { AlertModal } from "../../../../components/AlertModal";
import { LoginModal } from "../../../../components/LoginModal";

const recognitionCardsDefault = [
  {
    id: 1,
    period: "9월 1주차 리뷰 · 송지영 크루",
    title: "목표 설정 포기",
    description: "개인 일정이 너무 바빠서 목표를 포기합니다 :) 다음주에는 더 열심히 할게요",
    stars: 3,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 2,
    period: "9월 1주차 목표 · 백남수 크루",
    title: "위즈덤 작성하기",
    description: "일주일 뒤에 멋지게 위즈덤을 작성할 내 모습이 벌써 보인다! 이번에는 100자 넘게 써봐야지!",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 3,
    period: "9월 1주차 리뷰 · 김유진 크루",
    title: "위즈덤 작성하기 완료",
    description: "위즈덤을 작성해야하는데 작성하지 못해서 너무 아쉽다 ㅠㅠㅠ 영감이 되었을텐데 ~ ㅠㅠ",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 4,
    period: "9월 1주차 리뷰 · 최한솔 크루",
    title: "아쉬움 없음",
    description: "이번 주 목표를 모두 달성해서 뿌듯해요! 준비한 만큼 결과가 잘 나왔어요! 스스로 성장한게 느껴지네요 ㅎㅎ",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 5,
    period: "9월 1주차 목표 · 이지혁 크루",
    title: "목표 설정 포기",
    description: "너무너무 바쁜 시험기간.. 죄송합니다... 다음주에는 열심히 해서 목표 꼭 달성해 보도록 하겠습니다 !!!",
    stars: 3,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 6,
    period: "9월 1주차 리뷰 · 김유진 크루",
    title: "아쉬움 없음",
    description: "원하는 만큼 활동을 다하고 또 해야할 일들을 폴리오를 채워갔다...! 너무 바빴지만 그래도 너무 뿌듯한 한 주 ~!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 7,
    period: "9월 2주차 리뷰 · 박민지 크루",
    title: "코드 리뷰 완료",
    description: "팀원들과 함께 코드 리뷰를 진행했어요. 많은 것을 배웠습니다!",
    stars: 4,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 8,
    period: "9월 2주차 목표 · 정수현 크루",
    title: "프로젝트 기획",
    description: "새로운 프로젝트 기획을 시작합니다. 기대되네요!",
    stars: 5,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 9,
    period: "9월 2주차 리뷰 · 강동훈 크루",
    title: "버그 수정 완료",
    description: "오래된 버그를 드디어 찾아서 수정했어요. 뿌듯합니다!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 10,
    period: "9월 2주차 목표 · 윤서아 크루",
    title: "디자인 작업",
    description: "UI 디자인 개선 작업을 진행할 예정입니다!",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 11,
    period: "9월 3주차 리뷰 · 임채원 크루",
    title: "테스트 코드 작성",
    description: "단위 테스트를 작성해서 코드 품질을 높였어요!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 12,
    period: "9월 3주차 목표 · 한지우 크루",
    title: "문서화 작업",
    description: "프로젝트 문서화를 체계적으로 정리하겠습니다.",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 13,
    period: "9월 3주차 리뷰 · 오세진 크루",
    title: "성능 최적화",
    description: "앱 로딩 속도를 30% 개선했습니다!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 14,
    period: "9월 3주차 목표 · 신예은 크루",
    title: "새로운 기능 개발",
    description: "사용자들이 요청한 새 기능을 개발하겠습니다!",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 15,
    period: "9월 4주차 리뷰 · 조현우 크루",
    title: "API 연동 완료",
    description: "외부 API 연동을 성공적으로 완료했어요!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 16,
    period: "9월 4주차 목표 · 배수민 크루",
    title: "데이터베이스 설계",
    description: "효율적인 DB 구조를 설계하고 구현하겠습니다.",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 17,
    period: "9월 4주차 리뷰 · 남태형 크루",
    title: "보안 강화",
    description: "보안 취약점을 점검하고 개선했습니다!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 18,
    period: "9월 4주차 목표 · 서지은 크루",
    title: "사용자 피드백 반영",
    description: "사용자 의견을 수렴해서 개선하겠습니다!",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
  {
    id: 19,
    period: "9월 5주차 리뷰 · 김태윤 크루",
    title: "배포 자동화",
    description: "CI/CD 파이프라인을 구축했어요!",
    stars: 5,
    badge: "인정",
    badgeType: "recognize",
  },
  {
    id: 20,
    period: "9월 5주차 목표 · 이하늘 크루",
    title: "리팩토링 작업",
    description: "코드 구조를 개선하고 가독성을 높이겠습니다!",
    stars: 4,
    badge: "응원",
    badgeType: "support",
  },
];

export const RecognitionSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;
  const { user } = useAuth();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [clickedButtons, setClickedButtons] = useState<Record<string, boolean>>({});
  const [recognitionCards, setRecognitionCards] = useState<any[]>([]);
  const [myRecognitions, setMyRecognitions] = useState<{reviews: string[], goals: string[]}>({ reviews: [], goals: [] });
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showCancelToast, setShowCancelToast] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isRecognitionInfoHovered, setIsRecognitionInfoHovered] = useState(false);
  const [isSupportInfoHovered, setIsSupportInfoHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [isRecognitionInfoModalOpen, setIsRecognitionInfoModalOpen] = useState(false);
  const [isSupportInfoModalOpen, setIsSupportInfoModalOpen] = useState(false);
  const [showFifthConfirm, setShowFifthConfirm] = useState(false);
  const [pendingRecognition, setPendingRecognition] = useState<{ card: any, type: 'review' | 'goal' } | null>(null);
  const [isRecognitionLocked, setIsRecognitionLocked] = useState(false);
  const [isSupportLocked, setIsSupportLocked] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardWidth = 300; // Fixed width of card
  const cardGap = 55; // Gap between cards
  const cardWidthWithGap = cardWidth + cardGap; // Total space per card

  // Load reviews and goals from database
  const loadData = useCallback(async () => {
    try {
      // Fetch both reviews and goals in parallel
      const [reviews, goals, myReviewRecognitions, myGoalRecognitions] = await Promise.all([
        getAllReviews(),
        getAllGoals(),
        getUserSentReviewRecognitions(),
        getUserSentGoalRecognitions()
      ]);

      // Create a map of recognized review/goal IDs
      const recognizedReviewIds = myReviewRecognitions.map((r: any) => r.review_id);
      const recognizedGoalIds = myGoalRecognitions.map((r: any) => r.goal_id);

      setMyRecognitions({
        reviews: recognizedReviewIds,
        goals: recognizedGoalIds
      });

      // Transform reviews to card format (badge: "인정") with received count
      const reviewCards = await Promise.all(reviews.map(async (review: any) => {
        const { createClient } = await import('../../../../lib/supabase/client');
        const supabase = createClient();
        const { count } = await supabase
          .from('recognitions_review')
          .select('*', { count: 'exact', head: true })
          .eq('review_id', review.id);

        return {
          id: `review-${review.id}`,
          originalId: review.id,
          user_id: review.user_id,
          period: `10월 5주차 리뷰 · ${review.profiles?.full_name || '크루'}`,
          title: review.activity,
          description: review.review_text,
          stars: review.rating,
          badge: "인정",
          badgeType: "recognize",
          created_at: review.created_at,
          receivedCount: count || 0,
        };
      }));

      // Transform goals to card format (badge: "응원") with received count
      const goalCards = await Promise.all(goals.map(async (goal: any) => {
        const { createClient } = await import('../../../../lib/supabase/client');
        const supabase = createClient();
        const { count } = await supabase
          .from('recognitions_goal')
          .select('*', { count: 'exact', head: true })
          .eq('goal_id', goal.id);

        return {
          id: `goal-${goal.id}`,
          originalId: goal.id,
          user_id: goal.user_id,
          period: `10월 5주차 목표 · ${goal.profiles?.full_name || '크루'}`,
          title: goal.activity,
          description: goal.goal_text,
          stars: goal.rating,
          badge: "응원",
          badgeType: "support",
          created_at: goal.created_at,
          receivedCount: count || 0,
        };
      }));

      // Combine and sort by created_at (most recent first)
      const allCards = [...reviewCards, ...goalCards].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Set initial clicked state for already recognized items
      const initialClickedState: Record<string, boolean> = {};
      recognizedReviewIds.forEach((id: string) => {
        initialClickedState[`review-${id}`] = true;
      });
      recognizedGoalIds.forEach((id: string) => {
        initialClickedState[`goal-${id}`] = true;
      });
      setClickedButtons(initialClickedState);

      // Use real data if available, otherwise use default data
      setRecognitionCards(allCards.length > 0 ? allCards : recognitionCardsDefault);
    } catch (error) {
      console.error('Failed to load data:', error);
      // Fallback to default data on error
      setRecognitionCards(recognitionCardsDefault);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 테스트 모달 이벤트 리스너
  useEffect(() => {
    const handleTestModal = (e: CustomEvent) => {
      const { type, section } = e.detail;
      if (section !== 'recognition') return;

      setPendingRecognition({
        card: recognitionCards[0] || { originalId: 'test', user_id: 'test' },
        type: type === 'review' ? 'review' : 'goal'
      });
      setShowFifthConfirm(true);
    };

    window.addEventListener('testFifthModal', handleTestModal as EventListener);
    return () => window.removeEventListener('testFifthModal', handleTestModal as EventListener);
  }, [recognitionCards]);

  // Auto-refresh every 30 seconds to get new reviews/goals
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      loadData();
      console.log('Auto-refreshing recognition cards data...');
    }, 30000); // 30 seconds

    return () => clearInterval(refreshInterval);
  }, [loadData]);

  const handleConfirmFifth = async () => {
    if (!pendingRecognition) return;

    const { card, type } = pendingRecognition;
    const isReview = type === 'review';

    try {
      // 보내기
      if (isReview) {
        await sendRecognitionToReview(card.originalId, card.user_id);
      } else {
        await sendRecognitionToGoal(card.originalId, card.user_id);
      }

      // 상태 업데이트
      setClickedButtons((prev) => ({
        ...prev,
        [card.id]: true
      }));

      // myRecognitions 업데이트
      if (isReview) {
        setMyRecognitions(prev => ({
          ...prev,
          reviews: [...prev.reviews, card.originalId]
        }));
        setIsRecognitionLocked(true);
      } else {
        setMyRecognitions(prev => ({
          ...prev,
          goals: [...prev.goals, card.originalId]
        }));
        setIsSupportLocked(true);
      }

      setShowFifthConfirm(false);
      setPendingRecognition(null);
    } catch (error: any) {
      setAlertMessage(error?.message || '오류가 발생했습니다.');
      setIsAlertOpen(true);
      setShowFifthConfirm(false);
      setPendingRecognition(null);
    }
  };

  const handleButtonClick = async (card: any) => {
    if (!user) {
      setAlertMessage('로그인이 필요합니다.');
      setIsAlertOpen(true);
      return;
    }

    const isReview = card.id.startsWith('review-');
    const isCurrentlyClicked = clickedButtons[card.id] || false;

    // 취소가 아니라 새로 보내는 경우, 5개 제한 체크
    if (!isCurrentlyClicked) {
      // 현재 클릭된 버튼들 중에서 같은 타입(리뷰 또는 목표)만 카운트
      const clickedOfSameType = Object.keys(clickedButtons).filter(key => {
        const isSameType = isReview ? key.startsWith('review-') : key.startsWith('goal-');
        return isSameType && clickedButtons[key];
      });

      // 이미 잠겼는지 확인
      if (isReview && isRecognitionLocked) {
        setAlertMessage('이미 5명에게 인정을 날렸네요!');
        setIsAlertOpen(true);
        return;
      }
      if (!isReview && isSupportLocked) {
        setAlertMessage('이미 5명에게 응원을 날렸네요!');
        setIsAlertOpen(true);
        return;
      }

      // 5번째를 보내려고 할 때 확인 모달 표시
      if (clickedOfSameType.length === 4) {
        setPendingRecognition({ card, type: isReview ? 'review' : 'goal' });
        setShowFifthConfirm(true);
        return;
      }

      if (clickedOfSameType.length >= 5) {
        setAlertMessage(isReview ? '이미 5명에게 인정을 날렸네요!' : '이미 5명에게 응원을 날렸네요!');
        setIsAlertOpen(true);
        return;
      }
    }

    // UI 즉시 업데이트 (낙관적 업데이트)
    if (isCurrentlyClicked) {
      // 취소 상태로 즉시 업데이트
      setClickedButtons((prev) => ({
        ...prev,
        [card.id]: false
      }));

      if (isReview) {
        setMyRecognitions(prev => ({
          ...prev,
          reviews: prev.reviews.filter(id => id !== card.originalId)
        }));
      } else {
        setMyRecognitions(prev => ({
          ...prev,
          goals: prev.goals.filter(id => id !== card.originalId)
        }));
      }
    } else {
      // 클릭 상태로 즉시 업데이트
      setClickedButtons((prev) => ({
        ...prev,
        [card.id]: true
      }));

      if (isReview) {
        setMyRecognitions(prev => ({
          ...prev,
          reviews: [...prev.reviews, card.originalId]
        }));
      } else {
        setMyRecognitions(prev => ({
          ...prev,
          goals: [...prev.goals, card.originalId]
        }));
      }
    }

    // 백그라운드에서 API 호출
    try {
      if (isCurrentlyClicked) {
        // 취소하기
        if (isReview) {
          await cancelRecognitionOnReview(card.originalId);
        } else {
          await cancelRecognitionOnGoal(card.originalId);
        }

        // Show cancel toast
        setShowCancelToast(true);
        setTimeout(() => {
          setShowCancelToast(false);
        }, 3000);
      } else {
        // 보내기
        if (isReview) {
          await sendRecognitionToReview(card.originalId, card.user_id);
        } else {
          await sendRecognitionToGoal(card.originalId, card.user_id);
        }
      }
    } catch (error: any) {
      // 에러 발생 시 상태 롤백
      setClickedButtons((prev) => ({
        ...prev,
        [card.id]: isCurrentlyClicked
      }));

      if (isReview) {
        setMyRecognitions(prev => ({
          ...prev,
          reviews: isCurrentlyClicked
            ? [...prev.reviews, card.originalId]
            : prev.reviews.filter(id => id !== card.originalId)
        }));
      } else {
        setMyRecognitions(prev => ({
          ...prev,
          goals: isCurrentlyClicked
            ? [...prev.goals, card.originalId]
            : prev.goals.filter(id => id !== card.originalId)
        }));
      }

      console.error('Recognition error details:', {
        error,
        errorMessage: error?.message,
        errorCode: error?.code,
        errorDetails: error?.details,
        cardId: card.id,
        userId: user?.id,
        cardUserId: card.user_id
      });
      setAlertMessage(error?.message || '오류가 발생했습니다.');
      setIsAlertOpen(true);
    }
  };

  const navigateCards = useCallback((direction: 'next' | 'prev') => {
    console.log('Navigate cards:', direction, 'Current index:', currentCardIndex);
    setCurrentCardIndex((prevIndex) => {
      const step = isMobile ? 1 : isTablet ? 3 : 5;
      const newIndex = direction === 'next'
        ? (prevIndex + step >= recognitionCards.length ? 0 : prevIndex + step)
        : Math.max(prevIndex - step, 0);
      console.log('Moving from index', prevIndex, 'to', newIndex, 'Step:', step, 'Total cards:', recognitionCards.length);
      return newIndex;
    });
  }, [isMobile, isTablet, recognitionCards.length, currentCardIndex]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      navigateCards('next');
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [navigateCards]);


  // Mobile: card width = 170px, gap = 24px
  // Total movement per card = 170px + 24px = 194px
  const translateXValue = isMobile
    ? `translateX(-${currentCardIndex * 194}px)`
    : `translateX(-${currentCardIndex * cardWidthWithGap}px)`;

  return (
    <>
    <section className={`flex flex-col items-center w-full bg-[#040b11] relative overflow-hidden ${isMobile ? 'pt-[88px] pb-20' : 'pt-[88px] pb-20'}`}>
      {/* Background image */}
      <div className="absolute z-0 overflow-hidden pointer-events-none" style={{
        top: '-30px',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 'calc(100% + 30px)'
      }}>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          alt="Background"
          src={bgImage.src}
          style={isTablet ? {
            width: '110%',
            height: '110%',
            left: '-5%',
            top: '-5%',
            objectFit: 'cover'
          } : isMobile ? {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          } : undefined}
        />
      </div>

      {/* Timeline line image - full width */}
      {!isMobile && (
        <div className={`absolute left-0 right-0 w-full h-[5px] z-0 pointer-events-none ${isTablet ? 'top-[350px]' : 'top-[348px]'}`}>
          <img
            className="w-full h-full object-cover pointer-events-none"
            alt="Timeline"
            src={lineImage.src}
          />
        </div>
      )}

      {/* Timeline line - horizontal line for mobile */}
      {isMobile && (
        <div className="absolute left-0 right-0 w-full h-[2px] z-0 pointer-events-none" style={{ top: '261px' }}>
          <img
            className="w-full h-full object-cover pointer-events-none"
            alt="Timeline"
            src={lineImage.src}
          />
        </div>
      )}

      {/* Header section with max-width */}
      <div className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} w-full max-w-[1680px] mx-auto relative z-10 ${isMobile ? 'px-5 mb-6' : isTablet ? 'gap-[60px] px-10 mb-[40px]' : 'gap-[50px] px-[120px] mb-[48px]'}`} style={{ pointerEvents: 'auto', gap: isMobile ? '39px' : undefined }}>
        <header className={`flex flex-col ${isMobile ? 'items-start w-full' : 'items-center'}`} style={{ pointerEvents: 'auto', gap: isMobile ? '18px' : isTablet ? '25px' : '15px' }}>
          {isMobile ? (
            <h2 className="[font-family:'Ria'] font-bold text-white text-[20px] text-left font-ria-sans">
              인정과 응원 보내기
            </h2>
          ) : (
            <div className="inline-flex items-center gap-5">
              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-1.svg"
              />
              <h2 className="[font-family:'Ria'] font-bold text-white tracking-[0] leading-[normal] text-[32px] font-ria-sans">
                인정과 응원 보내기
              </h2>
              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-2.svg"
              />
            </div>
          )}

          <div className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} gap-[5px]`}>
            <p className={`[font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface tracking-[-0.60px] ${isMobile ? 'text-sm leading-[21px] text-left' : 'text-[20px] leading-[30px] text-center'}`}>
              '인정'과 '응원'은 각각 5개씩 보낼 수 있습니다 :)
            </p>
            {!isMobile && (
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface text-[20px] text-center tracking-[-0.60px] leading-[30px]">
                동료 크루들에게 아낌 없는 인정과 응원을 보내주세요!
              </p>
            )}
          </div>
        </header>

        {/* Info Boxes */}
        <div className={`relative z-[9999] flex items-center justify-center gap-6 ${isMobile ? '-mt-[14px]' : isTablet ? '-mt-[15px]' : '-mt-[9px]'}`} style={{ pointerEvents: 'auto', isolation: 'isolate' }}>
          {/* 인정이 뭔가요? */}
          <div
            className={`relative inline-flex items-center gap-2 ${isMobile || isTablet ? '' : 'px-4 pt-2 pb-8 cursor-help'}`}
            onMouseEnter={() => !isMobile && !isTablet && setIsRecognitionInfoHovered(true)}
            onMouseLeave={() => !isMobile && !isTablet && setIsRecognitionInfoHovered(false)}
            style={{ pointerEvents: 'auto', zIndex: 2000, position: 'relative' }}
          >
            <button
              type="button"
              className={`font-ria-sans font-medium text-[#767676] text-sm ${isMobile || isTablet ? 'cursor-pointer px-3 py-2 bg-transparent hover:text-white active:text-white' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                console.log('인정이 뭔가요? clicked, isMobile:', isMobile, 'isTablet:', isTablet);
                if (isMobile || isTablet) {
                  setIsRecognitionInfoModalOpen(true);
                }
              }}
              style={{
                touchAction: 'manipulation',
                pointerEvents: 'auto',
                zIndex: 2001,
                position: 'relative'
              }}
            >
              인정이 뭔가요?
            </button>

            {isRecognitionInfoHovered && !isMobile && !isTablet && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 px-4 py-3 bg-[#FFED00]/95 backdrop-blur-md border-2 border-[#1a1a1a] rounded-lg shadow-[0_0_40px_rgba(255,237,0,0.7),0_0_80px_rgba(255,237,0,0.3)] z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200"
                style={{ marginBottom: '10px', minWidth: '400px', maxWidth: '500px' }}
              >
                <p className="font-ria-sans font-medium text-[#1a1a1a] text-sm text-center leading-relaxed">
                  인정은, 내가 인정할만한 아쉬움과 뿌듯함을 통해<br />
                  치열하게 성장하는 분께 드리는, 나의 '박수' 입니다.<br />
                  타인의 도전 과정을 확인하며<br />
                  나의 자양분으로 삼을 수 있는 토양을 만들어봐요!
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#FFED00]"></div>
              </div>
            )}
          </div>

          {/* 응원이 뭔가요? */}
          <div
            className={`relative inline-flex items-center gap-2 ${isMobile || isTablet ? '' : 'px-4 pt-2 pb-8 cursor-help'}`}
            onMouseEnter={() => !isMobile && !isTablet && setIsSupportInfoHovered(true)}
            onMouseLeave={() => !isMobile && !isTablet && setIsSupportInfoHovered(false)}
            style={{ pointerEvents: 'auto', zIndex: 2000, position: 'relative' }}
          >
            <button
              type="button"
              className={`font-ria-sans font-medium text-[#767676] text-sm ${isMobile || isTablet ? 'cursor-pointer px-3 py-2 bg-transparent hover:text-white active:text-white' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                console.log('응원이 뭔가요? clicked, isMobile:', isMobile, 'isTablet:', isTablet);
                if (isMobile || isTablet) {
                  setIsSupportInfoModalOpen(true);
                }
              }}
              style={{
                touchAction: 'manipulation',
                pointerEvents: 'auto',
                zIndex: 2001,
                position: 'relative'
              }}
            >
              응원이 뭔가요?
            </button>

            {isSupportInfoHovered && !isMobile && !isTablet && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 px-4 py-3 bg-[#FFED00]/95 backdrop-blur-md border-2 border-[#1a1a1a] rounded-lg shadow-[0_0_40px_rgba(255,237,0,0.7),0_0_80px_rgba(255,237,0,0.3)] z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200"
                style={{ marginBottom: '10px', minWidth: '400px', maxWidth: '500px' }}
              >
                <p className="font-ria-sans font-medium text-[#1a1a1a] text-sm text-center leading-relaxed">
                  응원은, 나와 함께 같이 성장하는<br />
                  우리 선배/후배/동료 크루분들의 '목표'에 보내는,<br />
                  나의 '사랑'입니다. 모두의 목표들을 확인하며 그 안에서<br />
                  나도 같이 커갈 수 있는 긍정적인 자극으로 활용하자구요!
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#FFED00]"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline with cards - full width without padding */}
      <div className={`relative w-full z-[1] overflow-hidden ${isMobile ? '-mt-[127px]' : isTablet ? '-mt-[68px]' : '-mt-[84px]'}`} style={{ pointerEvents: 'none' }}>
          {/* Cards container with horizontal scroll */}
          <div
            ref={sliderRef}
            className={`relative ${isMobile ? 'w-full overflow-x-hidden overflow-y-visible px-0' : isTablet ? 'w-[1010px] overflow-visible mx-auto' : 'w-[1720px] overflow-hidden mx-auto'}`}
            style={isMobile ? { paddingTop: '130px', pointerEvents: 'auto' } : { pointerEvents: 'auto' }}
          >
            <div
              className={`inline-flex flex-row transition-transform duration-4000 ease-in-out ${isMobile ? 'gap-6' : 'gap-[55px]'}`}
              style={{
                transform: translateXValue,
                paddingLeft: isMobile ? 'calc((100vw - 170px) / 2)' : undefined
              }}
            >
              {recognitionCards.map((card, index) => (
                <div key={card.id} className={`relative flex flex-col items-center flex-shrink-0 ${isMobile ? 'w-[170px] -mt-[15px]' : 'w-[300px]'}`}>
                  {/* Timeline dot and dashed line */}
                  <div className={`relative w-full flex flex-col items-center ${isMobile ? 'h-[70px]' : 'h-[201px]'}`}>
                    {/* Timeline dot with outer and inner circles */}
                    <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#21e786] opacity-20 z-30 flex items-center justify-center ${isMobile ? 'top-[15px] w-[35px] h-[35px]' : 'top-[45px] w-[60px] h-[60px]'}`} />
                    <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#21e786] z-40 ${isMobile ? 'top-[24px] w-[17px] h-[17px]' : 'top-[60px] w-[30px] h-[30px]'}`} />
                    {/* Dashed vertical line */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-white opacity-70 z-[15] ${isMobile ? 'top-[41px] h-[44px]' : 'top-[75px] h-[126px]'}`} />
                  </div>

                  {/* Bottom Card Section */}
                  <div className={`relative rounded-lg transition-all duration-300 z-[25] ${isMobile ? 'w-[170px] h-[185px] bg-[#141B22]' : 'group w-[300px] h-[229px] p-6 bg-[#141B22] border-2 border-transparent'}`}>
                    {/* Border decorations - visible on hover (desktop/tablet only) */}
                    {!isMobile && (
                      <>
                        <img
                          src={borderSmall.src}
                          alt=""
                          className="absolute top-0 left-0 w-auto h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <img
                          src={borderSmall.src}
                          alt=""
                          className="absolute bottom-0 right-0 w-auto h-auto rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </>
                    )}

                    <div className={`flex flex-col ${isMobile ? 'w-full h-full relative z-10 p-4' : 'gap-3'}`}>
                      {/* Period - Mobile shows at top, Desktop shows at top */}
                      {isMobile ? (
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#888888] text-left text-[12px] leading-[14px] mb-1.5">
                          {card.period.split('·')[0]?.trim() || card.period}
                        </p>
                      ) : (
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#cccccc] text-left tracking-[-0.36px] text-[16px] leading-[18px]">
                          {card.period}
                        </p>
                      )}

                      {/* Title with icon */}
                      {isMobile ? (
                        <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-left text-[15px] leading-[18px] mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                          {card.title}
                        </h3>
                      ) : (
                        <div className="flex items-start justify-start gap-2">
                          <img
                            className="mt-0.5 flex-shrink-0 w-6 h-6"
                            alt="Logo"
                            src="https://c.animaapp.com/O1XpzcZm/img/logo-1.svg"
                          />
                          <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-left tracking-[-0.48px] text-[24px] leading-[26px]">
                            {card.title}
                          </h3>
                        </div>
                      )}

                      {/* Description */}
                      {isMobile ? (
                        <p
                          className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-left text-[12px] leading-[16px] mb-1.5 overflow-hidden cursor-pointer transition-all duration-200 hover:text-[#21e786] hover:scale-[1.02]"
                          onClick={() => setSelectedCard(card)}
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {card.description}
                        </p>
                      ) : (
                        <div className="flex items-start justify-start min-h-[60px]">
                          <p
                            className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white tracking-[-0.42px] text-left overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] text-[16px] leading-[21px] cursor-pointer transition-all duration-200 hover:text-[#21e786] hover:scale-[1.02]"
                            onClick={() => setSelectedCard(card)}
                          >
                            {card.description}
                          </p>
                        </div>
                      )}

                      {/* Stars */}
                      {isMobile ? (
                        <div className="flex items-center justify-start gap-0.5 mb-auto">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-[13px] ${i < card.stars ? 'text-white' : 'text-[#666666]'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {/* Bottom row - Badge button */}
                      {isMobile ? (
                        <div className="flex items-center justify-between mt-2">
                          <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#888888] text-[10px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">
                            {card.period.split('·')[1]?.trim() || ''}
                          </p>
                          <div className="relative group flex items-center gap-1.5">
                            {user?.id === card.user_id ? (
                              // 본인 카드: "나의 카드" 텍스트만 표시
                              <div className="flex items-center justify-center cursor-not-allowed w-[40px] h-[40px]">
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 42 42"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="1"
                                    y="1"
                                    width="40"
                                    height="40"
                                    rx="20"
                                    fill="#000000"
                                  />
                                  <rect
                                    x="1"
                                    y="1"
                                    width="40"
                                    height="40"
                                    rx="20"
                                    stroke="#FFFFFF"
                                    strokeOpacity="0.5"
                                    strokeWidth="1.5"
                                  />
                                  <text
                                    x="21"
                                    y="18"
                                    textAnchor="middle"
                                    fill="#FFFFFF"
                                    fontSize="10"
                                    fontWeight="bold"
                                    fontFamily="Pretendard"
                                  >
                                    나의
                                  </text>
                                  <text
                                    x="21"
                                    y="30"
                                    textAnchor="middle"
                                    fill="#FFFFFF"
                                    fontSize="10"
                                    fontWeight="bold"
                                    fontFamily="Pretendard"
                                  >
                                    카드
                                  </text>
                                </svg>
                              </div>
                            ) : (
                              <>
                                <span className="font-ria-sans font-bold whitespace-nowrap text-[11px]">
                                  <span className="text-white">{card.receivedCount || 0}</span>
                                  <span className="text-[#AAAAAA]">/5</span>
                                </span>
                                <button
                                  onClick={() => handleButtonClick(card)}
                                  disabled={card.receivedCount >= 5}
                                  className={`rounded-full flex items-center justify-center font-normal transition-all duration-150 ease-in-out font-ria-sans w-[40px] h-[40px] text-[11px] ${
                                    card.receivedCount >= 5
                                      ? 'bg-[#2a2a2a] text-[#666666] border border-[#666666]/30 cursor-not-allowed opacity-50'
                                      : clickedButtons[card.id]
                                      ? 'bg-[#FFF802] text-[#040B11] scale-105 cursor-pointer active:scale-95'
                                      : 'bg-[#040B11] text-white border border-white/30 scale-100 cursor-pointer active:scale-95'
                                  }`}
                                  style={
                                    card.receivedCount >= 5
                                      ? { transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }
                                      : clickedButtons[card.id]
                                      ? {
                                          boxShadow: '0 4px 20px rgba(255, 248, 2, 0.5)',
                                          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }
                                      : {
                                          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }
                                  }
                                >
                                  {card.badge}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between -mt-2">
                          <div className={`flex items-center gap-0.5 ${user?.id === card.user_id ? 'translate-y-[5px]' : '-translate-y-[5px]'}`}>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-2xl leading-none ${i < card.stars ? 'text-white' : 'text-[#666666]'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <div className="relative group flex items-center gap-[10px]">
                            {user?.id === card.user_id ? (
                              // 본인 카드: "나의 카드" 버튼 표시
                              <div
                                className="rounded-full flex items-center justify-center cursor-not-allowed font-ria-sans font-bold text-[14px] text-white w-[100px] h-[40px] border translate-y-[12px]"
                                style={{
                                  backgroundColor: '#1a1a1a',
                                  borderColor: 'rgba(170, 170, 170, 0.7)'
                                }}
                              >
                                나의 카드
                              </div>
                            ) : (
                              <>
                                <span className="font-ria-sans font-bold whitespace-nowrap text-[16px] leading-none flex items-center">
                                  <span className="text-white">{card.receivedCount || 0}</span>
                                  <span className="text-[#AAAAAA]">/5</span>
                                </span>
                                <button
                                  onClick={() => handleButtonClick(card)}
                                  disabled={card.receivedCount >= 5}
                                  className={`rounded-full flex items-center justify-center font-normal transition-all duration-150 ease-in-out font-ria-sans w-14 h-14 text-[16px] ${
                                    card.receivedCount >= 5
                                      ? 'bg-[#2a2a2a] text-[#666666] border-2 border-[#666666]/30 cursor-not-allowed opacity-50'
                                      : clickedButtons[card.id]
                                      ? 'bg-[#FFF802] text-[#040B11] scale-105 cursor-pointer hover:scale-[1.08] hover:brightness-110 active:scale-95'
                                      : 'bg-[#040B11] text-white border-2 border-white border-opacity-30 scale-100 cursor-pointer hover:scale-[1.08] hover:brightness-110 active:scale-95'
                                  }`}
                                  style={
                                    card.receivedCount >= 5
                                      ? { transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }
                                      : clickedButtons[card.id]
                                      ? {
                                          boxShadow: '0 4px 20px rgba(255, 248, 2, 0.5)',
                                          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }
                                      : {
                                          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }
                                  }
                                >
                                  {card.badge}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* Navigation buttons */}
      <div className="w-full max-w-[1680px] mx-auto relative z-20">
        <div className="flex items-center justify-center mt-8">
          <div className={`relative ${isMobile ? 'scale-[0.8]' : ''}`}>
            <img
              className="w-auto h-auto pointer-events-none"
              alt="Pagination"
              src={paginationImage.src}
            />
            <button
              onClick={() => {
                console.log('Prev button clicked!');
                navigateCards('prev');
              }}
              disabled={currentCardIndex === 0}
              className="absolute left-0 top-0 w-[48px] h-[48px] transition-all disabled:cursor-not-allowed disabled:opacity-30 z-10"
              aria-label="Previous cards"
            />
            <button
              onClick={() => {
                console.log('Next button clicked!');
                navigateCards('next');
              }}
              disabled={currentCardIndex >= recognitionCards.length - (isMobile ? 1 : isTablet ? 3 : 5)}
              className="absolute right-0 top-0 w-[48px] h-[48px] transition-all disabled:cursor-not-allowed disabled:opacity-30 z-10"
              aria-label="Next cards"
            />
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => {
          setIsAlertOpen(false);
          if (alertMessage === '로그인이 필요합니다.') {
            setIsLoginModalOpen(true);
          }
        }}
        message={alertMessage}
        type={alertMessage === '로그인이 필요합니다.' ? 'info' : 'recognition'}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Card Detail Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative bg-[#1a1a1a] border-2 border-[#21e786] rounded-2xl w-full mx-4 shadow-[0_0_30px_rgba(33,231,134,0.3)]"
            style={{ padding: 'clamp(20px, 5vw, 32px)', maxWidth: 'min(90%, 600px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-white hover:text-[#21e786] transition-colors text-2xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Content */}
            <div className="flex flex-col gap-4">
              {/* Period */}
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#cccccc] text-left" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                {selectedCard.period}
              </p>

              {/* Title with icon */}
              <div className="flex items-start justify-start gap-2">
                <img
                  className="mt-0.5 flex-shrink-0 w-6 h-6"
                  alt="Logo"
                  src="https://c.animaapp.com/O1XpzcZm/img/logo-1.svg"
                />
                <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-left" style={{ fontSize: 'clamp(20px, 5vw, 24px)', lineHeight: '1.2' }}>
                  {selectedCard.title}
                </h3>
              </div>

              {/* Description - Full text */}
              <div className="bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg" style={{ padding: 'clamp(16px, 4vw, 20px)' }}>
                <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-left whitespace-pre-wrap" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: '1.6' }}>
                  {selectedCard.description}
                </p>
              </div>

              {/* Stars */}
              <div className="flex items-center justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${i < selectedCard.stars ? 'text-white' : 'text-[#666666]'}`}
                    style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

    {/* 5번째 확인 모달 */}
    {showFifthConfirm && pendingRecognition && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
        onClick={() => {
          setShowFifthConfirm(false);
          setPendingRecognition(null);
        }}
      >
        <div
          className="relative bg-[#1a1a1a] border-2 border-[#FFED00] shadow-[0_0_30px_rgba(255,237,0,0.3)] rounded-2xl w-full mx-4"
          style={{ padding: 'clamp(20px, 5vw, 32px)', maxWidth: 'min(90%, 448px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => {
              setShowFifthConfirm(false);
              setPendingRecognition(null);
            }}
            className="absolute top-4 right-4 text-white hover:text-[#FFED00] transition-colors text-2xl"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Message */}
          <div className="flex flex-col items-center mt-2" style={{ gap: 'clamp(16px, 4vw, 24px)' }}>
            <p className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-center mb-3" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
              이제 마지막 {pendingRecognition.type === 'review' ? '인정' : '응원'}이에요!
            </p>
            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-center leading-relaxed" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
              전송하시면 {pendingRecognition.type === 'review' ? '인정' : '응원'} 보내기 미션 완료!<br />
              단, 확인을 누르면 수정이나 추가 전송은 불가해요.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowFifthConfirm(false);
                  setPendingRecognition(null);
                }}
                className="flex-1 font-semibold rounded-full [font-family:'Ria'] font-ria-sans transition-all bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-white/30"
                style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 24px)', fontSize: 'clamp(14px, 3.5vw, 16px)' }}
              >
                잠깐만!
              </button>
              <button
                onClick={handleConfirmFifth}
                className="flex-1 font-semibold rounded-full [font-family:'Ria'] font-ria-sans transition-all bg-[#FFED00] hover:bg-[#FFE500] text-[#040B11]"
                style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 24px)', fontSize: 'clamp(14px, 3.5vw, 16px)' }}
              >
                {pendingRecognition.type === 'review' ? '인정 보내기 👍' : '응원 보내기 💪'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* 인정이 뭔가요? 모달 */}
    {isRecognitionInfoModalOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
        onClick={() => setIsRecognitionInfoModalOpen(false)}
      >
        <div
          className="relative bg-[#FFED00]/95 backdrop-blur-md border-2 border-[#1a1a1a] rounded-lg shadow-[0_0_40px_rgba(255,237,0,0.7),0_0_80px_rgba(255,237,0,0.3)] w-full mx-4"
          style={{ padding: 'clamp(20px, 5vw, 32px)', maxWidth: 'min(90%, 500px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsRecognitionInfoModalOpen(false)}
            className="absolute top-4 right-4 text-[#1a1a1a] hover:text-[#040b11] transition-colors text-2xl"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Content */}
          <p className="font-ria-sans font-medium text-[#1a1a1a] text-center leading-relaxed" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
            인정은, 내가 인정할 만한<br />
            아쉬움과 뿌듯함을 통해<br />
            치열하게 성장하는 분께 드리는,<br />
            나의 '박수' 입니다.<br />
            타인의 도전 과정을 확인하며<br />
            나의 자양분으로 삼을 수 있는<br />
            토양을 만들어봐요!
          </p>
        </div>
      </div>
    )}

    {/* 응원이 뭔가요? 모달 */}
    {isSupportInfoModalOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
        onClick={() => setIsSupportInfoModalOpen(false)}
      >
        <div
          className="relative bg-[#FFED00]/95 backdrop-blur-md border-2 border-[#1a1a1a] rounded-lg shadow-[0_0_40px_rgba(255,237,0,0.7),0_0_80px_rgba(255,237,0,0.3)] w-full mx-4"
          style={{ padding: 'clamp(20px, 5vw, 32px)', maxWidth: 'min(90%, 500px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsSupportInfoModalOpen(false)}
            className="absolute top-4 right-4 text-[#1a1a1a] hover:text-[#040b11] transition-colors text-2xl"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Content */}
          <p className="font-ria-sans font-medium text-[#1a1a1a] text-center leading-relaxed" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
            응원은 나와 함께 같이 성장하는<br />
            우리 선배/후배/동료 크루분들의<br />
            '목표'에 보내는, 나의 '사랑'입니다.<br />
            모두의 목표들을 확인하며<br />
            그 안에서 나도 같이 커갈 수 있는<br />
            긍정적인 자극으로 활용하자구요!
          </p>
        </div>
      </div>
    )}

    {/* 취소 완료 토스트 - Portal로 body에 렌더링 */}
    {typeof window !== 'undefined' && showCancelToast && createPortal(
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-[#21e786] text-[#040b11] rounded-full shadow-lg animate-toast" style={{ padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)' }}>
        <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold whitespace-nowrap" style={{ fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
          ✓ 표현 취소가 완료되었습니다
        </span>
      </div>,
      document.body
    )}
    </>
  );
};
