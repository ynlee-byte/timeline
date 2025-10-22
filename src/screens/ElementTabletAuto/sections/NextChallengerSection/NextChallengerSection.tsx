import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";
import badgeImage from "../../../../assets/body.png";
import decoImage from "../../../../assets/deco.png";
import paginationImage from "../../../../assets/pagenation.png";
import buttonApplause from "../../../../icons/buttonApplause.png";
import buttonApplauseChecked from "../../../../icons/buttonApplauseChecked.png";

const challengerCards = [
  {
    id: 1,
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
  const [applauseClicks, setApplauseClicks] = useState<Record<number, number>>({});
  const cardsPerPage = isMobile ? 4 : isTablet ? 6 : 6;
  const totalPages = Math.max(1, Math.ceil(challengerCards.length / cardsPerPage));

  const currentCards = challengerCards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleApplauseClick = (cardId: number) => {
    setApplauseClicks((prev) => {
      const currentClicks = prev[cardId] || 0;
      // Toggle: if already clicked, reset to 0, otherwise set to 1
      return { ...prev, [cardId]: currentClicks > 0 ? 0 : 1 };
    });
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

  const handleNextPage = () => {
    if (isTransitioning || currentPage === totalPages - 1) return;
    setSlideDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 50);
    }, 400);
  };

  return (
    <section className={`flex flex-col items-start ${isMobile ? 'py-10' : isTablet ? 'px-10 py-16' : 'px-[120px] py-[150px]'} w-full bg-[#040b11]`}>
      <div className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} py-0 w-full bg-[#040b11] max-w-[1680px] mx-auto ${isMobile ? 'mb-6' : 'mb-[50px]'}`}>
        <header className={`flex flex-col ${isMobile ? 'items-start' : 'items-center'} gap-2.5 w-full relative`}>
          {/* 좌측 장식 이미지 */}
          {!isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-[calc(50%+50px)] opacity-60">
              <img
                className="w-auto h-auto"
                alt="Decoration"
                src={decoImage.src}
              />
            </div>
          )}

          {/* 우측 장식 이미지 */}
          {!isMobile && (
            <div className="absolute right-0 top-1/2 -translate-y-[calc(50%+50px)] opacity-60">
              <img
                className="w-auto h-auto"
                alt="Decoration"
                src={decoImage.src}
              />
            </div>
          )}

          {isMobile ? (
            <div className="relative z-10 flex flex-col items-start py-4 gap-3" style={{ paddingLeft: '20px' }}>
              <h2 className="font-bold tracking-[-0.96px] bg-[linear-gradient(90deg,#6D24C8_0%,#E52B50_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-ria-sans" style={{ fontSize: '16px' }}>
                Next Challenger
              </h2>
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-left tracking-[-0.60px]" style={{ fontSize: '12px', lineHeight: '18px' }}>
                아쉽지만 이번주에는 목표 달성에 실패한 크루들이에요.
                <br />
                실패는 성공의 어머니!
                <br />
                다음번엔 더 잘할 수 있도록 5명에게 박수를 보내주세요!
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center py-4 gap-4">
              <div className="flex items-center gap-5">
                <img
                  className="flex-shrink-0 w-6 h-6"
                  alt="Logo"
                  src="https://c.animaapp.com/O1XpzcZm/img/logo-3.svg"
                />
                <h2 className="font-bold tracking-[-0.96px] bg-[linear-gradient(90deg,#6D24C8_0%,#E52B50_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-ria-sans whitespace-nowrap text-[32px] leading-[40px]">
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
        <div className={`${!isMobile && !isTablet ? 'max-w-[1680px] mx-auto w-full relative' : 'w-full'}`}>
          {!isMobile && !isTablet && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <img
                className="w-[915px] h-[877px]"
                alt="Next Challenger illustration"
                src="https://c.animaapp.com/O1XpzcZm/img/image-4@2x.png"
              />
            </div>
          )}

          <div className={`grid ${isMobile || isTablet ? 'grid-cols-1' : 'grid-cols-2'} ${isMobile ? 'w-full items-center justify-items-center' : 'gap-[30px]'} ${isTablet ? 'w-[480px] mx-auto' : !isMobile ? 'w-[1000px]' : ''} relative z-10 transition-all duration-500 ease-out ${
            isTransitioning
              ? slideDirection === 'left'
                ? 'opacity-0 -translate-x-20'
                : 'opacity-0 translate-x-20'
              : 'opacity-100 translate-x-0'
          }`}>
          {currentCards.map((card) => (
            <article key={card.id} className={`relative w-full ${isMobile ? 'mb-[30px] flex justify-center' : ''}`}>
              {isMobile ? (
                <div className="relative p-[1px] rounded-md bg-gradient-to-r from-[#6D24C8] to-[#E52B50]" style={{ width: 'calc(100vw - 40px)', maxWidth: '380px', height: 'clamp(87px, 23vw, 120px)' }}>
                  <Card className="relative w-full h-full bg-gradient-to-r from-[#3d1a2d] to-[#2d1a1f] border-0 rounded-md overflow-hidden">
                    <CardContent className="p-0 relative w-full h-full">
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
                      <img
                        className="absolute object-contain cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:brightness-125 active:scale-95"
                        style={{
                          width: 'clamp(126px, 31.5vw, 168px)',
                          height: 'clamp(126px, 31.5vw, 168px)',
                          bottom: '-30px',
                          right: '-35px'
                        }}
                        alt="Badge"
                        src={(applauseClicks[card.id] || 0) > 0 ? buttonApplauseChecked.src : "/buttonApplause.png"}
                        onClick={() => handleApplauseClick(card.id)}
                      />
                    </div>

                  </CardContent>
                  </Card>

                  {/* 다음 기회에... badge at top center - skewed rectangle */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-50" style={{ top: 'clamp(-14px, -3.6vw, -11px)' }}>
                    <div className="inline-flex items-center justify-center bg-[#2d1a1f] border-2 border-[#E52B50] shadow-[0px_0px_20px_#E52B5066] rounded-md" style={{
                      padding: 'clamp(5px, 1.35vw, 7px) clamp(11px, 2.7vw, 14px)',
                      transform: 'skewX(-10deg)'
                    }}>
                      <span className="font-bold text-[#E52B50] leading-[normal] whitespace-nowrap font-ria-sans" style={{
                        fontSize: 'clamp(11px, 2.7vw, 13px)',
                        transform: 'skewX(10deg)',
                        display: 'inline-block'
                      }}>
                        다음 기회에...
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Card
                  className={`relative w-full h-[235px] bg-transparent border-0`}
                >
                <CardContent className="p-0 h-[235px]">
                  <div className="flex flex-col w-full h-[215px] items-start gap-2.5 pt-[37px] pb-[30px] px-[30px] absolute top-5 left-0">
                    <img
                      className="absolute w-[100.00%] h-full top-0 left-0"
                      alt="Background"
                      src={card.bgImage}
                    />

                    <div className="flex flex-col w-full max-w-[422px] h-[148px] items-start gap-6 relative">
                      <div className="flex h-[52px] items-end gap-[13px] w-full">
                        <img
                          className="w-[51px] h-[51px] mb-[-0.50px] ml-[-0.50px] aspect-[1] object-cover"
                          alt="Profile"
                          src={card.profileImage}
                        />

                        <div className="inline-flex items-center justify-end gap-[38px]">
                          <div className="flex flex-col w-full max-w-[359px] h-[52px] items-start gap-[3.3px] pt-0 pb-px px-0 relative">
                            <h3 className="flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-surface-main text-[22px] tracking-[-0.66px] leading-[26.4px]">
                              {card.title}
                            </h3>

                            <p className="flex items-center justify-center w-fit [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-base tracking-[-0.48px] leading-[19.2px] whitespace-nowrap">
                              {card.crewName}
                            </p>

                            <img
                              className="absolute -top-0.5 left-[285px] w-[74px] h-[74px] object-cover"
                              alt="Background decoration"
                              src={card.bgSubImage}
                            />
                          </div>
                        </div>
                      </div>

                      <p className="w-[334px] h-[72px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base tracking-[-0.48px] leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                        {card.description}
                      </p>
                    </div>

                    <img
                      className="absolute top-[89px] left-[362px] w-[190px] h-48 cursor-pointer mix-blend-multiply transition-all duration-300 ease-out hover:scale-105 hover:brightness-125"
                      alt="Applause button"
                      src={(applauseClicks[card.id] || 0) > 0 ? buttonApplauseChecked.src : buttonApplause.src}
                      onClick={() => handleApplauseClick(card.id)}
                    />
                  </div>

                  <div className="absolute top-[-16px] left-1/2 -translate-x-1/2">
                    <img
                      className="w-[162px] h-auto object-contain"
                      alt="다음 기회에 배지"
                      src={badgeImage.src}
                    />
                  </div>
                </CardContent>
                </Card>
              )}
            </article>
          ))}
          </div>
        </div>

        {/* Pagination buttons */}
        <div className={`${!isMobile && !isTablet ? 'max-w-[1680px] mx-auto w-full relative' : 'w-full'}`}>
          <div className={`flex justify-center ${!isMobile && !isTablet ? 'w-[1000px] mt-[64px]' : 'w-full'} ${isMobile ? 'mt-0' : isTablet ? 'mt-8' : ''}`}>
            <div className="relative cursor-pointer">
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
    </section>
  );
};
