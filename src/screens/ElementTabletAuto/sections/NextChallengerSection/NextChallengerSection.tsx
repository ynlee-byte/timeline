import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";
import badgeImage from "../../../../assets/body.png";
import decoImage from "../../../../assets/deco.png";
import paginationImage from "../../../../assets/pagenation.png";
import buttonApplause from "../../../../icons/buttonApplause.png";
import buttonApplauseChecked from "../../../../icons/buttonApplauseChecked.png";
import newBgImage from "../../../../assets/new -bg.png";
import newBg02Image from "../../../../assets/new -bg02.png";
import newBtnImage from "../../../../assets/new -btn -ss -d.png";
import newBtnFaImage from "../../../../assets/new -btn -fa -d.png";
import crownIcon from "../../../../icons/bgSub.png";
import cloudIcon from "../../../../icons/cloud01.png";
import cloudBigIcon from "../../../../icons/cloudbig.png";
import cloudBigIcon2 from "../../../../icons/cloudbig2.png";
import iconWrapper from "../../../../icons/iconWrapper.png";
import iconWrapperActive from "../../../../icons/icon.png";
import { AlertModal } from "../../../../components/AlertModal";
import { LoginModal } from "../../../../components/LoginModal";
import { sendApplause, cancelApplause, getUserSentApplause } from "../../../../lib/services/applauseService";
import { getNextChallengerCards, NextChallengerCard } from "../../../../lib/services/nextChallengerService";
import { createClient } from "../../../../lib/supabase/client";

