import React from "react";
import { Button } from "../../../../components/ui/button";
import { useWindowWidth } from "../../../../breakpoints";

const calendarData = [
  // Week 1
  [
    { date: 28, isCurrentMonth: false, events: [] },
    { date: 29, isCurrentMonth: false, events: [] },
    { 
      date: 30, 
      isCurrentMonth: false, 
      events: [
        { text: "엥크레 예세이", color: "bg-[#555555]", textColor: "text-[#aaaaaa]" }
      ]
    },
    { 
      date: 1, 
      isCurrentMonth: true, 
      events: [
        { text: "엥크레 Wisdom", color: "bg-[#555555]", textColor: "text-[#aaaaaa]" },
        { text: "중앙 시작 브리핑", color: "bg-[#555555]", textColor: "text-[#aaaaaa]" }
      ]
    },
    { 
      date: 2, 
      isCurrentMonth: true, 
      events: [
        { text: "주차 결과물 제출", color: "bg-[#555555]", textColor: "text-[#aaaaaa]" }
      ]
    },
    { date: 3, isCurrentMonth: true, events: [] },
    { 
      date: 4, 
      isCurrentMonth: true, 
      events: [
        { text: "중앙 마감 브리핑", color: "bg-[#555555]", textColor: "text-[#aaaaaa]" }
      ]
    },
  ],
  // Week 2
  [
    { date: 5, isCurrentMonth: true, events: [] },
    { 
      date: 6, 
      isCurrentMonth: true, 
      isToday: true,
      events: [
        { text: "중앙 시작 브리핑", color: "bg-[#fdece7]", textColor: "text-[#b54800]" }
      ]
    },
    { 
      date: 7, 
      isCurrentMonth: true, 
      events: [
        { text: "크루 상호 피드백", color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]" }
      ]
    },
    { 
      date: 8, 
      isCurrentMonth: true, 
      events: [
        { text: "엥크레 Wisdom", color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]" },
        { text: "중앙 중간 브리핑", color: "bg-[#fdece7]", textColor: "text-[#b54800]" }
      ]
    },
    { date: 9, isCurrentMonth: true, events: [] },
    { 
      date: 10, 
      isCurrentMonth: true, 
      events: [
        { text: "엥크레 인포데스크", color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]" },
        { text: "중앙 마감 브리핑", color: "bg-[#fdece7]", textColor: "text-[#b54800]" }
      ]
    },
    { date: 11, isCurrentMonth: true, events: [] },
  ],
  // Week 3
  [
    { date: 12, isCurrentMonth: true, events: [] },
    { 
      date: 13, 
      isCurrentMonth: true, 
      events: [
        { text: "엥고라 주제 공모", color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]" },
        { text: "콘텐츠 초안 제출", color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]" }
      ]
    },
    { date: 14, isCurrentMonth: true, events: [] },
    { 
      date: 15, 
      isCurrentMonth: true, 
      events: [
        { text: "클럽 캘린더 공표", color: "bg-[#fdece7]", textColor: "text-[#b54800]" }
      ]
    },
    { 
      date: 16, 
      isCurrentMonth: true, 
      events: [
        { text: "엥고라 주제 공표", color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]" },
        { text: "커리어 일정 공표", color: "bg-[#fdece7]", textColor: "text-[#b54800]" },
        { text: "주차 결과물 제출", color: "bg-[#e6feee]", textColor: "text-[#04ae3e]" }
      ]
    },
    { 
      date: 17, 
      isCurrentMonth: true, 
      events: [
        { text: "엥고라 진행", color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]" },
        { text: "콘텐츠 최종 제출", color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]" }
      ]
    },
    { 
      date: 18, 
      isCurrentMonth: true, 
      events: [
        { text: "엥무새 발표", color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]" }
      ]
    },
  ],
];

