import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { CalendarSection } from "./sections/CalendarSection";
import { HeaderSection } from "./sections/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NextChallengerSection } from "./sections/NextChallengerSection";
import { RecognitionSection } from "./sections/RecognitionSection";
import { WinnerListSection } from "./sections/WinnerListSection";

export const ElementTabletAuto = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;
  const isDesktop = screenWidth >= 1280;

  return (
    <div className={`relative w-full ${isDesktop ? 'min-w-[1280px]' : isTablet ? 'min-w-[768px]' : isMobile ? 'min-w-[320px]' : 'min-w-[320px]'} overflow-hidden bg-bg`} data-model-id="186:26162">
      <div className="flex flex-col w-full">
        <HeaderSection />
        <CalendarSection />
        <MainContentSection />
        <WinnerListSection />
        <NextChallengerSection />
        <RecognitionSection />
      </div>
    </div>
  );
};
