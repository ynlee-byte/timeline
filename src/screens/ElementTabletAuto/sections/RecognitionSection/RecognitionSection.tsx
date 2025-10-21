import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowWidth } from "../../../../breakpoints";
import lineImage from "../../../../assets/line.png";
import paginationImage from "../../../../assets/pagenation.png";

const recognitionCards = [
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

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [clickedButtons, setClickedButtons] = useState<Record<number, boolean>>({});
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardWidth = 300; // Fixed width of card
  const cardGap = 55; // Gap between cards
  const cardWidthWithGap = cardWidth + cardGap; // Total space per card

  const handleButtonClick = (cardId: number) => {
    setClickedButtons((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const navigateCards = useCallback((direction: 'next' | 'prev') => {
    setCurrentCardIndex((prevIndex) => {
      const step = isMobile ? 1 : isTablet ? 3 : 5;
      if (direction === 'next') {
        return Math.min(prevIndex + step, recognitionCards.length - step);
      } else {
        return Math.max(prevIndex - step, 0);
      }
    });
  }, [isMobile, isTablet]);

  const translateXValue = isMobile
    ? `translateX(-${currentCardIndex * 100}%)`
    : `translateX(-${currentCardIndex * cardWidthWithGap}px)`;

  return (
    <section className={`flex flex-col items-center w-full bg-[#040b11] relative overflow-visible ${isMobile ? 'py-10' : 'py-20'}`}>
      {/* Background image */}
      {!isMobile && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(https://c.animaapp.com/O1XpzcZm/img/06-slider.png)` }}
        />
      )}

      {/* Timeline line image - full width */}
      {!isMobile && (
        <div className="absolute left-0 right-0 top-[calc(50%)] w-full h-[5px] z-0" style={{ marginTop: '-140px' }}>
          <img
            className="w-full h-full object-cover"
            alt="Timeline"
            src={lineImage.src}
          />
        </div>
      )}

      {/* Header section with max-width */}
      <div className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} w-full max-w-[1680px] mx-auto relative z-10 ${isMobile ? 'gap-6 px-5 mb-6' : isTablet ? 'gap-[40px] px-10 mb-[40px]' : 'gap-[50px] px-[120px] mb-[50px]'}`}>
        <header className={`flex flex-col ${isMobile ? 'items-start w-full' : 'items-center'} ${isMobile ? 'gap-3' : 'gap-[15px]'}`}>
          {isMobile ? (
            <h2 className="font-bold text-white text-[20px] text-left font-ria-sans">
              인정과 응원 보내기
            </h2>
          ) : (
            <div className="inline-flex items-center gap-5">
              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-1.svg"
              />
              <h2 className="font-bold text-white tracking-[0] leading-[normal] font-ria-sans text-[32px]">
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
      </div>

      {/* Timeline with cards - full width without padding */}
      <div className="relative w-full z-10">
          {/* Cards container with horizontal scroll */}
          <div
            ref={sliderRef}
            className={`relative w-full ${isMobile ? 'overflow-hidden px-5' : 'overflow-visible'}`}
          >
            <div
              className={`inline-flex flex-row transition-transform duration-500 ease-in-out ${isMobile ? 'gap-6' : 'gap-[55px]'}`}
              style={{ transform: translateXValue }}
            >
              {recognitionCards.map((card, index) => (
                <div key={card.id} className={`relative flex flex-col items-center flex-shrink-0 ${isMobile ? 'w-full' : 'w-[300px] -mt-[15px]'}`}>
                  {/* Timeline dot and dashed line */}
                  <div className={`relative w-full flex flex-col items-center ${isMobile ? 'h-[80px]' : 'h-[201px]'}`}>
                    {/* Timeline dot with outer and inner circles */}
                    <div className={`absolute rounded-full bg-[#21e786] opacity-20 z-10 flex items-center justify-center ${isMobile ? 'top-[10px] w-[40px] h-[40px]' : 'top-[30px] w-[60px] h-[60px]'}`} />
                    <div className={`absolute rounded-full bg-[#21e786] z-20 ${isMobile ? 'top-[20px] w-[20px] h-[20px]' : 'top-[45px] w-[30px] h-[30px]'}`} />
                    {/* Dashed vertical line */}
                    <div className={`absolute w-0.5 border-l-2 border-dashed border-white opacity-70 ${isMobile ? 'top-[30px] h-[50px]' : 'top-[60px] h-[141px]'}`} />
                  </div>

                  {/* Bottom Card Section */}
                  <div className={`bg-white bg-opacity-20 relative rounded-lg ${isMobile ? 'w-full p-4' : 'w-[300px] h-[270px] p-6'}`}>

                    <div className={`flex flex-col ${isMobile ? 'gap-2' : 'gap-4'}`}>
                      {/* Period */}
                      <p className={`[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#cccccc] text-left tracking-[-0.36px] ${isMobile ? 'text-xs leading-[14px]' : 'text-[16px] leading-[18px]'}`}>
                        {card.period}
                      </p>

                      {/* Title with icon */}
                      {isMobile ? (
                        <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-left text-lg leading-[22px]">
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
                      <div className={`flex items-start justify-start ${isMobile ? 'min-h-[42px]' : 'min-h-[60px]'}`}>
                        <p className={`[font-family:'Pretendard-Regular',Helvetica] font-normal text-white tracking-[-0.42px] text-left overflow-hidden text-ellipsis ${isMobile ? 'text-sm leading-[18px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]' : 'text-[16px] leading-[21px]'}`}>
                          {card.description}
                        </p>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center justify-start gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${isMobile ? 'text-base' : 'text-2xl'} ${i < card.stars ? 'text-white' : 'text-[#666666]'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {/* Crew name and Badge button in row for mobile */}
                      {isMobile ? (
                        <div className="flex items-center justify-between mt-2">
                          <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#cccccc] text-xs">
                            배낭수 크루
                          </p>
                          <button
                            onClick={() => handleButtonClick(card.id)}
                            className={`rounded-full flex items-center justify-center font-semibold transition-all duration-300 hover:scale-110 hover:brightness-125 font-ria-sans cursor-pointer w-12 h-12 text-sm ${
                              clickedButtons[card.id]
                                ? 'bg-[#FFF802] text-[#040B11]'
                                : 'bg-[#040B11] text-white border-2 border-white border-opacity-30'
                            }`}
                            style={
                              clickedButtons[card.id]
                                ? {
                                    boxShadow: '0 4px 20px rgba(255, 248, 2, 0.5)'
                                  }
                                : undefined
                            }
                          >
                            {card.badge}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end mt-2">
                          <button
                            onClick={() => handleButtonClick(card.id)}
                            className={`rounded-full flex items-center justify-center font-semibold transition-all duration-300 hover:scale-110 hover:brightness-125 font-ria-sans cursor-pointer w-14 h-14 text-[16px] ${
                              clickedButtons[card.id]
                                ? 'bg-[#FFF802] text-[#040B11]'
                                : 'bg-[#040B11] text-white border-2 border-white border-opacity-30'
                            }`}
                            style={
                              clickedButtons[card.id]
                                ? {
                                    boxShadow: '0 4px 20px rgba(255, 248, 2, 0.5)'
                                  }
                                : undefined
                            }
                          >
                            {card.badge}
                          </button>
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
      <div className="w-full max-w-[1680px] mx-auto relative z-10">
        <div className="flex items-center justify-center mt-8">
          <div className="relative cursor-pointer">
            <img
              className="w-auto h-auto"
              alt="Pagination"
              src={paginationImage.src}
            />
            <button
              onClick={() => navigateCards('prev')}
              disabled={currentCardIndex === 0}
              className="absolute left-0 top-0 w-[48px] h-[48px] opacity-0 hover:opacity-10 transition-opacity cursor-pointer disabled:cursor-not-allowed"
              aria-label="Previous cards"
            />
            <button
              onClick={() => navigateCards('next')}
              disabled={currentCardIndex >= recognitionCards.length - (isMobile ? 1 : isTablet ? 3 : 5)}
              className="absolute right-0 top-0 w-[48px] h-[48px] opacity-0 hover:opacity-10 transition-opacity cursor-pointer disabled:cursor-not-allowed"
              aria-label="Next cards"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