const challengerCards = [
  {
    id: 1,
    userId: "00000000-0000-0000-0000-000000000001", // 더미 UUID
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "위즈덤 활동 피드백 제공하기",
    crewName: "강나래 크루",
    description:
      "저번주는 너무 바빠서 피드백을 2개밖에 남기지 못했다 ㅠㅠㅠㅠ 목표를 달성하지 못했으면 자기전에 한개씩이라도 하고 자기!!! 나와의 약속",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-5.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 2,
    userId: "00000000-0000-0000-0000-000000000002",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-19@2x.png",
    title: "콘텐츠 리서치 결과 정리",
    crewName: "이예린 크루",
    description:
      "자료는 모았지만 시각화 과정이 오래 걸려서 제출이 늦었습니다. 다음엔 일정을 더 넉넉히 잡고 완성도 있게 공유할게요.",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-6.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 3,
    userId: "00000000-0000-0000-0000-000000000003",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-21@2x.png",
    title: "에세이 마감 제출",
    crewName: "김도연 크루",
    description:
      "내용은 마음에 들었지만 문체를 다듬는 데 시간이 부족했어요. 아쉽지만 다음엔 더 깊이 있는 문장으로 완성하겠습니다.",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-7.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
  {
    id: 4,
    userId: "00000000-0000-0000-0000-000000000004",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "코딩테스트 문제 풀이 제출",
    crewName: "박서준 크루",
    description:
      "알고리즘 문제를 풀다가 시간이 부족해서 2문제만 풀었어요. 다음주에는 더 많은 문제를 풀어보겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-5.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 5,
    userId: "00000000-0000-0000-0000-000000000005",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-19@2x.png",
    title: "영어 공부 2시간 목표",
    crewName: "최유진 크루",
    description:
      "이번주는 업무가 많아서 1시간밖에 공부하지 못했어요. 다음주에는 꼭 2시간씩 공부하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-6.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 6,
    userId: "00000000-0000-0000-0000-000000000006",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-21@2x.png",
    title: "운동 3회 이상 하기",
    crewName: "정하늘 크루",
    description:
      "목표는 3회였지만 2회만 운동했어요. 건강을 위해 다음주에는 꼭 3회 이상 운동하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-7.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
  {
    id: 7,
    userId: "00000000-0000-0000-0000-000000000007",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "독서 목표 미달성",
    crewName: "김서현 크루",
    description:
      "이번주는 책을 1권만 읽었어요. 다음주에는 목표한 3권을 꼭 완독하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-5.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 8,
    userId: "00000000-0000-0000-0000-000000000008",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-19@2x.png",
    title: "블로그 포스팅",
    crewName: "박지우 크루",
    description:
      "포스팅할 내용은 준비했지만 작성을 완료하지 못했어요. 다음주에는 꼭 업로드하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-6.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 9,
    userId: "00000000-0000-0000-0000-000000000009",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-21@2x.png",
    title: "사이드 프로젝트 진행",
    crewName: "이준호 크루",
    description:
      "시간이 부족해서 프로젝트를 시작하지 못했어요. 다음주에는 계획을 세워서 시작하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-7.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
  {
    id: 10,
    userId: "00000000-0000-0000-0000-000000000010",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "영어 회화 연습",
    crewName: "최민서 크루",
    description:
      "회화 연습 시간을 충분히 확보하지 못했어요. 다음주에는 매일 30분씩 연습하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-5.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 11,
    userId: "00000000-0000-0000-0000-000000000011",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-19@2x.png",
    title: "포트폴리오 업데이트",
    crewName: "강다은 크루",
    description:
      "새로운 프로젝트를 포트폴리오에 추가하려 했지만 완성도가 부족해서 보류했어요. 다음주에 완성하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-6.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 12,
    userId: "00000000-0000-0000-0000-000000000012",
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-21@2x.png",
    title: "네트워킹 이벤트 참석",
    crewName: "윤태준 크루",
    description:
      "일정이 겹쳐서 이벤트에 참석하지 못했어요. 다음 기회에는 꼭 참여하겠습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-7.svg",
    bgSubImage: "https://c.animaapp.com/O1XpzcZm/img/bgsub-17@2x.png",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
];

const decorativeSquares = [
  {
    width: "w-[8.23px]",
    height: "h-[7.42px]",
    marginTop: "mt-[60.3px]",
    marginLeft: "ml-[1.1px]",
    rotation: "rotate-[-22.75deg]",
  },
  {
    width: "w-[12.39px]",
    height: "h-[11.17px]",
    marginTop: "mt-[53.4px]",
    marginLeft: "ml-[3.9px]",
    rotation: "rotate-[15.00deg]",
  },
  {
    width: "w-[13.9px]",
    height: "h-[13.9px]",
    marginTop: "mt-[1.6px]",
    marginLeft: "ml-[213.9px]",
    rotation: "rotate-[15.00deg]",
  },
  {
    width: "w-[9.07px]",
    height: "h-[9.07px]",
    marginTop: "mt-[9.7px]",
    marginLeft: "ml-[3.2px]",
    rotation: "rotate-[-30.53deg]",
  },
  {
    width: "w-[5.91px]",
    height: "h-[6.47px]",
    marginTop: "mt-[50.1px]",
    marginLeft: "ml-[91.5px]",
    rotation: "rotate-[-30.53deg]",
  },
];

export const NextChallengerSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;

  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [applauseClicks, setApplauseClicks] = useState<Record<string, number>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showCancelToast, setShowCancelToast] = useState(false);
  const [challengerCards, setChallengerCards] = useState<NextChallengerCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [showFifthConfirm, setShowFifthConfirm] = useState(false);
  const [isApplauseLocked, setIsApplauseLocked] = useState(false);
  const [pendingApplause, setPendingApplause] = useState<{ judgmentId: string; toUserId: string } | null>(null);
  const [user, setUser] = useState<any>(null);

  const cardsPerPage = isMobile ? 4 : isTablet ? 4 : 6;
  const totalPages = Math.max(1, Math.ceil(challengerCards.length / cardsPerPage));

  const currentCards = challengerCards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  // Load Next Challenger cards and user's sent applause on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Get current user
        const supabase = createClient();
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        // DB에서 실제 데이터 로드
        const cards = await getNextChallengerCards();
        setChallengerCards(cards);

        // 박수 데이터 로드
        const sentApplause = await getUserSentApplause();
        const clicks: Record<string, number> = {};
        sentApplause.forEach((applause: any) => {
          clicks[applause.judgment_id] = 1;
        });
        setApplauseClicks(clicks);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();

    // 테스트 모달 이벤트 리스너
    const handleTestModal = (e: CustomEvent) => {
      const { type, section } = e.detail;
      if (section !== 'challenger') return;

      setPendingApplause({
        judgmentId: challengerCards[0]?.judgment_id || 'test',
        toUserId: challengerCards[0]?.userId || 'test'
      });
      setShowFifthConfirm(true);
    };

    // 판정 업데이트 이벤트 리스너
    const handleJudgmentUpdate = () => {
      console.log('Judgment updated! Refreshing next challenger cards...');
      loadData();
    };

    window.addEventListener('judgmentUpdated', handleJudgmentUpdate);
    window.addEventListener('testFifthModal', handleTestModal as EventListener);
    return () => {
      window.removeEventListener('judgmentUpdated', handleJudgmentUpdate);
      window.removeEventListener('testFifthModal', handleTestModal as EventListener);
    };
  }, [challengerCards]);

  const handleApplauseClick = async (judgmentId: string, toUserId: string, currentCount: number) => {
    // 로그인 체크
    if (!user) {
      setAlertModal({
        isOpen: true,
        message: '로그인이 필요합니다.',
      });
      return;
    }

    // 5개 이상이면 클릭 불가
    if (currentCount >= 5) {
      setAlertModal({
        isOpen: true,
        message: '이미 최대 5개의 표현을 받았습니다.',
      });
      return;
    }

    const isCurrentlyClicked = (applauseClicks[judgmentId] || 0) > 0;

    // Count how many applause the user has sent
    const userSentCount = Object.values(applauseClicks).filter(v => v > 0).length;

    // If locked and trying to send a new applause, prevent it
    if (isApplauseLocked && !isCurrentlyClicked) {
      setAlertModal({
        isOpen: true,
        message: '더이상 표현을 보낼 수 없습니다.',
      });
      return;
    }

    // If about to send 5th applause, show confirmation
    if (userSentCount === 4 && !isCurrentlyClicked) {
      setPendingApplause({ judgmentId, toUserId });
      setShowFifthConfirm(true);
      return;
    }

    try {
      if (isCurrentlyClicked) {
        // Cancel applause
        await cancelApplause(judgmentId);
        setApplauseClicks((prev) => ({ ...prev, [judgmentId]: 0 }));

        // Reload data to update count
        const cards = await getNextChallengerCards();
        setChallengerCards(cards);

        // Show cancel toast
        setShowCancelToast(true);
        setTimeout(() => {
          setShowCancelToast(false);
        }, 3000);
      } else {
        // Send applause
        await sendApplause(judgmentId, toUserId);
        setApplauseClicks((prev) => ({ ...prev, [judgmentId]: 1 }));

        // Update local count immediately
        setChallengerCards((prevData) =>
          prevData.map((card) =>
            card.judgment_id === judgmentId
              ? { ...card, receivedRecognitionsCount: (card.receivedRecognitionsCount || 0) + 1 }
              : card
          )
        );
      }
    } catch (error: any) {
      // Show error modal
      setAlertModal({
        isOpen: true,
        message: error.message || '오류가 발생했습니다.',
      });
    }
  };

  const handleConfirmFifthApplause = async () => {
    if (!pendingApplause) return;

    try {
      // Send the 5th applause
      await sendApplause(pendingApplause.judgmentId, pendingApplause.toUserId);
      setApplauseClicks((prev) => ({ ...prev, [pendingApplause.judgmentId]: 1 }));

      // Update local count immediately
      setChallengerCards((prevData) =>
        prevData.map((card) =>
          card.judgment_id === pendingApplause.judgmentId
            ? { ...card, receivedRecognitionsCount: (card.receivedRecognitionsCount || 0) + 1 }
            : card
        )
      );

      // Lock further applause
      setIsApplauseLocked(true);
      setShowFifthConfirm(false);
      setPendingApplause(null);
    } catch (error: any) {
      setAlertModal({
        isOpen: true,
        message: error.message || '오류가 발생했습니다.',
      });
      setShowFifthConfirm(false);
      setPendingApplause(null);
    }
  };

  const handlePrevPage = () => {
    if (isTransitioning || currentPage === 0) return;
    setSlideDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(0, prev - 1));
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 50);
    }, 400);
  };

  const handleNextPage = useCallback(() => {
    if (isTransitioning) return;
    setSlideDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => {
        // Loop back to the beginning if at the end
        return prev === totalPages - 1 ? 0 : Math.min(totalPages - 1, prev + 1);
      });
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 50);
    }, 400);
  }, [isTransitioning, totalPages]);

  // Auto-slide every 5 seconds (pause when hovering)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNextPage();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [handleNextPage, isPaused]);

  return (
    <>
    <section className={`flex flex-col items-start ${isMobile ? 'py-10 min-h-[600px]' : isTablet ? 'px-10 py-16 min-h-[900px]' : 'px-[120px] py-[150px] min-h-[1100px]'} w-full bg-[#040b11]`}>
      <div className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} py-0 w-full bg-[#040b11] max-w-[1680px] mx-auto ${isMobile ? 'mb-4' : 'mb-[33px]'} ${isTablet ? 'relative z-10' : ''}`}>
        <header className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} gap-2.5 w-full relative`}>
          {/* 좌측 장식 이미지 */}
          {!isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-[calc(50%+50px)] opacity-60 z-20">
              <img
                className="w-auto h-auto"
                alt="Decoration"
                src={decoImage.src}
              />
            </div>
          )}

          {/* 우측 장식 이미지 */}
          {!isMobile && (
            <div className="absolute right-0 top-1/2 -translate-y-[calc(50%+50px)] opacity-60 z-20">
              <img
                className="w-auto h-auto"
                alt="Decoration"
                src={decoImage.src}
              />
            </div>
          )}

          {isMobile ? (
            <div className="relative z-10 flex flex-col items-start py-4" style={{ paddingLeft: '20px', gap: '10px' }}>
              <h2 className="[font-family:'Ria'] font-bold tracking-[-0.96px] bg-[linear-gradient(90deg,#6D24C8_0%,#E52B50_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-ria-sans" style={{ fontSize: 'clamp(16px, 4vw, 24px)' }}>
                Next Challenger
              </h2>
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-left tracking-[-0.60px]" style={{ fontSize: 'clamp(12px, 3vw, 16px)', lineHeight: 'clamp(18px, 4.5vw, 24px)' }}>
                아쉽지만 이번주에는 목표 달성에 실패한 크루들이에요.
                <br />
                실패는 성공의 어머니!
                <br />
                다음번엔 더 잘할 수 있도록 5명에게 박수를 보내주세요!
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center py-4" style={{ gap: '14px' }}>
              <div className="flex items-center gap-5">
                <img
                  className="flex-shrink-0 w-6 h-6"
                  alt="Logo"
                  src="https://c.animaapp.com/O1XpzcZm/img/logo-3.svg"
                />
                <h2 className="[font-family:'Ria']  font-bold tracking-[-0.96px] bg-[linear-gradient(90deg,#6D24C8_0%,#E52B50_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-ria-sans whitespace-nowrap text-[32px] leading-[44px]">
                  Next Challenger
                </h2>
                <img
                  className="flex-shrink-0 w-6 h-6"
                  alt="Logo"
                  src="https://c.animaapp.com/O1XpzcZm/img/logo-4.svg"
                />
              </div>

              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-center tracking-[-0.60px] max-w-3xl px-4 text-[20px] leading-[32px]">
                  아쉽지만 이번주에는 목표 달성에 실패한 크루들이에요.
                  <br />
                  실패는 성공의 어머니! 다음번엔 더 잘할 수 있도록 5명에게 박수를 보내주세요!
              </p>
            </div>
          )}
        </header>
      </div>

      <div className={`py-0 flex flex-col items-start w-full relative ${isMobile ? 'gap-6 px-5' : 'gap-[50px]'}`}>
        {/* Main content wrapper with max-width for centering */}
        <div className={`${!isMobile && !isTablet ? 'max-w-[1680px] mx-auto w-full relative' : 'w-full relative'}`}>
          {/* Tablet center illustration - overlapping with cards */}
          {!isMobile && isTablet && (
            <div className="absolute left-1/2 -translate-x-1/2 -top-[70px] z-0">
              <img
                className="w-auto h-auto max-w-[500px]"
                alt="Next Challenger illustration"
                src="https://c.animaapp.com/O1XpzcZm/img/image-4@2x.png"
              />
            </div>
          )}
          {/* Right side illustration - only on desktop */}
          {!isMobile && !isTablet && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <img
                className="w-[915px] h-[877px]"
                alt="Next Challenger illustration"
                src="https://c.animaapp.com/O1XpzcZm/img/image-4@2x.png"
              />
            </div>
          )}

          <div
            className={`grid ${isMobile || isTablet ? 'grid-cols-1' : 'grid-cols-2'} ${isMobile ? 'w-full items-center justify-items-center' : 'gap-[30px]'} ${isTablet ? 'w-[480px] mx-auto mt-[250px]' : !isMobile ? 'w-[1000px]' : ''} relative z-10 transition-all duration-500 ease-out ${
            isTransitioning
              ? slideDirection === 'left'
                ? 'opacity-0 -translate-x-20'
                : 'opacity-0 translate-x-20'
              : 'opacity-100 translate-x-0'
          }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
          {currentCards.map((card) => (
            <article key={card.id} className={`relative w-full ${isMobile ? 'mb-[30px] flex justify-center' : ''}`}>
              {isMobile ? (
                <div className="relative p-[1px] rounded-md bg-gradient-to-r from-[#6D24C8] to-[#E52B50]" style={{ width: '100%', maxWidth: '380px', height: 'clamp(87px, 23vw, 120px)' }}>
                  <Card className="relative w-full h-full bg-gradient-to-r from-[#3d1a2d] to-[#2d1a1f] border-0 rounded-md overflow-visible">
                    <CardContent className="p-0 relative w-full h-full overflow-hidden">
                    <div className="flex items-center justify-between relative h-full" style={{ padding: 'clamp(12px, 3vw, 20px)', paddingTop: 'clamp(18px, 4.5vw, 26px)', paddingBottom: 'clamp(12px, 3vw, 16px)', paddingRight: 'clamp(54px, 14vw, 70px)' }}>
                      {/* Left content */}
                      <div className="flex flex-col items-start justify-center flex-1 max-w-full">
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] mb-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-full" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
                          {card.crewName}
                        </p>
                        <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white mb-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-full" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                          {card.title}
                        </h3>
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white overflow-hidden text-ellipsis whitespace-nowrap max-w-full" style={{ fontSize: 'clamp(12px, 3vw, 14px)', lineHeight: 'clamp(18px, 4.5vw, 21px)' }}>
                          {card.description}
                        </p>
                      </div>

                      {/* Badge icon on right - positioned at bottom-right with click effect */}
                      <div
                        className="absolute"
                        style={{
                          bottom: '10px',
                          right: '8px'
                        }}
                      >
                        {user?.id === card.userId ? (
                          // 본인 카드: "나의 카드" 텍스트만 표시
                          <div className="flex items-center justify-center cursor-not-allowed" style={{ width: '40px', height: '40px' }}>
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
                            {/* Count display above badge - fixed position */}
                            <div
                              className="absolute translate-y-[-120%] translate-x-[10%]"
                              style={{
                                top: '0px',
                                right: '0px',
                                marginRight: '5px'
                              }}
                            >
                              <span className="font-ria-sans font-bold whitespace-nowrap" style={{
                                fontSize: 'clamp(10px, 2.5vw, 12px)',
                                color: '#FFFFFF'
                              }}>
                                <span style={{ color: '#FFFFFF' }}>{card.receivedRecognitionsCount || 0}</span>
                                <span style={{ color: '#AAAAAA' }}>/5</span>
                              </span>
                            </div>

                            <div
                              className={`relative flex items-center justify-center ${(card.receivedRecognitionsCount || 0) >= 5 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-95'}`}
                              onClick={() => card.judgment_id && handleApplauseClick(card.judgment_id, card.userId, card.receivedRecognitionsCount || 0)}
                            >
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
                                  fill={(applauseClicks[card.judgment_id || ''] || 0) > 0 ? "#53121F" : "#040B11"}
                                />
                                <rect
                                  x="1"
                                  y="1"
                                  width="40"
                                  height="40"
                                  rx="20"
                                  stroke={(applauseClicks[card.judgment_id || ''] || 0) > 0 ? "#E52B50" : "#D9D9D9"}
                                  strokeOpacity={(applauseClicks[card.judgment_id || ''] || 0) > 0 ? "1" : "0.5"}
                                  strokeWidth="1"
                                />
                                <image
                                  href="/thunder.png"
                                  x="12.2"
                                  y="12.2"
                                  width="17.6"
                                  height="17.6"
                                  opacity={(applauseClicks[card.judgment_id || ''] || 0) > 0 ? "1" : "0.5"}
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                  </CardContent>
                  </Card>

                  {/* 다음 기회에... badge at top center - skewed rectangle */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-50" style={{ top: 'clamp(-14px, -3.6vw, -11px)' }}>
                    <div className="inline-flex items-center justify-center bg-[#2d1a1f] border border-[#E52B50] shadow-[0px_0px_20px_#E52B5066] rounded-md" style={{
                      padding: 'clamp(5px, 1.35vw, 7px) clamp(11px, 2.7vw, 14px)',
                      transform: 'skewX(-10deg)'
                    }}>
                      <span className="font-bold leading-[normal] whitespace-nowrap font-ria-sans" style={{
                        fontSize: 'clamp(11px, 2.7vw, 13px)',
                        transform: 'skewX(10deg)',
                        display: 'inline-block',
                        color: '#E52B50'
                      }}>
                        다음 기회에...
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`relative w-[482px] h-[240px] ${hoveredCard === card.judgment_id ? 'z-[100000]' : 'z-0'}`}>
                  {/* Background image with cutout */}
                  <img
                    className="absolute top-[25px] left-0 w-[482px] h-[215px] object-fill"
                    alt="Card background"
                    src={newBg02Image.src}
                  />

                  {/* Card content */}
                  <div className="relative pt-[55px] pb-[30px] px-[30px] h-full flex flex-col z-10">
                      {/* Top section: Profile + Title/Name */}
                      <div className="flex items-start gap-3 pr-[95px]">
                        {/* Profile image on left */}
                        <img
                          className="w-[55px] h-[55px] rounded-full object-cover flex-shrink-0"
                          alt="Profile"
                          src={card.profileImage}
                        />

                        {/* Title and crew name */}
                        <div className="flex flex-col gap-1 flex-1">
                          <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[20px] tracking-[-0.6px] leading-[24px]">
                            {card.title}
                          </h3>
                          <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#999999] text-[14px] tracking-[-0.42px] leading-[16.8px]">
                            {card.crewName}
                          </p>
                        </div>
                      </div>

                      {/* Bottom section: Description */}
                      <div className="mt-4 pr-[95px]">
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white/90 text-[14px] tracking-[-0.42px] leading-[21px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                          {card.description}
                        </p>
                      </div>

                      {/* Crown Icon on right */}
                      <img
                        className="absolute top-[55px] right-[25px] w-[65px] h-[65px] object-contain opacity-50"
                        alt="Crown decoration"
                        src={crownIcon.src}
                      />

                      {/* Recognition badge with new button design - inside card on right bottom */}
                      <div
                        className="absolute group"
                        style={{
                          bottom: '10px',
                          right: '5px'
                        }}
                        onMouseEnter={() => setHoveredCard(card.judgment_id || '')}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div
                          className={`relative flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-150 ease-in-out ${
                            user?.id === card.userId
                              ? 'cursor-not-allowed'
                              : (card.receivedRecognitionsCount || 0) >= 5
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer hover:scale-105 hover:brightness-125 active:scale-95'
                          }`}
                          onClick={() => {
                            if (user?.id !== card.userId && card.judgment_id) {
                              handleApplauseClick(card.judgment_id, card.userId, card.receivedRecognitionsCount || 0);
                            }
                          }}
                          style={{
                            width: '100px',
                            height: '47px',
                            backgroundColor: user?.id === card.userId
                              ? '#1a1a1a'
                              : (applauseClicks[card.judgment_id || ''] || 0) > 0
                                ? '#54121F'
                                : '#1a1a1a',
                            border: `1px solid ${
                              user?.id === card.userId
                                ? 'rgba(170, 170, 170, 0.7)'
                                : (applauseClicks[card.judgment_id || ''] || 0) > 0
                                  ? '#E33357'
                                  : 'rgba(208, 208, 208, 0.5)'
                            }`,
                          }}
                        >
                          {user?.id === card.userId ? (
                            <span className="font-ria-sans font-bold text-[14px] text-white">
                              나의 카드
                            </span>
                          ) : (
                            <>
                              <span className="font-ria-sans font-bold text-[16px]">
                                <span className="text-white">{card.receivedRecognitionsCount || 0}</span>
                                <span className="text-[#AAAAAA]">/5</span>
                              </span>
                              <img
                                className="w-[24px] h-[24px] object-contain"
                                alt="Badge icon"
                                src={(applauseClicks[card.judgment_id || ''] || 0) > 0 ? cloudBigIcon2.src : cloudBigIcon.src}
                                style={{ transform: 'scale(2) translateY(2px)' }}
                              />
                            </>
                          )}
                        </div>
                        {/* Hover Tooltip - 본인 카드가 아닐 때만 표시 */}
                        {hoveredCard === card.judgment_id && user?.id !== card.userId && (
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 px-4 py-3 bg-[#E52B50]/95 backdrop-blur-md border-2 border-[#1a1a1a] rounded-lg shadow-[0_0_40px_rgba(229,43,80,0.7),0_0_80px_rgba(229,43,80,0.3)] z-[99999] pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200"
                            style={{ marginBottom: '10px', minWidth: '350px' }}
                          >
                            <p className="font-ria-sans font-medium text-[#1a1a1a] text-[12px] text-center">
                              당신의 목표는 달성되지 못했지만,<br />
                              시도와 도전에 충분히 박수드리고 싶습니다!<br />
                              다음 기회를 또 노려보자구요!
                            </p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E52B50]"></div>
                          </div>
                        )}
                      </div>
                  </div>

                  {/* 다음 기회에... badge at top center */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <div className="inline-flex items-center justify-center gap-2 rounded-md border border-[#E52B50] shadow-[0px_0px_15px_rgba(229,43,80,0.4)]" style={{
                      width: '145px',
                      height: '43px',
                      background: '#040B11',
                      transform: 'skewX(-10deg)'
                    }}>
                      <span className="text-[#E52B50] leading-[normal] whitespace-nowrap font-ria-sans text-[16px]" style={{
                        fontWeight: 700,
                        transform: 'skewX(10deg)'
                      }}>
                        다음 기회에...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
          </div>
        </div>

        {/* Pagination buttons */}
        <div className={`${!isMobile && !isTablet ? 'max-w-[1680px] mx-auto w-full relative' : 'w-full'}`}>
          <div className={`flex justify-center ${!isMobile && !isTablet ? 'w-[1000px] mt-[64px]' : 'w-full'} ${isMobile ? '-mt-[25px]' : isTablet ? 'mt-8' : ''}`}>
            <div className={`relative cursor-pointer ${isMobile ? 'scale-[0.8]' : ''}`}>
              <img
                className="w-auto h-auto"
                alt="Pagination"
                src={paginationImage.src}
              />
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="absolute left-0 top-0 w-[48px] h-[48px] opacity-0 hover:opacity-10 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                aria-label="Previous page"
              />
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="absolute right-0 top-0 w-[48px] h-[48px] opacity-0 hover:opacity-10 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                aria-label="Next page"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => {
          setAlertModal({ isOpen: false, message: '' });
          if (alertModal.message === '로그인이 필요합니다.') {
            setIsLoginModalOpen(true);
          }
        }}
        message={alertModal.message}
        type="info"
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* 5th Applause Confirmation Modal */}
      {showFifthConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
          onClick={() => {
            setShowFifthConfirm(false);
            setPendingApplause(null);
          }}
        >
          <div
            className="relative bg-[#1a1a1a] border-2 border-[#E52B50] shadow-[0_0_30px_rgba(229,43,80,0.3)] rounded-2xl w-full mx-4"
            style={{ padding: 'clamp(20px, 5vw, 32px)', maxWidth: 'min(90%, 448px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setShowFifthConfirm(false);
                setPendingApplause(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-[#E52B50] transition-colors text-2xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Message */}
            <div className="flex flex-col items-center mt-2" style={{ gap: 'clamp(16px, 4vw, 24px)' }}>
              <p className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-center mb-3" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                이제 마지막 박수에요!
              </p>
              <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-center leading-relaxed" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                전송하시면 박수 보내기 미션 완료!<br />
                단, 확인을 누르면 수정이나 추가 전송은 불가해요.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowFifthConfirm(false);
                    setPendingApplause(null);
                  }}
                  className="flex-1 font-semibold rounded-full [font-family:'Ria'] font-ria-sans transition-all bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-white/30"
                  style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 24px)', fontSize: 'clamp(14px, 3.5vw, 16px)' }}
                >
                  잠깐만!
                </button>
                <button
                  onClick={handleConfirmFifthApplause}
                  className="flex-1 font-semibold rounded-full [font-family:'Ria'] font-ria-sans transition-all bg-[#E52B50] hover:bg-[#d12546] text-white"
                  style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 24px)', fontSize: 'clamp(14px, 3.5vw, 16px)' }}
                >
                  박수 보내기 👏
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

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
