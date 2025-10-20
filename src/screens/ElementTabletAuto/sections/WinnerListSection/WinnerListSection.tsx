import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";

const winnerData = [
  {
    id: 1,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "프로토타입 테스트 진행하기",
    name: "김도윤 크루",
    description:
      "테스트 유저 3명의 피드백을 반영해 인터랙션을 개선했어요 끝내고 나니 뿌듯하네요 ㅎㅎ 생각보다 많이 어렵지는 않았고요 ~",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
    buttonImage: "https://c.animaapp.com/O1XpzcZm/img/buttoninspire.svg",
  },
  {
    id: 2,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-12@2x.png",
    title: "데이터 분석 리포트 작성하기",
    name: "안나연 크루",
    description:
      "이번 주 주요 진행 사항을 정리한 리포트를 작성했어요. 전체 일정이 명확해졌어요",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
    buttonImage: "https://c.animaapp.com/O1XpzcZm/img/buttoninspire-1.svg",
  },
  {
    id: 3,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-14@2x.png",
    title: "팀 미팅 회의록 업로드하기",
    name: "최주진 크루",
    description:
      "오늘 회의 핵심 요점을 정리해 노션에 업로드 완료! 협업 속도가 빨라졌고, 자체적으로 회의록을 작성해보면서, 필요 불필요 내용을 판단하는 능력이 길러진 듯 해요!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg",
    buttonImage: "https://c.animaapp.com/O1XpzcZm/img/buttoninspire-2.svg",
  },
  {
    id: 4,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-16@2x.png",
    title: "데이터 분석 리포트 작성하기",
    name: "이서연 크루",
    description:
      "2주 동안 수집한 데이터를 분석해서 인사이트를 도출했어요. 팀원들에게 공유하니 좋은 반응이었어요!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-2.svg",
    buttonImage: "https://c.animaapp.com/O1XpzcZm/img/buttoninspire.svg",
  },
  {
    id: 5,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-12@2x.png",
    title: "코드리뷰 진행 및 피드백 제공",
    name: "박지훈 크루",
    description:
      "팀원들의 코드를 꼼꼼히 리뷰하고 건설적인 피드백을 제공했어요. 코드 품질이 많이 향상되었습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-3.svg",
    buttonImage: "https://c.animaapp.com/O1XpzcZm/img/buttoninspire-1.svg",
  },
  {
    id: 6,
    profileImage: "https://c.animaapp.com/O1XpzcZm/img/image-14@2x.png",
    title: "UI 개선 작업 완료하기",
    name: "정민아 크루",
    description:
      "사용자 피드백을 반영해서 UI를 개선했어요. 더 직관적이고 사용하기 편한 인터페이스가 되었습니다!",
    bgImage: "https://c.animaapp.com/O1XpzcZm/img/bg-4.svg",
    buttonImage: "https://c.animaapp.com/O1XpzcZm/img/buttoninspire-2.svg",
  },
];

