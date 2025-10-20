import React, { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWindowWidth } from "../../../../breakpoints";
import { ReviewCardModal } from "../../../../components/ReviewCardModal";

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
    title: "다음주 목표",
    icon: {
      vector1: "https://c.animaapp.com/O1XpzcZm/img/vector-1.svg", // Heart icon
    },
  },
];

export const MainContentSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ReviewCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className={`flex flex-col items-center justify-center gap-[50px] ${isMobile ? 'px-5' : isTablet ? 'px-10' : 'px-[120px]'} py-20 relative w-full bg-[#040b11]`}>
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

      <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} items-${isMobile || isTablet ? 'center' : 'start'} justify-center gap-[30px] relative w-full`}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            className={`relative w-[330px] ${isMobile ? 'h-[80px]' : 'h-[341px]'} bg-[#141b22] border-2 border-[#21e786] rounded-lg overflow-hidden`}
          >
            <CardContent className="p-0 relative w-full h-full">
              {isMobile ? (
                <div className="flex items-center justify-between p-4 h-full">
                  <div className="flex items-center gap-4">
                    {card.type === "review" && (
                      <img
                        className="w-10 h-10"
                        alt="Chat bubble icon"
                        src={card.icon.vector}
                      />
                    )}
                    {card.type === "goal" && (
                      <img
                        className="w-10 h-10"
                        alt="Heart icon"
                        src={card.icon.vector1}
                      />
                    )}
                    <div className="flex flex-col items-start">
                      {card.badge && (
                        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs">
                          {card.badge}
                        </p>
                      )}
                      <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-lg">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  {card.type === "judgment" ? (
                    <Badge className="inline-flex items-center justify-center gap-2.5 px-3 py-1.5 bg-[#040b11] rounded-[50px] border border-solid border-[#21e786] shadow-[0px_0px_40px_#21e7864c] hover:bg-[#040b11]">
                      <div className="inline-flex items-center gap-[5px]">
                        <img
                          className="w-[20px] h-[20px]"
                          alt="Icon medal"
                          src="https://c.animaapp.com/O1XpzcZm/img/iconmedal-4@2x.png"
                        />
                        <span className="[text-shadow:0px_0px_40px_#b0ffd8] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-[#75ffbb] text-xs tracking-[-0.36px] leading-[14.4px] whitespace-nowrap">
                          {card.medalBadge}
                        </span>
                      </div>
                    </Badge>
                  ) : (
                    <img
                      className="w-6 h-6"
                      alt="Dropdown arrow"
                      src="https://c.animaapp.com/O1XpzcZm/img/vector-2188.svg" // Dropdown arrow icon
                    />
                  )}
                </div>
              ) : (
                // Desktop/Tablet design (existing)
                <>
                  <div className="absolute top-0 left-0 w-[330px] h-[344px] bg-[#141b22]" />
                  {card.type === "review" && (
                    <>
                      <div className="inline-flex flex-col h-40 items-center gap-5 absolute top-[50px] left-[110px]">
                        <div className="relative w-20 h-[74px] aspect-[1.09]">
                          <img
                            className="absolute w-[60.13%] h-[65.96%] top-[-84.88%] left-[-70.13%]"
                            alt="Vector"
                            src={card.icon.vector}
                          />
                          <img
                            className="absolute w-[100.00%] h-full top-0 left-0"
                            alt="Group"
                            src="https://c.animaapp.com/O1XpzcZm/img/group-30-1@2x.png"
                          />
                        </div>
                        <div className="inline-flex flex-col items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                          <Badge
                            variant="outline"
                            className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px] relative flex-[0_0_auto] rounded-[30px] border border-solid border-white bg-transparent"
                          >
                            <span className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
                              {card.badge}
                            </span>
                          </Badge>
                          <h2 className="relative w-fit [font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-2xl text-center tracking-[0] leading-8 whitespace-nowrap">
                            {card.title}
                          </h2>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 absolute top-[243px] left-[77px] bg-[#21e786] hover:bg-[#1bc970] h-auto z-10 cursor-pointer"
                      >
                        <span className="relative w-fit mt-[-2.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111] text-lg tracking-[-0.54px] leading-6 whitespace-nowrap">
                          리뷰 카드 생성하기
                        </span>
                      </Button>
                    </>
                  )}
                  {card.type === "judgment" && (
                    <>
                      <div className="inline-flex items-center gap-[27px] absolute top-[30px] left-[30px]">
                        <div className="inline-flex flex-col items-start justify-center gap-2.5 relative flex-[0_0_auto]">
                          <div className="inline-flex items-start justify-center gap-2.5 relative flex-[0_0_auto]">
                            <div className="flex w-[150px] items-center justify-between relative">
                              <div className="relative w-[30px] h-7 shadow-[0px_4px_60px_#5bcf9166] aspect-[1.08] bg-[url(https://c.animaapp.com/O1XpzcZm/img/group-2-1@2x.png)] bg-[100%_100%]" />
                              <h2 className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-2xl text-center tracking-[0] leading-8 whitespace-nowrap">
                                {card.title}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <Badge className="inline-flex flex-col items-center justify-center gap-2.5 px-3 py-1.5 relative flex-[0_0_auto] mr-[-1.00px] bg-[#040b11] rounded-[50px] border border-solid border-[#21e786] shadow-[0px_0px_40px_#21e7864c] hover:bg-[#040b11]">
                          <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                            <img
                              className="relative w-[93px] h-[97px] mt-[-40.00px] mb-[-40.00px] ml-[-40.00px]"
                              alt="Icon medal"
                              src="https://c.animaapp.com/O1XpzcZm/img/iconmedal-4@2x.png"
                            />
                            <span className="relative w-fit [text-shadow:0px_0px_40px_#b0ffd8] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-[#75ffbb] text-xs tracking-[-0.36px] leading-[14.4px] whitespace-nowrap">
                              {card.medalBadge}
                            </span>
                          </div>
                        </Badge>
                      </div>
                      <img
                        className="absolute top-[82px] left-0 w-[330px] h-px object-cover"
                        alt="Vector"
                        src="https://c.animaapp.com/O1XpzcZm/img/vector-2188.svg"
                      />
                      <div className="flex flex-col w-[270px] items-start gap-2 absolute top-[118px] left-[30px]">
                        <p className="mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs tracking-[-0.36px] leading-[normal] relative w-fit whitespace-nowrap">
                          활동
                        </p>
                        <h3 className="relative w-fit [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-lg tracking-[-0.54px] leading-[normal] whitespace-nowrap">
                          위즈덤 활동 피드백 제공하기
                        </h3>
                      </div>
                      <div className="flex flex-col w-[270px] items-start gap-2 absolute top-[181px] left-[30px]">
                        <p className="mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-xs tracking-[-0.36px] leading-[normal] relative w-fit whitespace-nowrap">
                          자신감 멘트
                        </p>
                        <p className="relative self-stretch [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base tracking-[-0.48px] leading-6">
                          난 멋져 난 해냈어 피드백을 5개 이상인 총 7개를 크루들에게 제공했어! 난 짱이야 ~ 난 짱이야 ~
                        </p>
                        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                          <img
                            className="relative w-[22.2px] h-[21.82px]"
                            alt="Icon"
                            src="https://c.animaapp.com/O1XpzcZm/img/icon-1@2x.png"
                          />
                          <span className="relative w-fit [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xs text-center tracking-[-0.36px] leading-[normal] whitespace-nowrap">
                            22
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {card.type === "goal" && (
                    <>
                      <div className="gap-5 top-[50px] left-[110px] inline-flex flex-col items-center absolute">
                        <div className="relative w-20 h-[74px] shadow-[0px_4px_60px_#f648d166]">
                          <img
                            className="absolute w-[47.74%] h-[81.71%] top-[11.34%] left-[18.43%]"
                            alt="Vector"
                            src={card.icon.vector1}
                          />
                          <img
                            className="absolute w-[47.74%] h-[81.71%] top-[11.35%] left-[9.25%]"
                            alt="Vector"
                            src={card.icon.vector2}
                          />
                        </div>
                        <div className="inline-flex flex-col items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                          <Badge
                            variant="outline"
                            className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px] relative flex-[0_0_auto] rounded-[30px] border border-solid border-white bg-transparent"
                          >
                            <span className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
                              {card.badge}
                            </span>
                          </Badge>
                          <h2 className="relative w-fit [font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-2xl text-center tracking-[0] leading-8 whitespace-nowrap">
                            {card.title}
                          </h2>
                        </div>
                      </div>
                      <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 absolute top-[243px] left-[77px] bg-[#21e786] hover:bg-[#1bc970] h-auto">
                        <span className="relative w-fit mt-[-2.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#111111] text-lg tracking-[-0.54px] leading-6 whitespace-nowrap">
                          목표 카드 생성하기
                        </span>
                      </Button>
                    </>
                  )}
                  <img
                    className="absolute w-[353px] h-[367px] -top-3 -left-3 pointer-events-none"
                    alt="Hover"
                    src="https://c.animaapp.com/O1XpzcZm/img/hover-5@2x.png"
                  />
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <img
        className="absolute w-[105.37%] h-[70.42%] top-[5.97%] left-[-16.78%]"
        alt="Bg deco"
        src="https://c.animaapp.com/O1XpzcZm/img/bgdeco.png"
      />
    </section>
    </>
  );
};
