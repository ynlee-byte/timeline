import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowWidth } from "../../../../breakpoints";

const recognitionCards = [
  {
    id: 1,
    period: "9월 1주차 리뷰 · 김유진 크루",
    title: "목표 성공 포기",
    description: "목표 달성이 너무 어려워 보여서 포기하고 싶었지만 크루들의 응원 덕분에 끝까지 해냈어요!",
    stars: 3,
    badge: "인정",
    badgeColor: "bg-[#21e786]",
    badgeTextColor: "text-[#040b11]",
    cardBg: "bg-[#0d2419]",
  },
  {
    id: 2,
    period: "9월 1주차 목표 · 백남수 크루",
    title: "위스덤 작성하기",
    description: "작성한 위스덤이 크루들에게 도움이 되었다는 피드백을 받아서 너무 뿌듯했어요! 앞으로도 계속해야지!",
    stars: 5,
    badge: "완료",
    badgeColor: "bg-[#555555]",
    badgeTextColor: "text-white",
    cardBg: "bg-[#3a3a3a]",
  },
  {
    id: 3,
    period: "9월 1주차 리뷰 · 김민수 크루",
    title: "위스덤 작성하기 완료",
    description: "위스덤을 작성하면서 내 생각을 정리할 수 있었고, 크루들과 더 깊이 있는 대화를 나눌 수 있었어요!",
    stars: 5,
    badge: "인정",
    badgeColor: "bg-[#555555]",
    badgeTextColor: "text-white",
    cardBg: "bg-[#3a3a3a]",
  },
  {
    id: 4,
    period: "9월 1주차 목표 · 서연희 크루",
    title: "아침을 먹음",
    description: "아침을 거르지 않고 매일 먹으려고 노력했어요. 건강한 하루를 시작할 수 있어서 좋았어요!",
    stars: 5,
    badge: "완료",
    badgeColor: "bg-[#555555]",
    badgeTextColor: "text-white",
    cardBg: "bg-[#3a3a3a]",
  },
  {
    id: 5,
    period: "9월 1주차 목표 · 이지민 크루",
    title: "목표 성공 포기",
    description: "너무 바빠서 목표를 달성하지 못했지만, 다음에는 더 잘할 수 있을 거예요! 크루들의 응원이 큰 힘이 되었어요!",
    stars: 5,
    badge: "인정",
    badgeColor: "bg-[#21e786]",
    badgeTextColor: "text-[#040b11]",
    cardBg: "bg-[#0d2419]",
  },
  {
    id: 6,
    period: "9월 1주차 목표 · 김민수 크루",
    title: "아침을 먹음",
    description: "아침을 거르지 않고 매일 먹으려고 노력했어요. 건강한 하루를 시작할 수 있어서 좋았고, 크루들과 함께 응원하며 목표를 달성할 수 있었어요!",
    stars: 5,
    badge: "완료",
    badgeColor: "bg-[#555555]",
    badgeTextColor: "text-white",
    cardBg: "bg-[#3a3a3a]",
  },
];