export const WinnerListSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;

  return (
    <section className={`flex flex-col items-start ${isMobile ? 'px-5' : isTablet ? 'px-10' : 'px-[120px]'} py-20 w-full bg-[#040b11]`}>
      <div className="flex flex-col items-center gap-[50px] w-full max-w-[1680px] mx-auto">
        <header className="inline-flex flex-col items-center gap-2.5">
          <div className="relative w-[315px] h-[64.03px]">
            <div className="inline-flex items-center gap-5 absolute top-[18px] left-0">
              <img
                className="w-6 h-6"
                alt="Logo"
                src="https://c.animaapp.com/O1XpzcZm/img/logo-3.svg"
              />

              <h2 className="w-fit mt-[-1.00px] bg-[linear-gradient(90deg,rgba(255,234,148,1)_0%,rgba(255,255,255,1)_53%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-transparent text-[32px] tracking-[0] leading-[normal]">
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
            <p className="w-fit mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface text-xl text-center tracking-[-0.60px] leading-[30px]">
              이번주 목표를 달성한 크루들을 축하해주세요!
              <br />
              특히 인상 깊은 멘트를 남긴 크루 5명에게 &quot;귀감&quot;을
              보내주세요!
            </p>
          </div>
        </header>

      </div>

      <div className="py-0 flex flex-col items-start gap-[50px] w-full relative">
        {!isTablet && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[915px] h-[877px]">
            <img
              className="w-full h-full object-cover"
              alt="Winner illustration"
              src="https://c.animaapp.com/O1XpzcZm/img/image.png"
            />
          </div>
        )}

        <div className={`grid ${isTablet ? 'grid-cols-1' : 'grid-cols-2'} gap-[30px] ${isTablet ? 'w-full' : 'w-[1000px] ml-[803px]'} relative z-10`}>
          {winnerData.map((winner) => (
            <article key={winner.id} className="relative w-full h-[235px]">
              {isMobile ? (
                <Card className="relative w-full h-[180px] bg-[#1a1f26] border-2 border-[#21e786] rounded-lg overflow-hidden">
                  <CardContent className="p-0 relative w-full h-full">
                    <div className="flex flex-col items-start p-4 relative">
                      <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs mb-1">
                        {winner.name}
                      </p>
                      <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-lg mb-2">
                        {winner.title}
                      </h3>
                      <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-sm leading-[21px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {winner.description}
                      </p>
                      <img
                        className="absolute bottom-4 right-4 w-10 h-10"
                        alt="Inspire button"
                        src="https://c.animaapp.com/O1XpzcZm/img/buttoninspire-2.svg" // 번개 모양 아이콘으로 변경
                      />
                    </div>
                    <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-[#1a1f26] border-2 border-[#21e786] rounded-full px-4 py-1">
                      <span className="[font-family:'Ria_Sans-Bold',Helvetica] font-bold text-[#21e786] text-sm">
                        목표 달성!
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="absolute top-5 left-0 w-full h-[215px]">
                  <Card className="w-full h-[215px] border-0 bg-transparent">
                    <CardContent className="flex flex-col items-start gap-2.5 pt-[37px] pb-[30px] px-[30px] relative h-full p-0">
                      <img
                        className="absolute w-full h-full top-0 left-0"
                        alt="Background"
                        src={winner.bgImage}
                      />

                      <div className="flex flex-col w-full max-w-[422px] h-[148px] items-start gap-6 relative z-10">
                        <div className="flex h-[52px] items-end gap-[13px] w-full">
                          <img
                            className="w-[51px] h-[51px] mb-[-0.50px] ml-[-0.50px] aspect-[1] object-cover"
                            alt={`${winner.name} profile`}
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

                              <img
                                className="absolute -top-0.5 left-[285px] w-[74px] h-[74px] object-cover"
                                alt="Background decoration"
                                src="https://c.animaapp.com/O1XpzcZm/img/bgsub-11@2x.png"
                              />
                            </div>
                          </div>
                        </div>

                        <p className="w-[334px] h-[72px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base tracking-[-0.48px] leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                          {winner.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    variant="ghost"
                    className="absolute w-[10.37%] top-[calc(50.00%_+_47px)] left-[89.52%] h-[51px] p-0 hover:bg-transparent"
                    aria-label="Inspire button"
                  >
                    <img
                      className="w-full h-full"
                      alt="Inspire button"
                      src={winner.buttonImage}
                    />
                  </Button>
                </div>
              )}

              {!isMobile && (
                <Badge className="flex flex-col w-[34.18%] h-[18.99%] items-center justify-center gap-2.5 px-0 py-2.5 absolute top-0 left-[32.99%] bg-[#040b11] rounded-[50px] border border-solid border-[#21e786] shadow-[0px_0px_40px_#21e7864c] hover:bg-[#040b11]">
                  <div className="inline-flex items-center gap-2 mt-[-0.03px]">
                    <img
                      className="w-[97px] h-[102.67px] mt-[-40.00px] mb-[-40.00px] ml-[-40.00px]"
                      alt="Medal icon"
                      src="https://c.animaapp.com/O1XpzcZm/img/iconmedal-3@2x.png"
                    />

                    <span className="[text-shadow:0px_0px_40px_#b0ffd8] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-[#75ffbb] leading-[19.2px] w-fit text-base tracking-[-0.48px] whitespace-nowrap">
                      목표 달성!
                    </span>
                  </div>
                </Badge>
              )}
            </article>
          ))}
        </div>

        <div className={`${isTablet ? 'mx-auto' : 'ml-[803px]'}`}>
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
