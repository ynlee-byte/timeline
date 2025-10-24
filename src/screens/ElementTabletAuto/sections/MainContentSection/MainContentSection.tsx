import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";
import { ReviewCardModal, GoalCardModal, JudgmentCardModal } from "./components";
import { useState, useEffect } from "react";
import cardMy02 from "../../../../assets/cardMy02.png";
import cardMy04 from "../../../../assets/cardMy04.png";
import noticeModalSuccess from "../../../../assets/noticeModal-suscess.png";
import noticeModalFail from "../../../../icons/noticeModal-fail.png";
import borderSmall from "../../../../assets/border small.png";
import bodyBadge from "../../../../assets/body.png";
import cloudIcon from "../../../../icons/cloud.png";
import ringIcon from "../../../../icons/ring.png";

const cardData = [
  {
    type: "review",
    badge: "월, 화, 수",
    title: "지난주 리뷰",
    icon: {
      vector: "https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png", // Chat bubble icon
    },
  },
  {
    type: "judgment",
    badge: "월, 화, 수",
    title: "지난주 판정",
    medalBadge: "목표 달성!",
  },
  {
    type: "goal",
    badge: "목, 금, 토",
    title: "다음주 목표",
    icon: {
      vector1: "https://c.animaapp.com/O1XpzcZm/img/vector-1.svg", // Heart icon
    },
  },
];

