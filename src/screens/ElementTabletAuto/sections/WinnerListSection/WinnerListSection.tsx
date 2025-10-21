import React, { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";
import crownIcon from "../../../../icons/bgSub.png";
import paginationImage from "../../../../assets/pagenation.png";
import buttonInspire from "../../../../icons/buttonInspire.png";
import buttonInspireCheck from "../../../../icons/buttonInspireCheck.png";

const winnerData = [
  {
    id: 1,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "프로토타입 테스트 진행하기",
    name: "김도윤 크루",
    description:
      "테스트 유저 3명의 피드백을 반영해 인터랙션을 개선했어요 끝내고 나니 뿌듯하네요 ㅎㅎ 생각보다 많이 어렵지는 않았고요 ~",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 2,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-12@2x.png",
    title: "데이터 분석 리포트 작성하기",
    name: "안나연 크루",
    description:
      "이번 주 주요 진행 사항을 정리한 리포트를 작성했어요. 전체 일정이 명확해졌어요",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 3,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-14@2x.png",
    title: "팀 미팅 회의록 업로드하기",
    name: "최주진 크루",
    description:
      "오늘 회의 핵심 요점을 정리해 노션에 업로드 완료! 협업 속도가 빨라졌고, 자체적으로 회의록을 작성해보면서, 필요 불필요 내용을 판단하는 능력이 길러진 듯 해요!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
  {
    id: 4,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "데이터 분석 리포트 작성하기",
    name: "이서연 크루",
    description:
      "2주 동안 수집한 데이터를 분석해서 인사이트를 도출했어요. 팀원들에게 공유하니 좋은 반응이었어요!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 5,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-12@2x.png",
    title: "코드리뷰 진행 및 피드백 제공",
    name: "박지훈 크루",
    description:
      "팀원들의 코드를 꼼꼼히 리뷰하고 건설적인 피드백을 제공했어요. 코드 품질이 많이 향상되었습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 6,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-14@2x.png",
    title: "UI 개선 작업 완료하기",
    name: "정민아 크루",
    description:
      "사용자 피드백을 반영해서 UI를 개선했어요. 더 직관적이고 사용하기 편한 인터페이스가 되었습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
  {
    id: 7,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "알고리즘 문제 풀이",
    name: "최준영 크루",
    description:
      "어려운 알고리즘 문제를 해결했어요! 오랜 시간 고민한 끝에 효율적인 해결책을 찾았습니다.",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 8,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-12@2x.png",
    title: "멘토링 세션 진행",
    name: "강서윤 크루",
    description:
      "후배 개발자들을 위한 멘토링을 진행했어요. 함께 성장하는 시간이었습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 9,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-14@2x.png",
    title: "프로젝트 배포 완료",
    name: "윤지호 크루",
    description:
      "3개월간 진행한 프로젝트를 성공적으로 배포했어요! 팀워크가 빛을 발한 순간이었습니다.",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
  {
    id: 10,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "기술 블로그 작성",
    name: "박하은 크루",
    description:
      "새로 학습한 기술을 블로그에 정리했어요. 많은 분들이 도움을 받았으면 좋겠어요!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310.svg",
  },
  {
    id: 11,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-12@2x.png",
    title: "오픈소스 기여",
    name: "이도현 크루",
    description:
      "오픈소스 프로젝트에 첫 기여를 했어요! PR이 머지되어서 너무 기쁩니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-1.svg",
  },
  {
    id: 12,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-14@2x.png",
    title: "컨퍼런스 발표",
    name: "정예린 크루",
    description:
      "개발 컨퍼런스에서 발표를 했어요. 떨렸지만 좋은 경험이었습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg",
    badgeImage: "https://c.animaapp.com/O1XpzcZm/img/rectangle-34625310-2.svg",
  },
];

export const WinnerListSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;

  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [inspireClicks, setInspireClicks] = useState<Record<number, number>>({});
  const cardsPerPage = isMobile || isTablet ? 6 : 6;
  const totalPages = Math.max(1, Math.ceil(winnerData.length / cardsPerPage));

  const currentCards = winnerData.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleInspireClick = (winnerId: number) => {
    setInspireClicks((prev) => {
      const currentClicks = prev[winnerId] || 0;
      // Toggle: if already clicked, reset to 0, otherwise set to 1
      return { ...prev, [winnerId]: currentClicks > 0 ? 0 : 1 };
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
    <section className={`flex flex-col items-start ${isMobile ? 'px-5 py-10' : isTablet ? 'px-10 py-16' : 'px-[120px] py-20'} w-full bg-[#040b11]`}>
      <div className={`flex flex-col items-center w-full max-w-[1680px] mx-auto ${isMobile ? 'gap-6' : 'gap-[50px]'}`}>
        <header className={`inline-flex flex-col items-center gap-2.5 ${isMobile ? 'mb-6' : 'mb-[50px]'}`}>
          <div className="relative w-[315px] h-[64.03px]">
            <div className="inline-flex items-center gap-5 absolute top-[18px] left-0">
              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-3.svg"
              />

              <h2 className="w-fit mt-[-1.00px] bg-[linear-gradient(90deg,rgba(255,234,148,1)_0%,rgba(255,255,255,1)_53%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-[32px] tracking-[0] leading-[normal] font-ria-sans">
                Winner List
              </h2>

              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-4.svg"
              />
            </div>

            <div className="absolute top-px left-16 w-[217px] h-9">
              <img
                className="absolute top-[-27px] left-[165px] w-[90px] h-[91px]"
                alt="Star"
                src="https://c.animaapp.com/O1XpzcZm/img/star-6.svg"
              />

              <img
                className="absolute top-[-38px] -left-10 w-[85px] h-[85px]"
                alt="Star"
                src="https://c.animaapp.com/O1XpzcZm/img/star-7.svg"
              />

              <img
                className="absolute -top-9 left-[-33px] w-[91px] h-[93px]"
                alt="Star"
                src="https://c.animaapp.com/O1XpzcZm/img/star-9.svg"
              />

              <img
                className="absolute top-[-30px] left-[59px] w-[97px] h-[101px]"
                alt="Star"
                src="https://c.animaapp.com/O1XpzcZm/img/star-10.svg"
              />
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-[15px]">
            <p className={`w-fit mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface text-center tracking-[-0.60px] ${isMobile ? 'text-sm leading-[21px]' : 'text-xl leading-[30px]'}`}>
              이번주 목표를 달성한 크루들을 축하해주세요!
              {!isMobile && <br />}
              {!isMobile && (
                <>특히 인상 깊은 멘트를 남긴 크루 5명에게 &quot;귀감&quot;을 보내주세요!</>
              )}
            </p>
          </div>
        </header>

      </div>

      <div className={`py-0 flex flex-col items-start w-full relative ${isMobile ? 'gap-6 mt-6' : 'gap-[50px] mt-[50px]'}`}>
        {/* Main content wrapper with max-width for centering */}
        <div className={`${!isMobile && !isTablet ? 'max-w-[1680px] mx-auto w-full relative' : 'w-full'}`}>
          {/* Left side illustration - only on desktop */}
          {!isMobile && !isTablet && (
            <div className="absolute left-[120px] top-1/2 -translate-y-1/2">
              <img
                className="w-[915px] h-[880px]"
                alt="Winner illustration"
                src="https://c.animaapp.com/O1XpzcZm/img/image.png"
              />
            </div>
          )}

          <div className={`grid ${isMobile || isTablet ? 'grid-cols-1' : 'grid-cols-2'} gap-[30px] ${isMobile ? 'w-full' : isTablet ? 'w-[480px] mx-auto' : 'w-[980px] ml-auto'} relative z-10 transition-all duration-500 ease-out ${
            isTransitioning
              ? slideDirection === 'left'
                ? 'opacity-0 -translate-x-20'
                : 'opacity-0 translate-x-20'
              : 'opacity-100 translate-x-0'
          }`}>
          {currentCards.map((winner) => (
            <article key={winner.id} className="relative w-full">
              {isMobile ? (
                <Card className="relative w-full bg-gradient-to-r from-[#1a3d2e] via-[#1a2f26] to-[#1a1f26] border-0 rounded-lg overflow-hidden">
                  <CardContent className="p-0 relative w-full">
                    {/* Yellow diagonal line bottom-left */}
                    <div className="absolute left-0 bottom-0 w-16 h-16">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="64" x2="64" y2="0" stroke="#FFD700" strokeWidth="3" />
                      </svg>
                    </div>

                    <div className="flex flex-col items-start p-4 pt-8 relative">
                      <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs mb-1">
                        {winner.name}
                      </p>
                      <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-base mb-2">
                        {winner.title}
                      </h3>
                      <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-sm leading-[21px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] mb-2 pr-16">
                        {winner.description}
                      </p>

                      {/* Profile image bottom-right */}
                      <img
                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full object-cover"
                        alt="Profile"
                        src={winner.profileImage}
                      />
                    </div>
                    <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 bg-[#21e786] rounded-full px-3 py-1">
                      <span className="font-bold text-[#040b11] text-xs font-ria-sans">
                        목표 달성!
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className={`relative w-full h-[235px] bg-transparent border-0`}
                >
                  <CardContent className="p-0 h-[235px]">
                    <div className="flex flex-col w-full h-[215px] items-start gap-2.5 pt-[37px] pb-[30px] px-[30px] absolute top-5 left-0">
                      <img
                        className="absolute w-[100.00%] h-full top-0 left-0"
                        alt="Background"
                        src={winner.bgImage}
                      />

                      <div className="flex flex-col w-full max-w-[422px] h-[148px] items-start gap-6 relative">
                        <div className="flex h-[52px] items-end gap-[13px] w-full">
                          <img
                            className="w-[51px] h-[51px] mb-[-0.50px] ml-[-0.50px] aspect-[1] object-cover"
                            alt="Profile"
                            src={winner.profileImage}
                          />

                          <div className="inline-flex items-center justify-end gap-[38px]">
                            <div className="flex flex-col w-full max-w-[359px] h-[52px] items-start gap-[3.3px] pt-0 pb-px px-0 relative">
                              <h3 className="flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-surface-main text-[22px] tracking-[-0.66px] leading-[26.4px]">
                                {winner.title}
                              </h3>

                              <p className="flex items-center justify-center w-fit [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-base tracking-[-0.48px] leading-[19.2px] whitespace-nowrap">
                                {winner.name}
                              </p>

                              {/* Crown Icon */}
                              <img
                                className="absolute -top-0.5 left-[285px] w-[74px] h-[74px] object-contain"
                                alt="Crown decoration"
                                src={crownIcon.src}
                              />
                            </div>
                          </div>
                        </div>

                        <p className="w-[334px] h-[72px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base tracking-[-0.48px] leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                          {winner.description}
                        </p>
                      </div>

                      <img
                        className="absolute cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:brightness-125 active:scale-95"
                        alt="Inspire button"
                        src={(inspireClicks[winner.id] || 0) > 0 ? buttonInspireCheck.src : buttonInspire.src}
                        onClick={() => handleInspireClick(winner.id)}
                        style={{
                          width: (inspireClicks[winner.id] || 0) > 0 ? '70px' : '50px',
                          height: (inspireClicks[winner.id] || 0) > 0 ? '70px' : '50px',
                          objectFit: 'cover',
                          bottom: (inspireClicks[winner.id] || 0) > 0 ? '0px' : '10px',
                          right: (inspireClicks[winner.id] || 0) > 0 ? '-10px' : '0px'
                        }}
                      />
                    </div>

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0a1a12] rounded-full border-2 border-[#21e786] shadow-[0px_0px_20px_#21e78666]">
                        <span className="text-lg">🏅</span>
                        <span className="font-bold text-[#21e786] text-base leading-[normal] whitespace-nowrap font-ria-sans">
                          목표 달성!
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </article>
          ))}
          </div>
        </div>

        {/* Pagination */}
        <div className={`${!isMobile && !isTablet ? 'w-[980px] ml-auto flex justify-center mt-[64px]' : 'flex justify-center mt-8 w-full'}`}>
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
    </section>
  );
};
