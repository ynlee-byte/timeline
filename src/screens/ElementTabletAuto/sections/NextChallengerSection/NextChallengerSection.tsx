import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";

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
    applauseButton: "https://c.animaapp.com/O1XpzcZm/img/buttonapplause.svg",
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
    applauseButton: "https://c.animaapp.com/O1XpzcZm/img/buttonapplause-1.svg",
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
    applauseButton: "https://c.animaapp.com/O1XpzcZm/img/buttonapplause-2.svg",
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
    applauseButton: "https://c.animaapp.com/O1XpzcZm/img/buttonapplause.svg",
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
    applauseButton: "https://c.animaapp.com/O1XpzcZm/img/buttonapplause-1.svg",
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
    applauseButton: "https://c.animaapp.com/O1XpzcZm/img/buttonapplause-2.svg",
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
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;

  return (
    <section className={`flex flex-col items-start ${isMobile ? 'px-5' : isTablet ? 'px-10' : 'px-[120px]'} py-[150px] w-full bg-[#040b11]`}>
      <div className="flex flex-col items-center gap-[50px] py-0 w-full bg-[#040b11] max-w-[1680px] mx-auto">
        <header className="flex flex-col items-center gap-2.5 w-full">
          <div className="relative w-[417px] h-[69.03px]">
            <div className="inline-flex items-center gap-5 absolute top-[13px] left-0">
              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-5.svg"
              />

              <h2 className="w-fit mt-[-1.00px] bg-[linear-gradient(131deg,rgba(109,36,200,1)_0%,rgba(229,43,80,1)_71%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-transparent text-[32px] tracking-[0] leading-[normal]">
                Next Challenger
              </h2>

              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-6.svg"
              />
            </div>

            <div className="absolute top-px left-3.5 w-[364px] h-[69px] flex">
              {decorativeSquares.map((square, index) => (
                <div
                  key={index}
                  className={`${square.width} ${square.height} ${square.marginTop} ${square.marginLeft} bg-[#4c4c4c] rounded-[3px] ${square.rotation}`}
                />
              ))}
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-[15px] ml-[-0.50px] mr-[-0.50px]">
            <p className="w-fit mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface text-xl text-center tracking-[-0.60px] leading-[30px]">
              아쉽지만 이번주에는 목표 달성에 실패한 크루들이에요.
              <br />
              실패는 성공의 어머니! 다음번엔 더 잘할 수 있도록 5명에게 박수를
              보내주세요!
            </p>
          </div>
        </header>

      </div>

      <div className="bg-[#040b11] flex flex-col items-start gap-[50px] w-full relative">
        {!isMobile && !isTablet && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[915px] h-[877px]">
            <img
              className="w-full h-full object-cover"
              alt="Next Challenger illustration"
              src="https://c.animaapp.com/O1XpzcZm/img/image-4@2x.png"
            />
          </div>
        )}

        <div className={`grid ${isMobile || isTablet ? 'grid-cols-1' : 'grid-cols-2'} gap-[30px] ${isMobile || isTablet ? 'w-full' : 'w-[1000px] ml-[120px]'} relative z-10`}>
          {challengerCards.map((card) => (
            <Card
              key={card.id}
              className={`relative w-full ${isMobile ? 'h-[180px]' : 'h-[235px]'} bg-transparent border-0`}
            >
              {isMobile ? (
                <CardContent className="p-0 relative w-full h-full bg-[#1a1f26] border-2 border-[#e52b50] rounded-lg overflow-hidden">
                  <div className="flex flex-col items-start p-4 relative">
                    <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs mb-1">
                      {card.crewName}
                    </p>
                    <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-lg mb-2">
                      {card.title}
                    </h3>
                    <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-sm leading-[21px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                      {card.description}
                    </p>
                    <img
                      className="absolute bottom-4 right-4 w-10 h-10"
                      alt="Applause button"
                      src="https://c.animaapp.com/O1XpzcZm/img/buttonapplause-2.svg" // 번개 모양 아이콘으로 변경
                    />
                  </div>
                  <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-[#1a1f26] border-2 border-[#e52b50] rounded-full px-4 py-1">
                    <span className="[font-family:'Ria_Sans-Bold',Helvetica] font-bold text-[#e52b50] text-sm">
                      다음 기회에..
                    </span>
                  </div>
                </CardContent>
              ) : (
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
                      className="absolute top-[89px] left-[362px] w-[190px] h-48 cursor-pointer"
                      alt="Applause button"
                      src={card.applauseButton}
                    />
                  </div>

                  <div className="absolute top-0 left-[155px] w-[162px] h-[43px]">
                    <img
                      className="absolute top-[-30px] -left-7 w-[217px] h-[103px]"
                      alt="Badge background"
                      src={card.badgeImage}
                    />

                    <div className="inline-flex items-center gap-2 absolute top-3 left-[34px]">
                      <span className="mt-[-1.00px] [text-shadow:0px_0px_40px_#ff8fa54c] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-[#e52b50] leading-[19.2px] text-base tracking-[-0.48px] whitespace-nowrap">
                        다음 기회에..
                      </span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className={`${isMobile || isTablet ? 'mx-auto' : 'ml-[120px]'}`}>
          <img
            className="mb-[-0.50px]"
            alt="Pagination"
            src="https://c.animaapp.com/O1XpzcZm/img/pagenation-2.svg"
          />
        </div>
      </div>
    </section>
  );
};