export const MainContentSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isJudgmentModalOpen, setIsJudgmentModalOpen] = useState(false);
  const [judgmentModalType, setJudgmentModalType] = useState<'success' | 'fail'>('success');
  const [isReviewCompleted, setIsReviewCompleted] = useState(false);
  const [isJudgmentCompleted, setIsJudgmentCompleted] = useState<false | 'success' | 'fail'>(false);
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<'mon-wed' | 'thu-sat' | 'not-period' | null>('mon-wed');
  const [isDebugPanelOpen, setIsDebugPanelOpen] = useState(false);
  const [isReviewCardExpanded, setIsReviewCardExpanded] = useState(false);
  const [isJudgmentCardExpanded, setIsJudgmentCardExpanded] = useState(false);
  const [isGoalCardExpanded, setIsGoalCardExpanded] = useState(false);
  const [isScheduleChecked, setIsScheduleChecked] = useState(false);

  // 이번주 목표 데이터
  const [weeklyGoal, setWeeklyGoal] = useState({
    activity: "위즈덤 활동 피드백 제공하기",
    confidenceMessage: "이번주 위즈덤은 내가 제일 빨리 제출해야지 1등으로 해서 다른 사람들의 찬사를 받아야겠다 !!",
    rating: 5,
    startDate: "2025.10.20 (월)",
    endDate: "2025.10.26 (일)"
  });

  // localStorage에서 일정 확인 상태 불러오기
  useEffect(() => {
    const confirmed = localStorage.getItem('calendarConfirmed');
    if (confirmed === 'true') {
      setIsScheduleChecked(true);
    }
  }, []);

  const openReviewModal = () => {
    if (currentPeriod === 'not-period') {
      alert('기간이 아닙니다.');
      return;
    }
    setIsReviewModalOpen(true);
  };
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const openGoalModal = () => {
    if (currentPeriod === 'not-period') {
      alert('기간이 아닙니다.');
      return;
    }
    setIsGoalModalOpen(true);
  };
  const closeGoalModal = () => setIsGoalModalOpen(false);

  const openJudgmentModal = () => {
    setIsJudgmentModalOpen(true);
  };
  const closeJudgmentModal = () => setIsJudgmentModalOpen(false);

  const handleReviewComplete = () => {
    console.log('Review completed!');
    setIsReviewCompleted(true);
  };

  const handleJudgmentComplete = () => {
    console.log('Judgment completed!');
    setIsJudgmentCompleted(judgmentModalType);
    // 팝업은 JudgmentCardModal 내부에서 처리됨
  };

  const handleGoalComplete = () => {
    console.log('Goal completed!');
    setIsGoalCompleted(true);
  };

  return (
    <section className={`flex flex-col items-center justify-center ${isMobile ? 'gap-6 px-5 py-10' : isTablet ? 'gap-[40px] px-10 py-16' : 'gap-[50px] px-[120px] py-20'} relative w-full bg-[#040b11] overflow-hidden`}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      {isMobile ? (
        <header className="w-full">
          <h1 className="font-bold text-white text-left font-ria-sans" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
            나의 카드
          </h1>
        </header>
      ) : (
        <header className="inline-flex items-center gap-5 relative flex-[0_0_auto]">
          <img
            className="relative w-6 h-6"
            alt="Logo"
            src="https://c.animaapp.com/O1XpzcZm/img/logo-1.svg"
          />

          <h1 className="relative w-fit mt-[-1.00px] font-bold text-white text-[32px] tracking-[0] leading-[normal] font-ria-sans">
            나의 카드
          </h1>

          <img
            className="relative w-6 h-6"
            alt="Logo"
            src="https://c.animaapp.com/O1XpzcZm/img/logo-2.svg"
          />
        </header>
      )}

      {/* 이번주 나의 목표 섹션 */}
      <div className={isTablet ? 'w-[330px]' : 'w-full max-w-[1020px]'} style={isMobile ? { width: 'clamp(280px, 75vw, 380px)' } : {}}>
        <Card className="bg-[#1a1f26] border-0 rounded-none overflow-hidden relative">
          <CardContent className={`relative z-10 ${isMobile ? 'px-3 pt-1 pb-4' : isTablet ? 'px-6 pt-4 pb-8' : 'px-6 py-3'}`}>
            {/* Border decorations */}
            <img
              src={borderSmall.src}
              alt=""
              className="absolute top-0 left-0 w-auto h-auto"
            />
            <img
              src={borderSmall.src}
              alt=""
              className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
            />

            <div className={!isMobile && !isTablet ? 'flex flex-col justify-center h-full' : ''} style={isTablet ? { transform: 'translate(-2px, -5px)' } : {}}>
            {/* 헤더 */}
            <div className={`flex ${isMobile || isTablet ? 'flex-col items-center' : 'items-center justify-between'} ${isMobile ? 'mb-2' : isTablet ? 'mb-1' : 'mb-4'}`}>
              <div className={`${isMobile || isTablet ? 'flex justify-center w-full' : ''}`} style={isMobile ? { transform: 'translateX(-15px)' } : isTablet ? { transform: 'translateX(-10px)' } : { transform: 'translateX(-12px)' }}>
                <h3 className={`flex items-center ${isMobile || isTablet ? 'gap-0' : 'gap-0'} [font-family:'Pretendard-Bold',Helvetica] font-bold text-white ${isMobile ? 'text-center' : isTablet ? 'text-center mb-1' : ''}`} style={isMobile ? { fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1', marginBottom: '0px' } : { fontSize: '24px', lineHeight: '1' }}>
                  <span className={`inline-flex items-center justify-center ${isMobile ? 'w-[67px] h-[67px]' : 'w-[80px] h-[80px]'}`} style={{ margin: 0, padding: 0, transform: 'translateY(10px)', marginRight: isMobile ? '-13px' : isTablet ? '-10px' : '-15px' }}>
                    <img
                      src={ringIcon.src}
                      alt="target"
                      className={`${isMobile ? 'w-[67px] h-[67px]' : 'w-[80px] h-[80px]'} object-contain`}
                      style={{ margin: 0, padding: 0, display: 'block' }}
                    />
                  </span>
                  <span style={{ lineHeight: '1', margin: 0, padding: 0 }}>이번주 나의 목표</span>
                </h3>
              </div>
              <span className={`[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#21e786] ${isMobile ? 'text-[12px]' : 'text-[14px]'} ${isMobile || isTablet ? 'text-center' : ''}`} style={isMobile ? { transform: 'translateY(-13px)' } : isTablet ? { transform: 'translateY(-15px)' } : { transform: 'translateX(-20px)' }}>
                {weeklyGoal.startDate} - {weeklyGoal.endDate}
              </span>
            </div>

            <div style={isMobile ? { transform: 'translateY(-3px)' } : isTablet ? { transform: 'translateY(-3px)' } : { transform: 'translateY(-20px)' }}>
            {/* Divider */}
            <div
              className={`h-[1px] ${isMobile ? 'mb-2' : isTablet ? 'my-[10px]' : 'mb-3'}`}
              style={{
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
              }}
            />

            {/* 활동 */}
            <div className={isMobile || isTablet ? 'text-center' : ''} style={isMobile ? {} : isTablet ? { transform: 'translateY(5px)' } : { marginLeft: '14px' }}>
              <p className={`[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] ${isMobile ? 'text-[12px]' : 'text-[14px]'}`} style={!isMobile && !isTablet ? { marginBottom: '6px' } : { marginBottom: isMobile ? '8px' : '8px' }}>
                활동
              </p>
              <h4 className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white ${isMobile ? 'text-[16px]' : 'text-[20px]'}`}>
                {weeklyGoal.activity}
              </h4>
            </div>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} items-${isMobile || isTablet ? 'center' : 'start'} justify-center ${isMobile ? 'gap-4' : 'gap-[30px]'} relative w-full`}>
        {cardData.map((card, index) => (
          <React.Fragment key={index}>
          <Card
            className={`relative bg-[#1a1f26] border-0 rounded-none overflow-hidden ${isMobile ? 'cursor-pointer' : 'w-[330px] h-[341px]'}`}
            style={isMobile ? {
              width: 'clamp(280px, 75vw, 380px)',
              height: (card.type === 'review' && isReviewCardExpanded) || (card.type === 'judgment' && isJudgmentCardExpanded) || (card.type === 'goal' && isGoalCardExpanded) ? 'auto' : 'clamp(61px, 16vw, 80px)',
              transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}
            onClick={isMobile ? (
              card.type === 'review' ? () => setIsReviewCardExpanded(!isReviewCardExpanded) :
              card.type === 'judgment' ? () => setIsJudgmentCardExpanded(!isJudgmentCardExpanded) :
              card.type === 'goal' ? () => setIsGoalCardExpanded(!isGoalCardExpanded) :
              undefined
            ) : undefined}
          >
            <CardContent className="p-0 relative w-full h-full">
              {/* Green corner glow accents for desktop/tablet */}
              {!isMobile && (card.type === "review" || card.type === "goal" || card.type === "judgment") && (
                <>
                  {/* Top-left corner glow */}
                  <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                      <defs>
                        <filter id={`glowTopLeft-${index}`} x="-200%" y="-200%" width="500%" height="500%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path
                        d="M 0 60 L 0 20 Q 0 0 20 0 L 60 0"
                        stroke="#21e786"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        filter={`url(#glowTopLeft-${index})`}
                      />
                    </svg>
                  </div>

                  {/* Bottom-right corner glow */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                      <defs>
                        <filter id={`glowBottomRight-${index}`} x="-200%" y="-200%" width="500%" height="500%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path
                        d="M 80 20 L 80 60 Q 80 80 60 80 L 20 80"
                        stroke="#21e786"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        filter={`url(#glowBottomRight-${index})`}
                      />
                    </svg>
                  </div>
                </>
              )}

              {isMobile ? (
                <>
                  {/* Border decorations - Mobile */}
                  <img
                    src={borderSmall.src}
                    alt=""
                    className="absolute top-0 left-0"
                    style={{ width: '80%', height: 'auto', maxWidth: '50px' }}
                  />
                  <img
                    src={borderSmall.src}
                    alt=""
                    className="absolute bottom-0 right-0 rotate-180"
                    style={{ width: '80%', height: 'auto', maxWidth: '50px' }}
                  />

                  {card.type === 'review' && isReviewCardExpanded ? (
                    // 지난주 리뷰 확장 상태
                    <div
                      className="px-4 py-6 relative z-10"
                      style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                      }}
                    >
                      {isReviewCompleted && (
                        <>
                          {/* Header with icon, title and arrow */}
                          <div className="flex items-center justify-between mb-3" style={{ transform: 'translateY(-3px)' }}>
                            <div className="flex items-center gap-2">
                              <img
                                src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                                alt="Chat icon"
                                style={{ width: 'clamp(24px, 6vw, 32px)', height: 'clamp(22px, 5.5vw, 30px)' }}
                              />
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                                지난주 리뷰
                              </h2>
                            </div>
                            <svg
                              className="w-5 h-5 flex-shrink-0 transform rotate-180"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-3"
                            style={{
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />
                        </>
                      )}

                      {isReviewCompleted ? (
                        <>
                          {/* Activity */}
                          <div className="flex flex-col gap-1 mb-3">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa]" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white" style={{ fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
                              앵그레 Wisdom
                            </h3>
                          </div>

                          {/* Review */}
                          <div className="flex flex-col gap-1">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa]" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                              나의 멘트
                            </p>
                            {/* Star Rating */}
                            <div className="flex gap-0 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="#ffffff"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 2L14.09 8.92L21 9.77L16.5 14.14L17.63 21L12 17.77L6.37 21L7.5 14.14L3 9.77L9.91 8.92L12 2Z" />
                                </svg>
                              ))}
                            </div>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white" style={{ fontSize: 'clamp(12px, 3vw, 16px)', lineHeight: '1.5' }}>
                              위즈덤을 작성에이하느라 작성하지 못해서너무 아쉽다 ππ 명강이 되었을텐데 ~ ππ
                            </p>
                          </div>
                        </>
                      ) : currentPeriod === 'thu-sat' || currentPeriod === 'not-period' ? (
                        // 작성 기간이 아닙니다
                        <div className="flex flex-col items-center py-4">
                          <div className="flex flex-col items-center gap-4">
                            {/* Chat Icon */}
                            <div className="relative" style={{ width: 'clamp(50px, 15vw, 70px)', height: 'clamp(46px, 14vw, 65px)' }}>
                              <img
                                className="w-full h-full object-contain"
                                alt="Chat icon"
                                src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full border border-solid border-[#767676] bg-transparent">
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-center whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                                  월, 화, 수
                                </span>
                              </div>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#767676] text-center whitespace-nowrap" style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}>
                                지난주 리뷰
                              </h2>
                            </div>
                          </div>

                          {/* Gap */}
                          <div style={{ height: 'clamp(20px, 5vw, 33px)' }} />

                          {/* Disabled message */}
                          <div className="w-full max-w-[180px] px-4 py-3 bg-[#2a2a2a] rounded-md flex items-center justify-center">
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676]" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                              작성 기간이 아닙니다.
                            </span>
                          </div>
                        </div>
                      ) : (
                        // 작성 전 - 버튼 표시
                        <div className="flex flex-col items-center py-4">
                          <div className="flex flex-col items-center gap-4">
                            {/* Chat Icon */}
                            <div className="relative" style={{ width: 'clamp(50px, 15vw, 70px)', height: 'clamp(46px, 14vw, 65px)' }}>
                              <img
                                className="w-full h-full object-contain"
                                alt="Chat icon"
                                src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full border border-solid border-white bg-transparent">
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                                  월, 화, 수
                                </span>
                              </div>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}>
                                지난주 리뷰
                              </h2>
                            </div>
                          </div>

                          {/* Gap */}
                          <div style={{ height: 'clamp(20px, 5vw, 33px)' }} />

                          {/* Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openReviewModal();
                            }}
                            className="w-full max-w-[180px] px-4 py-3 bg-[#21e786] hover:bg-[#1bc970] rounded-md transition-colors"
                          >
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111]" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                              리뷰 카드 생성하기
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : card.type === 'judgment' && isJudgmentCardExpanded ? (
                    // 지난주 판정 확장 상태
                    <div
                      className="px-4 py-6 relative z-10"
                      style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                      }}
                    >
                      {(isJudgmentCompleted === 'success' || isJudgmentCompleted === 'fail') && (
                        <>
                          {/* Header with icon, title and arrow */}
                          <div className="flex items-center justify-between mb-3" style={{ transform: 'translateY(-18px)' }}>
                            <div className="flex items-center gap-0">
                              <img
                                src="/iconScoop.png"
                                alt="Scoop icon"
                                className="scale-[1.5] mr-[2px]"
                                style={{ width: 'clamp(40px, 10vw, 52px)', height: 'clamp(37px, 9.2vw, 48px)' }}
                              />
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                                지난주 판정
                              </h2>
                              {isJudgmentCompleted === 'success' ? (
                                <img
                                  src="/badge02-m.png"
                                  alt="목표 달성!"
                                  className="h-auto flex-shrink-0 ml-1 scale-[1.32]"
                                  style={{ width: 'clamp(100px, 18vw, 144px)' }}
                                />
                              ) : (
                                <img
                                  src={bodyBadge.src}
                                  alt="목표 실패"
                                  className="h-auto flex-shrink-0 ml-1 scale-[1.188]"
                                  style={{ width: 'clamp(100px, 18vw, 144px)' }}
                                />
                              )}
                            </div>
                            <svg
                              className="w-5 h-5 flex-shrink-0 transform rotate-180"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-3 -mt-[31px]"
                            style={{
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />
                        </>
                      )}

                      {isJudgmentCompleted === 'success' || isJudgmentCompleted === 'fail' ? (
                        <>
                          {/* Activity */}
                          <div className="flex flex-col gap-1 mb-3">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa]" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white" style={{ fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
                              위즈덤 활동 피드백 제공하기
                            </h3>
                          </div>

                          {/* Judgment comment */}
                          <div className="flex flex-col gap-1">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa]" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                              나의 멘트
                            </p>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white" style={{ fontSize: 'clamp(12px, 3vw, 16px)', lineHeight: '1.5' }}>
                              난 멋져! 난 해냈어 피드백 5개 이상인 총 7개를 크루들에게 제공했어! 난 짱이야 ~
                            </p>

                            {/* Reaction count */}
                            <div className="flex items-center gap-1.5 mt-2">
                              <img
                                src={isJudgmentCompleted === 'fail' ? cloudIcon.src : "/icon.png"}
                                alt={isJudgmentCompleted === 'fail' ? "Cloud icon" : "Bread icon"}
                                className="w-4 h-4"
                              />
                              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
                                22
                              </span>
                            </div>
                          </div>
                        </>
                      ) : currentPeriod === 'thu-sat' || currentPeriod === 'not-period' ? (
                        // 작성 기간이 아닙니다
                        <div className="flex flex-col items-center pt-[6px] pb-4" style={{ transform: 'translateY(-5px)' }}>
                          <div className="flex flex-col items-center gap-0">
                            {/* Scoop Icon */}
                            <div className="relative" style={{ width: 'clamp(90px, 27vw, 126px)', height: 'clamp(83px, 25vw, 117px)', transform: 'translateX(-3px)' }}>
                              <img
                                className="w-full h-full object-contain scale-[1.444]"
                                alt="Scoop icon"
                                src="/iconScoop.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-2 -mt-1">
                              <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full border border-solid border-[#767676] bg-transparent">
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-center whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                                  월, 화, 수
                                </span>
                              </div>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#767676] text-center whitespace-nowrap" style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}>
                                지난주 판정
                              </h2>
                            </div>
                          </div>

                          {/* Gap */}
                          <div style={{ height: 'clamp(20px, 5vw, 33px)' }} />

                          {/* Disabled message */}
                          <div className="w-full max-w-[180px] px-4 py-3 bg-[#2a2a2a] rounded-md flex items-center justify-center">
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676]" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                              작성 기간이 아닙니다.
                            </span>
                          </div>
                        </div>
                      ) : (
                        // 작성 전 - 버튼 표시
                        <div className="flex flex-col items-center pt-[6px] pb-4" style={{ transform: 'translateY(-10px)' }}>
                          <div className="flex flex-col items-center gap-0">
                            {/* Scoop Icon */}
                            <div className="relative" style={{ width: 'clamp(90px, 27vw, 126px)', height: 'clamp(83px, 25vw, 117px)', transform: 'translateX(-3px)' }}>
                              <img
                                className="w-full h-full object-contain scale-[1.444]"
                                alt="Scoop icon"
                                src="/iconScoop.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-2 -mt-1">
                              <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full border border-solid border-white bg-transparent">
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                                  월, 화, 수
                                </span>
                              </div>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}>
                                지난주 판정
                              </h2>
                            </div>
                          </div>

                          {/* Gap */}
                          <div style={{ height: 'clamp(20px, 5vw, 33px)' }} />

                          {/* Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openJudgmentModal();
                            }}
                            className="w-full max-w-[180px] px-4 py-3 bg-[#21e786] hover:bg-[#1bc970] rounded-md transition-colors"
                          >
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111]" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                              판정 카드 생성하기
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : card.type === 'goal' && isGoalCardExpanded ? (
                    // 다음주 목표 확장 상태
                    <div
                      className="px-4 py-6 relative z-10"
                      style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                      }}
                    >
                      {isGoalCompleted && (
                        <>
                          {/* Header with icon, title and arrow */}
                          <div className="flex items-center justify-between mb-3" style={{ transform: 'translateY(-3px)' }}>
                            <div className="flex items-center gap-2">
                              <img
                                src="/iconHeart.png"
                                alt="Heart icon"
                                style={{ width: 'clamp(24px, 6vw, 32px)', height: 'clamp(22px, 5.5vw, 30px)', transform: 'scale(2.2)' }}
                              />
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                                다음주 목표
                              </h2>
                            </div>
                            <svg
                              className="w-5 h-5 flex-shrink-0 transform rotate-180"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-3"
                            style={{
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />
                        </>
                      )}

                      {isGoalCompleted ? (
                        <>
                          {/* Activity */}
                          <div className="flex flex-col gap-1 mb-3">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa]" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white" style={{ fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
                              앵그레 Wisdom
                            </h3>
                          </div>

                          {/* Goal comment */}
                          <div className="flex flex-col gap-1">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa]" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                              나의 멘트
                            </p>
                            {/* Star Rating */}
                            <div className="flex gap-0 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="#ffffff"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 2L14.09 8.92L21 9.77L16.5 14.14L17.63 21L12 17.77L6.37 21L7.5 14.14L3 9.77L9.91 8.92L12 2Z" />
                                </svg>
                              ))}
                            </div>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white" style={{ fontSize: 'clamp(12px, 3vw, 16px)', lineHeight: '1.5' }}>
                              다음주에는 1등으로 위즈덤을 작성해야지 !! 다른 크루들에게 도움이 되는 명강을 만들어보자! 이잇호!
                            </p>
                          </div>
                        </>
                      ) : currentPeriod === 'mon-wed' || currentPeriod === 'not-period' ? (
                        // 작성 기간이 아닙니다
                        <div className="flex flex-col items-center pt-[6px] pb-4" style={{ transform: 'translateY(-5px)' }}>
                          <div className="flex flex-col items-center gap-0">
                            {/* Heart Icon */}
                            <div className="relative" style={{ width: 'clamp(90px, 27vw, 126px)', height: 'clamp(83px, 25vw, 117px)', transform: 'translateX(-3px)' }}>
                              <img
                                className="w-full h-full object-contain scale-[1.444]"
                                alt="Heart icon"
                                src="/iconHeart.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-2 -mt-1">
                              <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full border border-solid border-[#767676] bg-transparent">
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-center whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                                  목, 금, 토
                                </span>
                              </div>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#767676] text-center whitespace-nowrap" style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}>
                                다음주 목표
                              </h2>
                            </div>
                          </div>

                          {/* Gap */}
                          <div style={{ height: 'clamp(20px, 5vw, 33px)' }} />

                          {/* Disabled message */}
                          <div className="w-full max-w-[180px] px-4 py-3 bg-[#2a2a2a] rounded-md flex items-center justify-center">
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676]" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                              작성 기간이 아닙니다.
                            </span>
                          </div>
                        </div>
                      ) : (
                        // 작성 전 - 버튼 표시
                        <div className="flex flex-col items-center pt-[6px] pb-4" style={{ transform: 'translateY(-5px)' }}>
                          <div className="flex flex-col items-center gap-0">
                            {/* Heart Icon */}
                            <div className="relative" style={{ width: 'clamp(90px, 27vw, 126px)', height: 'clamp(83px, 25vw, 117px)', transform: 'translateX(-3px)' }}>
                              <img
                                className="w-full h-full object-contain scale-[1.444]"
                                alt="Heart icon"
                                src="/iconHeart.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-2 -mt-1">
                              <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full border border-solid border-white bg-transparent">
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
                                  목, 금, 토
                                </span>
                              </div>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(20px, 5vw, 24px)' }}>
                                다음주 목표
                              </h2>
                            </div>
                          </div>

                          {/* Gap */}
                          <div style={{ height: 'clamp(20px, 5vw, 33px)' }} />

                          {/* Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openGoalModal();
                            }}
                            className="w-full max-w-[180px] px-4 py-3 bg-[#21e786] hover:bg-[#1bc970] rounded-md transition-colors"
                          >
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111]" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
                              목표 카드 생성하기
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    // 일반 작은 카드 상태
                  <div className="flex items-center justify-between px-4 py-3 h-full relative z-10">
                    <div className="flex items-center gap-3" style={card.type === "judgment" && !isJudgmentCompleted ? { marginLeft: '-11px' } : {}}>
                    {card.type === "review" && (
                      <img
                        className="flex-shrink-0"
                        style={{ width: 'clamp(30px, 7vw, 40px)', height: 'clamp(28px, 6.5vw, 37px)', transform: 'scale(0.9)' }}
                        alt="Chat bubble icon"
                        src={card.icon.vector}
                      />
                    )}
                    {card.type === "goal" && (
                      <img
                        className="flex-shrink-0"
                        style={{ width: 'clamp(30px, 7vw, 40px)', height: 'clamp(28px, 6.5vw, 37px)', transform: 'scale(2.16)', margin: 0 }}
                        alt="Heart icon"
                        src="/iconHeart.png"
                      />
                    )}
                    {card.type === "judgment" && !isJudgmentCompleted && (
                      <img
                        className="flex-shrink-0 scale-[1.2]"
                        style={{ width: 'clamp(58.5px, 13.65vw, 78px)', height: 'clamp(54.6px, 12.675vw, 72.15px)' }}
                        alt="Scoop icon"
                        src="/iconScoop.png"
                      />
                    )}
                    <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0" style={card.type === "judgment" && !isJudgmentCompleted ? { marginLeft: '-15px' } : {}}>
                      {card.badge && (
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] leading-tight" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
                          {card.badge}
                        </p>
                      )}
                      <h3 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white leading-tight whitespace-nowrap" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  {card.type === "judgment" ? (
                    <div className="flex items-center gap-1">
                      {isJudgmentCompleted === 'success' ? (
                        <img
                          src="/badge02.png"
                          alt="목표 달성!"
                          className="h-auto flex-shrink-0"
                          style={{ width: 'clamp(144px, 21.6vw, 216px)' }}
                        />
                      ) : isJudgmentCompleted === 'fail' ? (
                        <img
                          src={bodyBadge.src}
                          alt="목표 실패"
                          className="h-auto flex-shrink-0"
                          style={{ width: 'clamp(144px, 21.6vw, 216px)' }}
                        />
                      ) : null}
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  </div>
                  )}
                </>
              ) : (
                // Desktop/Tablet design (existing)
                <>
                  <div className="absolute top-0 left-0 w-[330px] h-[344px] bg-[#141b22]" />
                  {card.type === "review" && (
                    <>
                      {isReviewCompleted ? (
                        // 작성 완료 상태
                        <div className="flex flex-col w-full h-full px-6 pt-5 pb-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          {/* Header with icon and title */}
                          <div className="flex items-center gap-2 mb-5 mt-[13px]">
                            <img
                              src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                              alt="Chat icon"
                              className="w-8 h-8"
                            />
                            <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[24px]">
                              지난주 리뷰
                            </h2>
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-5 -mx-6"
                            style={{
                              width: '330px',
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />

                          {/* Activity */}
                          <div className="flex flex-col gap-1 mb-[20px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[18px] tracking-[0] leading-[normal]">
                              앵그레 Wisdom
                            </h3>
                          </div>

                          {/* Review */}
                          <div className="flex flex-col gap-[5px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              나의 멘트
                            </p>
                            {/* Star Rating */}
                            <div className="flex gap-0 mb-[6px]">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="#ffffff"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 2L14.09 8.92L21 9.77L16.5 14.14L17.63 21L12 17.77L6.37 21L7.5 14.14L3 9.77L9.91 8.92L12 2Z" />
                                </svg>
                              ))}
                            </div>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[21px]">
                              위즈덤을 작성에이하느라 작성하지 못해서너무 아쉽다 ππ 명강이 되었을텐데 ~ ππ
                            </p>
                          </div>
                        </div>
                      ) : currentPeriod === 'thu-sat' || currentPeriod === 'not-period' ? (
                        // 목금토 또는 기간 아님: 작성기간이 아닙니다
                        <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          <div className="flex flex-col items-center gap-6">
                            {/* Chat Icon */}
                            <div className="relative w-[80px] h-[74px]">
                              <img
                                className="w-full h-full object-contain"
                                alt="Chat icon"
                                src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge
                                variant="outline"
                                className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-solid border-[#767676] bg-transparent hover:bg-transparent"
                              >
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-[12px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                  {card.badge}
                                </span>
                              </Badge>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#767676] text-[28px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                {card.title}
                              </h2>
                            </div>
                          </div>

                          {/* 33px gap */}
                          <div className="h-[33px]" />

                          {/* Disabled message */}
                          <div className="w-full max-w-[180px] px-6 py-3.5 bg-[#2a2a2a] h-auto rounded-md flex items-center justify-center">
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                              작성 기간이 아닙니다.
                            </span>
                          </div>
                        </div>
                      ) : (
                        // 월화수: 작성 전 상태
                        <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          <div className="flex flex-col items-center gap-6">
                            {/* Chat Icon */}
                            <div className="relative w-[80px] h-[74px]">
                              <img
                                className="w-full h-full object-contain"
                                alt="Chat icon"
                                src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge
                                variant="outline"
                                className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-solid border-white bg-transparent hover:bg-transparent"
                              >
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[12px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                  {card.badge}
                                </span>
                              </Badge>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[28px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                {card.title}
                              </h2>
                            </div>
                          </div>

                          {/* 33px gap */}
                          <div className="h-[33px]" />

                          {/* Button */}
                          <Button
                            className="w-full max-w-[180px] px-6 py-3.5 bg-[#21e786] hover:bg-[#1bc970] h-auto rounded-md"
                            onClick={openReviewModal}
                          >
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                              리뷰 카드 생성하기
                            </span>
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                  {card.type === "judgment" && (
                    <>
                      {isJudgmentCompleted === 'success' ? (
                        // 작성 완료 (성공) 상태
                        <div className="flex flex-col w-full h-full px-6 pt-[5px] pb-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          {/* Header with icon, title and badge */}
                          <div className="flex items-center justify-center mb-4 -mx-6 pl-[22px] pr-6">
                            {/* Icon Scoop */}
                            <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0 overflow-visible">
                              <img
                                className="w-full h-full object-contain scale-[1.07]"
                                alt="Icon Scoop"
                                src="/iconScoop.png"
                              />
                            </div>

                            {/* Title */}
                            <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal] whitespace-nowrap -ml-2">
                              지난주 판정
                            </h2>

                            {/* Badge */}
                            <img
                              src="/badge02.png"
                              alt="목표 달성!"
                              className="h-auto flex-shrink-0 ml-1"
                              style={{ width: '150px' }}
                            />
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-[30px] -mt-[20px] -mx-6"
                            style={{
                              width: '330px',
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />

                          {/* Activity section */}
                          <div className="flex flex-col gap-1 mb-[20px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[18px] tracking-[0] leading-[normal]">
                              위즈덤 활동 피드백 제공하기
                            </h3>
                          </div>

                          {/* Confidence message section */}
                          <div className="flex flex-col gap-1">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              자신감 멘트
                            </p>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[21px]">
                              난 멋져 난 해냈어 피드백을 5개 이상인 총 7개를 크루들에게 제공했어! 난 짱이야 ~ 난 짱이야 ~
                            </p>

                            {/* Reaction count */}
                            <div className="inline-flex items-center gap-1.5 mt-4">
                              <img
                                className="w-5 h-5"
                                alt="Bread icon"
                                src="/icon.png"
                              />
                              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[14px] tracking-[0] leading-[normal]">
                                22
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : isJudgmentCompleted === 'fail' ? (
                        // 작성 완료 (실패) 상태
                        <div className="flex flex-col w-full h-full px-6 pt-[10px] pb-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          {/* Header with icon, title and badge */}
                          <div className="flex items-center justify-center mb-4 -mx-6">
                            {/* Icon Scoop */}
                            <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0 overflow-visible">
                              <img
                                className="w-full h-full object-contain scale-[1.33]"
                                alt="Icon Scoop"
                                src="/iconScoop.png"
                              />
                            </div>

                            {/* Title */}
                            <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal] whitespace-nowrap -ml-2">
                              지난주 판정
                            </h2>

                            {/* Badge - 실패 버전 */}
                            <img
                              src={bodyBadge.src}
                              alt="다음 기회에..."
                              className="h-auto flex-shrink-0 ml-1"
                              style={{ width: '150px' }}
                            />
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-[30px] -mt-[11px] -mx-1"
                            style={{
                              width: '330px',
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />

                          {/* Activity section */}
                          <div className="flex flex-col gap-1 mb-[20px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[18px] tracking-[0] leading-[normal]">
                              위즈덤 활동 피드백 제공하기
                            </h3>
                          </div>

                          {/* Regret message section */}
                          <div className="flex flex-col gap-[5px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              아쉬운 멘트
                            </p>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[21px]">
                              저번주는 너무 바빠서 피드백을 2개밖에 남기지 못했네요 ㅠㅠㅠㅠ 목표를 달성하지 못했으면 자기전에 한개씩이라도 하고 자기!
                            </p>

                            {/* Reaction count */}
                            <div className="inline-flex items-center gap-[5px] mt-4">
                              <div className="w-5 h-5 flex items-center justify-center overflow-visible relative">
                                <img
                                  className="w-full h-full object-contain scale-[9] absolute top-[calc(50%+2px)] left-1/2 -translate-x-1/2 -translate-y-1/2"
                                  alt="Cloud icon"
                                  src={cloudIcon.src}
                                />
                              </div>
                              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[14px] tracking-[0] leading-[normal] leading-[20px]">
                                8
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : currentPeriod === 'mon-wed' ? (
                        // 월화수: 판정 카드 생성하기 버튼
                        <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          <div className="flex flex-col items-center gap-6">
                            {/* Scoop Icon */}
                            <div className="relative w-[80px] h-[74px] flex items-center justify-center overflow-visible -ml-[8px]">
                              <img
                                className="w-full h-full object-contain scale-[1.575]"
                                alt="Scoop icon"
                                src="/bigiconScoop.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge
                                variant="outline"
                                className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-solid border-white bg-transparent hover:bg-transparent"
                              >
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[12px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                  {card.badge}
                                </span>
                              </Badge>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[28px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                {card.title}
                              </h2>
                            </div>
                          </div>

                          {/* 33px gap */}
                          <div className="h-[33px]" />

                          {/* Button */}
                          <Button
                            className="w-full max-w-[180px] px-6 py-3.5 bg-[#21e786] hover:bg-[#1bc970] h-auto rounded-md"
                            onClick={openJudgmentModal}
                          >
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                              판정 카드 생성하기
                            </span>
                          </Button>
                        </div>
                      ) : (
                        // 목금토 또는 기타: 작성기간이 아닙니다
                        <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          <div className="flex flex-col items-center gap-6">
                            {/* Scoop Icon */}
                            <div className="relative w-[80px] h-[74px] flex items-center justify-center overflow-visible">
                              <img
                                className="w-full h-full object-contain"
                                alt="Scoop icon"
                                src="/iconScoop.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge
                                variant="outline"
                                className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-solid border-[#767676] bg-transparent hover:bg-transparent"
                              >
                                <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-[12px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                  {card.badge}
                                </span>
                              </Badge>
                              <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#767676] text-[28px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                {card.title}
                              </h2>
                            </div>
                          </div>

                          {/* 33px gap */}
                          <div className="h-[33px]" />

                          {/* Disabled message */}
                          <div className="w-full max-w-[180px] px-6 py-3.5 bg-[#2a2a2a] h-auto rounded-md flex items-center justify-center">
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                              작성 기간이 아닙니다.
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {card.type === "goal" && (
                    <>
                      {isGoalCompleted ? (
                        // 작성 완료 상태
                        <div className="flex flex-col w-full h-full px-6 pt-5 pb-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          {/* Header with icon and title */}
                          <div className="flex items-center gap-2 mb-5 mt-[13px]">
                            <img
                              src="/iconHeart.png"
                              alt="Heart icon"
                              className="w-8 h-8 scale-[2.5]"
                            />
                            <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[24px]">
                              다음주 목표
                            </h2>
                          </div>

                          {/* Divider */}
                          <div
                            className="h-[1px] mb-5 -mx-6"
                            style={{
                              width: '330px',
                              background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)'
                            }}
                          />

                          {/* Activity */}
                          <div className="flex flex-col gap-1 mb-[20px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              활동
                            </p>
                            <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[18px] tracking-[0] leading-[normal]">
                              앵그레 Wisdom
                            </h3>
                          </div>

                          {/* Goal */}
                          <div className="flex flex-col gap-[5px]">
                            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[12px] tracking-[0] leading-[normal]">
                              나의 멘트
                            </p>
                            {/* Star Rating */}
                            <div className="flex gap-0 mb-[6px]">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="#ffffff"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 2L14.09 8.92L21 9.77L16.5 14.14L17.63 21L12 17.77L6.37 21L7.5 14.14L3 9.77L9.91 8.92L12 2Z" />
                                </svg>
                              ))}
                            </div>
                            <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[21px]">
                              이번주 위즈덤은 내가 제일 빨리 제출해야지 1등으로 해서 다른 사람들의 찬사를 받아야겠다 !!
                            </p>
                          </div>
                        </div>
                      ) : (
                        // 작성 전 상태
                        <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
                          {/* Border decorations */}
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute top-0 left-0 w-auto h-auto"
                          />
                          <img
                            src={borderSmall.src}
                            alt=""
                            className="absolute bottom-0 right-0 w-auto h-auto rotate-180"
                          />

                          <div className="flex flex-col items-center gap-6">
                            {/* Heart Icon */}
                            <div className="relative w-[80px] h-[74px]">
                              <img
                                className="w-full h-full object-cover scale-[2.5]"
                                alt="Heart icon"
                                src="/iconHeart.png"
                              />
                            </div>

                            {/* Badge and Title */}
                            <div className="flex flex-col items-center gap-3">
                              <Badge
                                variant="outline"
                                className={`inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-solid ${currentPeriod === 'mon-wed' ? 'border-[#767676] bg-transparent' : 'border-white bg-transparent'} hover:bg-transparent`}
                              >
                                <span className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold ${currentPeriod === 'mon-wed' ? 'text-[#767676]' : 'text-white'} text-[12px] text-center tracking-[0] leading-[normal] whitespace-nowrap`}>
                                  {card.badge}
                                </span>
                              </Badge>
                              <h2 className={`[font-family:'Pretendard-Bold',Helvetica] font-bold ${currentPeriod === 'mon-wed' ? 'text-[#767676]' : 'text-white'} text-[28px] text-center tracking-[0] leading-[normal] whitespace-nowrap`}>
                                {card.title}
                              </h2>
                            </div>
                          </div>

                          {/* 33px gap */}
                          <div className="h-[33px]" />

                          {/* Button or Disabled message */}
                          {currentPeriod === 'mon-wed' ? (
                            <div className="w-full max-w-[180px] px-6 py-3.5 bg-[#2a2a2a] h-auto rounded-md flex items-center justify-center">
                              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                                작성 가간이 아닙니다.
                              </span>
                            </div>
                          ) : (
                            <Button
                              className="w-full max-w-[180px] px-6 py-3.5 bg-[#21e786] hover:bg-[#1bc970] h-auto rounded-md"
                              onClick={openGoalModal}
                            >
                              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                                목표 카드 생성하기
                              </span>
                            </Button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          </React.Fragment>
        ))}
      </div>

      {/* Background decoration - blurred star/asterisk shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Left bottom star decoration */}
        <div className="absolute left-[5%] bottom-[15%]" style={{ filter: 'blur(30px)' }}>
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              {/* 8-pointed asterisk/star */}
              <rect x="140" y="50" width="20" height="200" fill="#4a4a4a" rx="10"/>
              <rect x="50" y="140" width="200" height="20" fill="#4a4a4a" rx="10"/>
              <rect x="95" y="95" width="110" height="20" fill="#4a4a4a" rx="10" transform="rotate(45 150 150)"/>
              <rect x="95" y="185" width="110" height="20" fill="#4a4a4a" rx="10" transform="rotate(-45 150 150)"/>
            </g>
          </svg>
        </div>
        
        {/* Right top star decoration */}
        <div className="absolute right-[8%] top-[10%]" style={{ filter: 'blur(35px)' }}>
          <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              {/* 8-pointed asterisk/star */}
              <rect x="165" y="50" width="20" height="250" fill="#4a4a4a" rx="10"/>
              <rect x="50" y="165" width="250" height="20" fill="#4a4a4a" rx="10"/>
              <rect x="110" y="110" width="130" height="20" fill="#4a4a4a" rx="10" transform="rotate(45 175 175)"/>
              <rect x="110" y="220" width="130" height="20" fill="#4a4a4a" rx="10" transform="rotate(-45 175 175)"/>
            </g>
          </svg>
        </div>
      </div>

      <ReviewCardModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onComplete={handleReviewComplete} />
      <GoalCardModal isOpen={isGoalModalOpen} onClose={closeGoalModal} onComplete={handleGoalComplete} />
      <JudgmentCardModal isOpen={isJudgmentModalOpen} onClose={closeJudgmentModal} onComplete={handleJudgmentComplete} type={judgmentModalType} />

      {/* 성공/실패 팝업 - JudgmentCardModal 내부에서 처리됨 */}

      {/* 디버그 패널 - 개발용 */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        {isDebugPanelOpen ? (
          <div className="bg-black/90 border border-[#21e786] rounded-lg p-4 min-w-[250px]">
            <div className="flex items-center justify-between mb-3 border-b border-[#21e786] pb-2">
              <h3 className="text-[#21e786] font-bold text-sm">
                🛠️ 디버그 패널
              </h3>
              <button
                onClick={() => setIsDebugPanelOpen(false)}
                className="text-white hover:text-[#21e786] text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-white text-xs mb-2">기간 설정:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCurrentPeriod('mon-wed')}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      currentPeriod === 'mon-wed'
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    월-수
                  </button>
                  <button
                    onClick={() => setCurrentPeriod('thu-sat')}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      currentPeriod === 'thu-sat'
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    목-토
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <p className="text-white text-xs mb-2">리뷰 상태:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsReviewCompleted(false)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      !isReviewCompleted
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    작성 전
                  </button>
                  <button
                    onClick={() => setIsReviewCompleted(true)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      isReviewCompleted
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    작성 완료
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <p className="text-white text-xs mb-2">판정 상태:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsJudgmentCompleted(false)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      !isJudgmentCompleted
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    작성 전
                  </button>
                  <button
                    onClick={() => setIsJudgmentCompleted('success')}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      isJudgmentCompleted === 'success'
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    성공
                  </button>
                  <button
                    onClick={() => setIsJudgmentCompleted('fail')}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      isJudgmentCompleted === 'fail'
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    실패
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <p className="text-white text-xs mb-2">판정 모달 열기:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setJudgmentModalType('success');
                      setIsJudgmentModalOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs rounded transition-colors bg-green-600 text-white hover:bg-green-700"
                  >
                    성공 모달
                  </button>
                  <button
                    onClick={() => {
                      setJudgmentModalType('fail');
                      setIsJudgmentModalOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs rounded transition-colors bg-red-600 text-white hover:bg-red-700"
                  >
                    실패 모달
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <p className="text-white text-xs mb-2">목표 상태:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsGoalCompleted(false)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      !isGoalCompleted
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    작성 전
                  </button>
                  <button
                    onClick={() => setIsGoalCompleted(true)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      isGoalCompleted
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    작성 완료
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <p className="text-white text-xs mb-2">일정 확인:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setIsScheduleChecked(false);
                      localStorage.setItem('calendarConfirmed', 'false');
                      window.location.reload();
                    }}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      !isScheduleChecked
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    일정 확인 전
                  </button>
                  <button
                    onClick={() => {
                      setIsScheduleChecked(true);
                      localStorage.setItem('calendarConfirmed', 'true');
                      window.location.reload();
                    }}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      isScheduleChecked
                        ? 'bg-[#21e786] text-black font-bold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    일정 확인 후
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <p className="text-white text-xs mb-2">테스트 기능:</p>
                <button
                  onClick={() => setWeeklyGoal({
                    ...weeklyGoal,
                    activity: "중앙 브리핑 참여하기",
                    confidenceMessage: "매일 아침 브리핑으로 하루를 시작하자! 팀과 함께 성장!"
                  })}
                  className="px-3 py-1.5 text-xs rounded transition-colors bg-blue-600 text-white hover:bg-blue-500 w-full"
                >
                  목표 데이터 변경
                </button>
              </div>

              <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-600">
                현재: {currentPeriod === 'mon-wed' ? '월-수' : currentPeriod === 'thu-sat' ? '목-토' : '기간 아님'} /
                리뷰: {isReviewCompleted ? '완료' : '미완료'} / 판정: {isJudgmentCompleted === 'success' ? '성공' : isJudgmentCompleted === 'fail' ? '실패' : '미완료'} / 목표: {isGoalCompleted ? '완료' : '미완료'} / 일정: {isScheduleChecked ? '확인 후' : '확인 전'}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsDebugPanelOpen(true)}
            className="bg-[#21e786] hover:bg-[#1bc970] text-black font-bold px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-110 text-lg"
            style={{
              boxShadow: '0 0 30px rgba(33, 231, 134, 0.8)',
              animation: 'pulse 2s infinite'
            }}
          >
            🛠️ 디버그 패널
          </button>
        )}
      </div>
    </section>
  );
};

