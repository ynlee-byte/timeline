import React from "react";
import { Button } from "../../../../components/ui/button";
import { useWindowWidth } from "../../../../breakpoints";

export const HeaderSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;

  return (
    <section className={`relative w-full ${isMobile ? 'h-[680px]' : 'h-[798px]'}`}>
      <header className="absolute top-0 left-0 w-full h-[108px] flex bg-bg overflow-hidden z-10">
        <div className={`flex mt-[29px] w-full h-[50px] ${isMobile ? 'px-3' : isTablet ? 'px-10' : 'px-[120px]'} items-center justify-between max-w-[1920px] mx-auto`}>
          <div className="inline-flex items-center gap-4">
            <img
              className="w-9 h-10"
              alt="Logo"
              src="https://c.animaapp.com/O1XpzcZm/img/logo.svg"
            />
            {!isMobile && (
              <h1 className="font-ria-sans font-normal text-white text-[28px] tracking-[0] leading-[42px] whitespace-nowrap">
                Binabox
              </h1>
            )}
          </div>

          {isMobile || isTablet ? (
            <Button variant="ghost" size="icon" className="w-[50px] h-[50px] p-0 hover:bg-transparent">
              <img className="w-[50px] h-[50px]" alt="Icon menu" src="https://c.animaapp.com/O1XpzcZm/img/iconmenu.svg" />
            </Button>
          ) : (
            <>
              <nav className="flex items-center gap-10">
                <a href="#" className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors">HOME</a>
                <a href="#" className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors">ABOUT</a>
                <a href="#" className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors">ROADMAP</a>
                <a href="#" className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors">COLLECTION</a>
                <a href="#" className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors">FAQS</a>
                <a href="#" className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors">PAGES</a>
              </nav>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="w-10 h-10 p-0 hover:bg-transparent">
                  <img className="w-6 h-6" alt="Search" src="https://c.animaapp.com/O1XpzcZm/img/logo.svg" />
                </Button>
                <Button className="bg-app-primary hover:bg-app-primary/90 text-[#141b22] px-6 py-2 rounded-full [font-family:'Pretendard-SemiBold',Helvetica] font-semibold">
                  로그인
                </Button>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="absolute top-[108px] left-0 w-full h-[690px] bg-[#141b22]" />

      <div className="absolute top-[108px] left-0 w-full h-[690px] flex items-center justify-center">
        <img
          className="absolute top-[250px] left-1/2 -translate-x-1/2 w-[1270px] h-[350px] object-contain"
          alt="Background"
          src="https://c.animaapp.com/O1XpzcZm/img/bg.png"
        />
        <img
          className="absolute top-0 left-0 w-full h-[278px] object-cover"
          alt="Background"
          src="https://c.animaapp.com/O1XpzcZm/img/bg-1.png"
        />

        <div className="relative w-[455px] h-[559px] z-10">
          <img
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[455px] h-[498px] object-cover"
            alt="Character"
            src="https://c.animaapp.com/O1XpzcZm/img/img@2x.png"
          />

          <div className="absolute top-[437px] left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-12">
            <div className="inline-flex flex-col items-center gap-3">
              <h2 className={`[text-shadow:0px_4px_10px_#00000080] font-extrabold text-white ${isMobile ? 'text-[32px] leading-[32px]' : 'text-[80px] leading-[80px]'} tracking-[0] whitespace-nowrap font-ria-sans`}>
                타임라인
              </h2>
              <p className={`[font-family:'Pretendard-Regular',Helvetica] font-normal text-on-surface ${isMobile ? 'text-xs leading-[18px]' : 'text-xl leading-[30px]'} tracking-[-0.60px] whitespace-nowrap`}>
                일정을 확인하고 나의 목표를 설정하여 성장해보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