export const RecognitionSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardWidth = 301; // Fixed width of a mobile card

  const navigateCards = useCallback((direction: 'next' | 'prev') => {
    setCurrentCardIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % recognitionCards.length;
      } else {
        return (prevIndex - 1 + recognitionCards.length) % recognitionCards.length;
      }
    });
  }, []);

  // Remove auto-scroll and mouse wheel navigation
  // The user explicitly requested to remove these features.

  const translateXValue = isMobile ? `translateX(-${currentCardIndex * cardWidth}px)` : 'translateX(0)';

  return (
    <section className={`flex flex-col items-center ${isMobile ? 'px-5' : isTablet ? 'px-10' : 'px-[120px]'} py-20 w-full bg-[#040b11] relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#21e786] opacity-5 blur-[150px]" />

      <div className="flex flex-col items-center gap-[50px] w-full max-w-[1680px] mx-auto relative z-10">
        <header className="flex flex-col items-center gap-[15px]">
          <div className="inline-flex items-center gap-5">
            <img
              className="w-6 h-6"
              alt="Logo"
              src="https://c.animaapp.com/O1XpzcZm/img/logo-1.svg"
            />
            <h2 className="[font-family:'Ria_Sans-Bold',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
              인정과 응원 보내기
            </h2>
            <img
              className="w-6 h-6"
              alt="Logo"
              src="https://c.animaapp.com/O1XpzcZm/img/logo-2.svg"
            />
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface text-xl text-center tracking-[-0.60px] leading-[30px]">
              '인정'과 '응원'은 건강한 동기를 부여해 수 있습니다 :)
            </p>
            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface text-xl text-center tracking-[-0.60px] leading-[30px]">
              동료 크루들에게 아낌 없는 인정과 응원을 보내주세요!
            </p>
          </div>
        </header>

        {/* Timeline with cards */}
        <div className="relative w-full">
          {/* Timeline line with gradient */}
          <div 
            className="absolute top-0 left-0 w-full h-0.5"
            style={{
              background: 'linear-gradient(90deg, rgba(39, 174, 96, 0) 0%, rgba(39, 174, 96, 1) 54%, rgba(39, 174, 96, 0) 100%)'
            }}
          />

          {/* Cards container with horizontal scroll */}
          <div 
            ref={sliderRef}
            className={`relative w-full ${isMobile ? 'overflow-hidden' : ''}`} // Hide scrollbar for mobile
          >
            <div 
              className={`inline-flex ${isMobile ? 'flex-row' : 'grid grid-cols-6'} gap-0 w-full transition-transform duration-500 ease-in-out`}
              style={isMobile ? { transform: translateXValue, justifyContent: 'center' } : {}} // Center align for mobile
            >
              {recognitionCards.map((card, index) => (
                <div key={card.id} className={`relative flex flex-col items-center ${isMobile ? 'w-[301px] flex-shrink-0' : 'w-full'}`}>
                  {/* Top Design Element: Circle and Dashed Line */}
                  <div className="relative w-full h-[290px] flex flex-col items-center">
                    {/* Outer glow circle */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-[#21e786] opacity-20 blur-[40px]" />
                    
                    {/* Timeline dot */}
                    <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-[#21e786]" />

                    {/* Dashed vertical line with white border */}
                    <div 
                      className="absolute top-[90px] left-1/2 -translate-x-1/2 w-0.5 h-[200px] border-l-2 border-dashed border-white"
                    />
                  </div>

                  {/* Bottom Card Section */}
                  <div className={`w-full ${card.cardBg} relative rounded-lg`}>
                    <div className="flex flex-col p-6 gap-4">
                      {/* Period */}
                      <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs text-left tracking-[-0.36px] leading-[18px]">
                        {card.period}
                      </p>

                      {/* Title with icon */}
                      <div className="flex items-center justify-start gap-2">
                        <span className="text-[#21e786] text-lg">✅</span>
                        <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-lg text-left tracking-[-0.48px] leading-[28px]">
                          {card.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="min-h-[80px] flex items-start justify-start">
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-sm tracking-[-0.42px] leading-[21px] text-left">
                          {card.description}
                        </p>
                      </div>

                      {/* Stars and Badge button in row */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Stars */}
                        <div className="flex items-center justify-start gap-1 px-4 py-2">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-xl ${i < card.stars ? 'text-[#21e786]' : 'text-[#333333]'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        {/* Badge button */}
                        <button className={`${card.badgeColor} px-8 py-2.5 rounded-full ${card.badgeTextColor} [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-base tracking-[-0.42px] leading-[normal] hover:opacity-80 transition-opacity`}>
                          {card.badge}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        {isMobile && (
          <div className="flex items-center gap-2 mt-8">
            <button 
              onClick={() => navigateCards('prev')}
              className="w-12 h-12 flex items-center justify-center bg-transparent border-2 border-[#21e786] rounded hover:bg-[#21e786]/10 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={() => navigateCards('next')}
              className="w-12 h-12 flex items-center justify-center bg-[#21e786] rounded hover:bg-[#1bc970] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#040b11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
