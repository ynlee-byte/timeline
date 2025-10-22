import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";
import { ReviewCardModal, GoalCardModal } from "./components";
import { useState } from "react";
import cardMy02 from "../../../../assets/cardMy02.png";

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
    title: "지난주 판정",
    medalBadge: "목표 달성!",
  },
  {
    type: "goal",
    badge: "목, 금, 토",
    title: "이번주 목표",
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

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);
  const openGoalModal = () => setIsGoalModalOpen(true);
  const closeGoalModal = () => setIsGoalModalOpen(false);

  return (
    <section className={`flex flex-col items-center justify-center ${isMobile ? 'gap-6 px-5 py-10' : isTablet ? 'gap-[40px] px-10 py-16' : 'gap-[50px] px-[120px] py-20'} relative w-full bg-[#040b11] overflow-hidden`}>
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

      <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} items-${isMobile || isTablet ? 'center' : 'start'} justify-center ${isMobile ? 'gap-4' : 'gap-[30px]'} relative w-full`}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            className={`relative bg-[#1a1f26] border-0 rounded-none overflow-hidden ${isMobile ? '' : 'w-[330px] h-[341px]'}`}
            style={isMobile ? { width: 'clamp(280px, 75vw, 380px)', height: 'clamp(61px, 16vw, 80px)' } : {}}
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

              {/* Green corner glow accents for mobile */}
              {isMobile && (card.type === "review" || card.type === "goal" || card.type === "judgment") && (
                <>
                  {/* Top-left corner glow - smaller version for mobile */}
                  <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                      <defs>
                        <filter id={`glowTopLeftMobile-${index}`} x="-200%" y="-200%" width="500%" height="500%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path
                        d="M 0 30 L 0 10 Q 0 0 10 0 L 30 0"
                        stroke="#21e786"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        filter={`url(#glowTopLeftMobile-${index})`}
                      />
                    </svg>
                  </div>

                  {/* Bottom-right corner glow - smaller version for mobile */}
                  <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                      <defs>
                        <filter id={`glowBottomRightMobile-${index}`} x="-200%" y="-200%" width="500%" height="500%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path
                        d="M 40 10 L 40 30 Q 40 40 30 40 L 10 40"
                        stroke="#21e786"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        filter={`url(#glowBottomRightMobile-${index})`}
                      />
                    </svg>
                  </div>
                </>
              )}


              {isMobile ? (
                <>

                  <div className="flex items-center justify-between px-4 py-3 h-full">
                    <div className="flex items-center gap-3">
                    {card.type === "review" && (
                      <img
                        className="flex-shrink-0"
                        style={{ width: 'clamp(30px, 7vw, 40px)', height: 'clamp(28px, 6.5vw, 37px)' }}
                        alt="Chat bubble icon"
                        src={card.icon.vector}
                      />
                    )}
                    {card.type === "judgment" && (
                      <img
                        className="flex-shrink-0"
                        style={{ width: 'clamp(30px, 7vw, 40px)', height: 'clamp(28px, 6.5vw, 37px)' }}
                        alt="Icon Scoop"
                        src="/iconScoop-mobile.png"
                      />
                    )}
                    {card.type === "goal" && (
                      <img
                        className="flex-shrink-0"
                        style={{ width: 'clamp(30px, 7vw, 40px)', height: 'clamp(28px, 6.5vw, 37px)' }}
                        alt="Heart icon"
                        src="/iconHeart.png"
                      />
                    )}
                    <div className="flex flex-col items-start gap-0.5">
                      {card.badge && (
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] leading-tight" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
                          {card.badge}
                        </p>
                      )}
                      <h3 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white leading-tight" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  {card.type === "judgment" ? (
                    <div className="flex items-center gap-3">
                      <img
                        src="/badge02.png"
                        alt="목표 달성!"
                        className="h-auto flex-shrink-0"
                        style={{ width: 'clamp(120px, 18vw, 180px)' }}
                      />
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
                </>
              ) : (
                // Desktop/Tablet design (existing)
                <>
                  <div className="absolute top-0 left-0 w-[330px] h-[344px] bg-[#141b22]" />
                  {card.type === "review" && (
                    <>
                      <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
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
                    </>
                  )}
                  {card.type === "judgment" && (
                    <>
                      <div className="flex flex-col w-full h-full px-6 pt-[5px] pb-6 relative z-10">
                        {/* Header with icon, title and badge */}
                        <div className="flex items-center mb-4 -mx-6 pl-[15px] pr-6">
                          {/* Icon Scoop */}
                          <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0 self-center overflow-visible">
                            <img
                              className="w-full h-full object-contain scale-[2]"
                              alt="Icon Scoop"
                              src="/iconScoop-mobile.png"
                            />
                          </div>

                          {/* Title */}
                          <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[28px] tracking-[0] leading-[normal] whitespace-nowrap self-center -ml-2">
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
                    </>
                  )}
                  {card.type === "goal" && (
                    <>
                      <div className="flex flex-col items-center h-full py-12 px-6 relative z-10">
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
                          onClick={openGoalModal}
                        >
                          <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111] text-base tracking-[-0.48px] leading-[normal] whitespace-nowrap">
                            목표 카드 생성하기
                          </span>
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
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

      <ReviewCardModal isOpen={isReviewModalOpen} onClose={closeReviewModal} />
      <GoalCardModal isOpen={isGoalModalOpen} onClose={closeGoalModal} />
    </section>
  );
};