export const CalendarSection = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1280;

  return (
    <section className={`flex flex-col items-center ${isMobile ? 'px-5' : isTablet ? 'px-10' : 'px-[120px]'} py-20 w-full bg-[#040b11]`}>
      <div className="w-full max-w-[1680px] mx-auto">
        {/* Header */}
        {isMobile ? (
          <div className="relative flex flex-col items-center gap-8 mb-8">
            <Button className={`inline-flex items-center justify-center gap-2 px-6 py-2 h-auto rounded-full shadow-[0px_0px_15px_#33ff0080] bg-[linear-gradient(90deg,rgba(135,230,135,1)_0%,rgba(165,234,53,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(135,230,135,1)_0%,rgba(165,234,53,1)_100%)]`}>
              <span className="text-base">👀</span>
              <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#2e7351] text-base">
                일정 확인 필요
              </span>
            </Button>

            <div className={`flex items-center justify-between gap-2 px-4 py-2`}>
              <button className="w-5 h-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base px-4">
                2025. 10
              </span>

              <button className="w-5 h-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-between mb-8">
            <h2 className="[font-family:'Ria_Sans-Bold',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
              캘린더
            </h2>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[#141b22] rounded-lg border-2 border-[#ffffff4c]">
              <button className="w-5 h-5">
                <img
                  alt="Previous month"
                  src="https://c.animaapp.com/O1XpzcZm/img/frame-3.svg"
                />
              </button>

              <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base px-4">
                2025. 10
              </span>

              <button className="w-5 h-5">
                <img
                  alt="Next month"
                  src="https://c.animaapp.com/O1XpzcZm/img/frame-4.svg"
                />
              </button>
            </div>

            <Button className="inline-flex items-center justify-center gap-2 px-6 py-2 h-auto rounded-full shadow-[0px_0px_15px_#33ff0080] bg-[linear-gradient(90deg,rgba(135,230,135,1)_0%,rgba(165,234,53,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(135,230,135,1)_0%,rgba(165,234,53,1)_100%)]">
              <span className="text-base">✅</span>
              <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#2e7351] text-base">
                일정 확인 완료
              </span>
            </Button>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="bg-[#1a1f26] rounded-lg overflow-hidden">
          {isMobile ? (
            <div className="grid grid-cols-7 border-b border-[#2a2f36] last:border-b-0">
              {calendarData.flat().map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`min-h-[80px] p-3 border-r border-[#2a2f36] last:border-r-0 ${
                    day.isToday
                      ? "bg-[#1e2a1e] border-2 border-[#21e786] relative"
                      : "bg-[#222222]"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-2">
                    <span
                      className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-sm ${
                        day.isToday
                          ? "text-[#21e786]"
                          : day.isCurrentMonth
                            ? "text-white"
                            : "text-[#767676]"
                      }`}
                    >
                      {day.date}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {day.events.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`${event.color} h-2 rounded-sm`}
                      />
                    ))}
                    {day.events.length > 2 && (
                      <div className="w-full h-2 bg-[#555555] rounded-sm flex items-center justify-center">
                        <span className="text-white text-[8px]">+</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            calendarData.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 border-b border-[#2a2f36] last:border-b-0">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`min-h-[180px] p-3 border-r border-[#2a2f36] last:border-r-0 ${
                      day.isToday
                        ? "bg-[#1e2a1e] border-2 border-[#21e786] relative"
                        : "bg-[#222222]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-lg ${
                          day.isToday
                            ? "text-[#21e786]"
                            : day.isCurrentMonth
                              ? "text-white"
                              : "text-[#767676]"
                        }`}
                      >
                        {day.date}
                      </span>
                      {day.isToday && (
                        <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#21e786] text-sm">
                          오늘
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {day.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`${event.color} px-2 py-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                          <span
                            className={`[font-family:'Pretendard-Medium',Helvetica] font-medium ${event.textColor} text-xs leading-tight block`}
                          >
                            {event.text}
                          </span>
                        </div>
                      ))}
                      {day.events.length > 2 && (
                        <button className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xs text-left hover:underline">
                          + 더보기
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center gap-6 bg-[#141b22] rounded-[30px] py-10 px-8">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-[linear-gradient(94deg,rgba(33,231,134,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [font-family:'Ria_Sans-Bold',Helvetica] font-bold text-lg">
                클럽 일정
              </span>
              <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-lg">
                을 확인하고 3개의 기대 표현을 보내주세요!
              </span>
            </div>
            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-sm text-center">
              활동 일정 클릭 시 자동 선택됩니다.
            </p>
            <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-sm text-center">
              클럽 전체 일정은 캘린더를 통해 확인해주세요
            </p>
          </div>

          <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 h-auto bg-app-primary hover:bg-app-primary/90 rounded-lg">
            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#141b22] text-base">
              일정 확인하고 기대 표현 보내기
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
