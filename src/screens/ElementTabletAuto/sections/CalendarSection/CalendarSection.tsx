import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { useWindowWidth } from "../../../../breakpoints";
import { ConfirmedBadge } from "../../../../components/ConfirmedBadge";
import { PendingBadge } from "../../../../components/PendingBadge";

// 전체 이벤트 리스트 (여러 날에 걸친 이벤트)
// 이전 달(9월) 날짜는 음수로 표시
const events = [
  { id: 1, text: "앵크레 에세이", startDate: -29, endDate: 1, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📓" },
  { id: 2, text: "중앙 시작 브리핑", startDate: -29, endDate: -29, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📢" },
  { id: 3, text: "엥크레 Wisdom", startDate: 1, endDate: 2, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "▼" },
  { id: 4, text: "중앙 중간 브리핑", startDate: 1, endDate: 1, color: "-29일 bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📢" },
  { id: 5, text: "주차 결과물 제출", startDate: 2, endDate: 2, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "🗓️" },
  { id: 6, text: "중앙 마감 브리핑", startDate: 4, endDate: 4, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📢" },
  { id: 7, text: "크루 상호 피드백", startDate: 6, endDate: 8, color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]", icon: "📝" },
  { id: 8, text: "중앙 시작 브리핑", startDate: 6, endDate: 6, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📢" },
  { id: 9, text: "앵크레 Wisdom", startDate: 8, endDate: 9, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼" },
  { id: 10, text: "중앙 중간 브리핑", startDate: 8, endDate: 8, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📢" },
  { id: 11, text: "앵크레 인포데스크", startDate: 9, endDate:11, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "💬" },
  { id: 12, text: "중앙 마감 브리핑", startDate: 11, endDate: 11, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📢" },
  { id: 13, text: "앵고라 주제 공모", startDate: 13, endDate: 15, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼" },
  { id: 14, text: "콘텐츠 초안 제출", startDate: 13, endDate: 13, color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]", icon: "📝" },
  { id: 15, text: "클럽 캘린더 공표", startDate: 15, endDate: 15, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📅" },
  { id: 16, text: "앵고라 주제 공표", startDate: 16, endDate: 16, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼" },
  { id: 17, text: "커리어 일정 공표", startDate: 16, endDate: 16, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📄" },
  { id: 18, text: "주차 결과물 제출", startDate: 16, endDate: 16, color: "bg-[#e6feee]", textColor: "text-[#04ae3e]", icon: "🗓️" },
  { id: 19, text: "앵고라 진행", startDate: 17, endDate: 17, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼" },
  { id: 20, text: "콘텐츠 최종 제출", startDate: 17, endDate: 17, color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]", icon: "📝" },
  { id: 21, text: "앵무새 발표", startDate: 18, endDate: 18, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼" },
];

const calendarData = [
  // Week 1 (이전 달 날짜는 음수로 표시)
  [
    { date: -28, isCurrentMonth: false },
    { date: -29, isCurrentMonth: false },
    { date: -30, isCurrentMonth: false },
    { date: 1, isCurrentMonth: true },
    { date: 2, isCurrentMonth: true },
    { date: 3, isCurrentMonth: true },
    { date: 4, isCurrentMonth: true },
  ],
  // Week 2
  [
    { date: 5, isCurrentMonth: true },
    { date: 6, isCurrentMonth: true, isToday: true },
    { date: 7, isCurrentMonth: true },
    { date: 8, isCurrentMonth: true },
    { date: 9, isCurrentMonth: true },
    { date: 10, isCurrentMonth: true },
    { date: 11, isCurrentMonth: true },
  ],
  // Week 3
  [
    { date: 12, isCurrentMonth: true },
    { date: 13, isCurrentMonth: true },
    { date: 14, isCurrentMonth: true },
    { date: 15, isCurrentMonth: true },
    { date: 16, isCurrentMonth: true },
    { date: 17, isCurrentMonth: true },
    { date: 18, isCurrentMonth: true },
  ],
];

export const CalendarSection = (): JSX.Element => {
  const router = useRouter();
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;
  const [selectedEvents, setSelectedEvents] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showMaxAlert, setShowMaxAlert] = useState(false);

  // localStorage에서 일정 확인 상태 불러오기
  useEffect(() => {
    const confirmed = localStorage.getItem('calendarConfirmed');
    if (confirmed === 'true') {
      setIsConfirmed(true);
    }
  }, []);

  const handleEventClick = (eventId: number) => {
    // 해당 이벤트 찾기
    const event = events.find(e => e.id === eventId);

    // 회색(#555555) 이벤트는 클릭 불가
    if (event && event.color.includes('#555555')) {
      return;
    }

    setSelectedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        // 이미 선택된 경우 선택 해제
        newSet.delete(eventId);
      } else {
        // 선택되지 않은 경우
        if (newSet.size < 3) {
          // 3개 미만이면 추가
          newSet.add(eventId);
        } else {
          // 3개 이상이면 커스텀 alert 표시
          setShowMaxAlert(true);
          setTimeout(() => {
            setShowMaxAlert(false);
          }, 2500);
        }
      }
      return newSet;
    });
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setIsConfirmed(true);
    localStorage.setItem('calendarConfirmed', 'true');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <section className={`flex flex-col items-center ${isMobile ? 'px-3 pt-[90px] pb-5' : isTablet ? 'px-10 py-20' : 'px-[120px] py-20'} w-full bg-[#040b11] relative`}>
      <div className="w-full max-w-[1680px] mx-auto relative">
        {/* 상단 왼쪽 빛나는 곡선 border */}
        <div className={`absolute top-0 left-0 w-[250px] h-[60px] pointer-events-none ${isTablet || isMobile ? 'hidden' : ''}`}>
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-top">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path d="M0 60 C0 30, 0 15, 30 15 L250 15" stroke="#21e786" strokeWidth="3" fill="none" filter="url(#glow-top)" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="relative z-10">
        {/* Header */}
        {isMobile ? (
          <div className="relative flex flex-col items-center mb-6">
            {/* 배지 */}
            {isConfirmed ? (
              <ConfirmedBadge width={140} className="cursor-pointer" />
            ) : (
              <PendingBadge width={140} className="cursor-pointer" />
            )}
          </div>
        ) : isTablet ? (
          <div className="relative flex items-center justify-between mb-8 max-w-[686px] mx-auto">
            {/* 왼쪽: 날짜 선택기 */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#141b22] rounded-lg border-2 border-[#ffffff4c]">
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

            {/* 오른쪽: 배지 */}
            {isConfirmed ? (
              <ConfirmedBadge width={140} className="cursor-pointer" />
            ) : (
              <PendingBadge width={140} className="cursor-pointer" />
            )}
          </div>
        ) : (
          <div className="relative flex items-center justify-between mb-8 pt-[37px] px-[48px]">
            <h2 className="font-bold text-white text-[32px] tracking-[0] leading-[normal] font-ria-sans">
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

            {isConfirmed ? (
              <ConfirmedBadge width={184} className="cursor-pointer" />
            ) : (
              <PendingBadge width={184} className="cursor-pointer" />
            )}
          </div>
        )}

        {/* Calendar Grid */}
        <div className={`bg-[#1a1f26] rounded-lg overflow-hidden ${isTablet ? 'max-w-[686px] mx-auto' : ''}`}>
          {isMobile ? (
            <>
              {/* 날짜 선택기 */}
              <div className="flex items-center justify-center gap-4 px-6 py-3 bg-[#141b22]">
                <button className="w-5 h-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <span className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-base">
                  2025. 10
                </span>

                <button className="w-5 h-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 bg-[#141b22]">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center py-2 text-[#aaaaaa] text-xs font-semibold border-r border-[#2a2f36] last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              {/* 캘린더 그리드 */}
              {calendarData.map((week, weekIndex) => (
                <div key={weekIndex} className="relative border-b border-[#2a2f36] last:border-b-0">
                  {/* 날짜 셀 그리드 */}
                  <div className="grid grid-cols-7">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`min-h-[60px] p-1.5 border-r border-[#2a2f36] last:border-r-0 relative ${
                          day.isToday
                            ? "bg-[#1e2a1e] border-2 border-[#21e786]"
                            : "bg-[#222222]"
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          <span
                            className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-xs ${
                              day.isToday
                                ? "text-[#21e786] underline decoration-[#21e786] underline-offset-2"
                                : day.isCurrentMonth
                                  ? "text-white"
                                  : "text-[#767676]"
                            }`}
                          >
                            {Math.abs(day.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 이벤트 레이어 (절대 위치) */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-visible">
                    <div className="grid grid-cols-7 h-full">
                      {week.map((day, dayIndex) => {
                        // 이 날짜에 시작하는 이벤트들만 필터링
                        const startingEvents = events?.filter(event =>
                          event?.startDate === day.date
                        ) || [];

                        return (
                          <div key={dayIndex} className="relative pt-[22px] px-1.5">
                            {startingEvents.map((event, eventIndex) => {
                              // 이벤트가 이 주에서 몇 개의 셀을 차지하는지 계산
                              const startIndex = week.findIndex(d => d.date === event.startDate);
                              const endIndex = week.findIndex(d => d.date === event.endDate);
                              const spanDays = endIndex >= startIndex ? endIndex - startIndex + 1 : 1;

                              // 모바일 셀 너비 계산 (화면 너비 - 좌우 패딩) / 7
                              // 패딩 px-3 = 12px * 2 = 24px
                              const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
                              const mobileCellWidth = Math.floor((screenWidth - 24) / 7);

                              // 일정 너비 = (셀 너비 × 일수) - 패딩(6px)
                              const eventWidth = mobileCellWidth * spanDays - 6;

                              // 배경색 추출
                              const bgColorMatch = event.color.match(/bg-\[([^\]]+)\]/);
                              let bgColor = bgColorMatch ? bgColorMatch[1] : '#555555';

                              // 모바일 전용 색상 매핑
                              const mobileColorMap: { [key: string]: string } = {
                                '#555555': '#555555',  // 회색 그대로
                                '#eae8fd': '#5C9DFF',  // 파랑 계열
                                '#fdece7': '#FFCA5C',  // 노란 계열
                                '#fde8f9': '#EE8FC4',  // 분홍 계열
                                '#e6feee': '#69D698',  // 초록 계열
                              };

                              bgColor = mobileColorMap[bgColor] || bgColor;

                              return (
                                <div
                                  key={eventIndex}
                                  className="rounded-sm absolute"
                                  style={{
                                    width: `${eventWidth}px`,
                                    height: '3px',
                                    backgroundColor: bgColor,
                                    top: `${eventIndex * 4}px`,
                                    left: '0',
                                    zIndex: 10
                                  }}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : isTablet ? (
            <>
              {/* 태블릿 캘린더 그리드 */}
              {calendarData.map((week, weekIndex) => {
                const weekStartDate = Math.min(...(week?.map(d => d.date) || [0]));
                const weekEndDate = Math.max(...(week?.map(d => d.date) || [0]));

                // 이 주에 해당하는 이벤트 필터링하고 길이 순으로 정렬 (긴 것부터)
                const weekEvents = events
                  .filter(event =>
                    (event.startDate >= weekStartDate && event.startDate <= weekEndDate) ||
                    (event.endDate >= weekStartDate && event.endDate <= weekEndDate) ||
                    (event.startDate < weekStartDate && event.endDate > weekEndDate)
                  )
                  .map(event => ({
                    ...event,
                    length: event.endDate - event.startDate + 1
                  }))
                  .sort((a, b) => {
                    // 시작 날짜가 다르면 빠른 것부터
                    if (a.startDate !== b.startDate) return a.startDate - b.startDate;
                    // 시작 날짜가 같으면 긴 것부터
                    return b.length - a.length;
                  });

                // 각 이벤트의 행(row) 계산 - 겹치지 않도록
                const eventRows = new Map();
                const rowOccupancy: Array<Array<{start: number, end: number}>> = [];

                weekEvents.forEach(event => {
                  const eventStart = Math.max(event.startDate, weekStartDate);
                  const eventEnd = Math.min(event.endDate, weekEndDate);

                  let row = 0;
                  // 사용 가능한 행 찾기
                  while (true) {
                    // 이 행이 존재하지 않으면 초기화
                    if (!rowOccupancy[row]) {
                      rowOccupancy[row] = [];
                    }

                    // 이 행에서 현재 이벤트와 겹치는 다른 이벤트가 있는지 확인
                    const hasConflict = rowOccupancy[row].some(occupied => {
                      // 날짜 범위가 겹치는지 확인
                      return !(eventEnd < occupied.start || eventStart > occupied.end);
                    });

                    if (!hasConflict) {
                      // 겹치지 않으면 이 행에 배치
                      rowOccupancy[row].push({ start: eventStart, end: eventEnd });
                      eventRows.set(event, row);
                      break;
                    }

                    // 겹치면 다음 행으로
                    row++;
                  }
                });

                return (
                  <div key={weekIndex} className="relative border-b border-[#2a2f36] last:border-b-0">
                    {/* 날짜 셀 그리드 */}
                    <div className="grid grid-cols-7">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-[98px] min-h-[152px] p-2 border-r border-[#2a2f36] last:border-r-0 ${
                            day.isToday
                              ? "bg-[#1e2a1e] border-2 border-[#21e786] relative"
                              : "bg-[#222222]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-sm ${
                                day.isToday
                                  ? "text-[#21e786]"
                                  : day.isCurrentMonth
                                    ? "text-white"
                                    : "text-[#767676]"
                              }`}
                            >
                              {Math.abs(day.date)}
                            </span>
                            {day.isToday && (
                              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#21e786] text-xs">
                                오늘
                              </span>
                            )}
                          </div>
                          {(() => {
                            const dayEvents = weekEvents.filter(event =>
                              (event.startDate <= day.date && event.endDate >= day.date) ||
                              event.startDate === day.date
                            );
                            const maxVisibleEvents = 3;
                            const hasMoreEvents = dayEvents.length > maxVisibleEvents;

                            return hasMoreEvents && (
                              <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                <button className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#AAAAAA] text-[10px] hover:text-white transition-colors">
                                  + 더보기
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      ))}
                    </div>

                    {/* 이벤트 레이어 (절대 위치) */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
                      <div className="grid grid-cols-7 h-full">
                        {week.map((day, dayIndex) => {
                          // 이 날짜에서 시작하는 이벤트만 렌더링
                          const startingEvents = weekEvents.filter(event => event.startDate === day.date);

                          return (
                          <div key={dayIndex} className="relative pt-[38px] px-2 overflow-visible">
                            {startingEvents
                              .map((event) => {
                                const startIndex = week.findIndex(d => d.date === event.startDate);
                                const endIndex = week.findIndex(d => d.date === event.endDate);
                                const spanDays = endIndex >= startIndex ? endIndex - startIndex + 1 : 1;

                                const row = eventRows.get(event) ?? 0;
                                const eventHeight = 24;
                                const gap = 8;

                                // 태블릿 일정 너비: 1일=86px, 2일=184px, 3일=282px, 4일=380px
                                const eventWidth = 98 * spanDays - 12;

                                const bgColorMatch = event.color.match(/bg-\[([^\]]+)\]/);
                                const textColorMatch = event.textColor.match(/text-\[([^\]]+)\]/);
                                const bgColor = bgColorMatch ? bgColorMatch[1] : '#555555';
                                const textColor = textColorMatch ? textColorMatch[1] : '#aaaaaa';

                                const isSelected = selectedEvents.has(event.id);
                                const isDisabled = bgColor === '#555555';

                                return (
                                  <div
                                    key={event.id}
                                    className={`px-2 py-1 rounded transition-all duration-300 absolute flex items-center justify-between overflow-hidden ${isDisabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer pointer-events-auto'} ${isSelected ? 'ring-1 ring-[#21e786] ring-opacity-60' : ''}`}
                                    style={{
                                      width: `${eventWidth}px`,
                                      height: `${eventHeight}px`,
                                      top: `${row * (eventHeight + gap)}px`,
                                      zIndex: event.length + (isSelected ? 100 : 0),
                                      backgroundColor: bgColor,
                                      color: textColor,
                                      transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                                      boxShadow: isSelected ? '0 2px 6px rgba(33, 231, 134, 0.25)' : 'none',
                                      opacity: isDisabled ? 0.6 : 1,
                                      position: 'relative'
                                    }}
                                    onClick={() => handleEventClick(event.id)}
                                    onMouseEnter={(e) => {
                                      if (!isDisabled) {
                                        // 배경색과 텍스트색 반전
                                        e.currentTarget.style.backgroundColor = textColor;
                                        e.currentTarget.style.color = bgColor;
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = `0 6px 16px ${textColor}40`;
                                        e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

                                        const textSpan = e.currentTarget.querySelector('span');
                                        if (textSpan) {
                                          textSpan.style.color = bgColor;
                                          textSpan.style.fontWeight = '600';
                                        }
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isDisabled) {
                                        // 원래 색상으로 복구
                                        e.currentTarget.style.backgroundColor = bgColor;
                                        e.currentTarget.style.color = textColor;
                                        e.currentTarget.style.transform = isSelected ? 'scale(1.01)' : 'scale(1)';
                                        e.currentTarget.style.boxShadow = isSelected ? '0 2px 6px rgba(33, 231, 134, 0.25)' : 'none';

                                        const textSpan = e.currentTarget.querySelector('span');
                                        if (textSpan) {
                                          textSpan.style.color = textColor;
                                          textSpan.style.fontWeight = '500';
                                        }
                                      }
                                    }}
                                  >
                                    <span className={`[font-family:'Pretendard-Medium',Helvetica] font-medium text-[10px] leading-tight ${isSelected ? 'whitespace-nowrap overflow-hidden text-ellipsis' : 'truncate'}`}>
                                      {event.icon} {event.text}
                                    </span>
                                    {isSelected && (
                                      <img
                                        src="/icons/iconFireCalendar.png"
                                        alt="Selected"
                                        className="w-3 h-3 ml-1 flex-shrink-0"
                                      />
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            calendarData.map((week, weekIndex) => {
              const weekStartDate = Math.min(...(week?.map(d => d.date) || [0]));
              const weekEndDate = Math.max(...(week?.map(d => d.date) || [0]));

              // 화면 크기에 따른 셀 너비 계산
              let desktopCellWidth, desktopCellHeight;
              if (isTablet) {
                desktopCellWidth = 150;
                desktopCellHeight = 165;
              } else if (screenWidth < 1680) {
                const availableWidth = screenWidth - 240;
                desktopCellWidth = Math.floor(availableWidth / 7);
                desktopCellHeight = 249;
              } else {
                desktopCellWidth = 240;
                desktopCellHeight = 249;
              }

              // 이 주에 해당하는 이벤트 필터링하고 길이 순으로 정렬 (긴 것부터)
              const weekEvents = events
                .filter(event =>
                  (event.startDate >= weekStartDate && event.startDate <= weekEndDate) ||
                  (event.endDate >= weekStartDate && event.endDate <= weekEndDate) ||
                  (event.startDate < weekStartDate && event.endDate > weekEndDate)
                )
                .map(event => ({
                  ...event,
                  length: event.endDate - event.startDate + 1
                }))
                .sort((a, b) => {
                  // 시작 날짜가 다르면 빠른 것부터
                  if (a.startDate !== b.startDate) return a.startDate - b.startDate;
                  // 시작 날짜가 같으면 긴 것부터
                  return b.length - a.length;
                }); // 날짜 순으로 배치

              // 각 이벤트의 행(row) 계산
              const eventRows = new Map();
              const rowOccupancy: Array<Array<{start: number, end: number}>> = [];

              weekEvents.forEach(event => {
                const eventStart = Math.max(event.startDate, weekStartDate);
                const eventEnd = Math.min(event.endDate, weekEndDate);

                let row = 0;
                // 사용 가능한 행 찾기
                while (true) {
                  // 이 행이 존재하지 않으면 초기화
                  if (!rowOccupancy[row]) {
                    rowOccupancy[row] = [];
                  }

                  // 이 행에서 현재 이벤트와 겹치는 다른 이벤트가 있는지 확인
                  const hasConflict = rowOccupancy[row].some(occupied => {
                    // 날짜 범위가 겹치는지 확인
                    return !(eventEnd < occupied.start || eventStart > occupied.end);
                  });

                  if (!hasConflict) {
                    // 겹치지 않으면 이 행에 배치
                    rowOccupancy[row].push({ start: eventStart, end: eventEnd });
                    eventRows.set(event, row);
                    break;
                  }

                  // 겹치면 다음 행으로
                  row++;
                }
              });

              return (
                <div key={weekIndex} className="relative border-b border-[#2a2f36] last:border-b-0">
                  {/* 날짜 셀 그리드 */}
                  <div className="grid grid-cols-7">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`p-3 border-r border-[#2a2f36] last:border-r-0 ${
                          day.isToday
                            ? "bg-[#1e2a1e] border-2 border-[#21e786] relative"
                            : "bg-[#222222]"
                        }`}
                        style={{
                          width: `${desktopCellWidth}px`,
                          minHeight: `${desktopCellHeight}px`
                        }}
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
                            {Math.abs(day.date)}
                          </span>
                          {day.isToday && (
                            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#21e786] text-sm">
                              오늘
                            </span>
                          )}
                        </div>
                        {(() => {
                          const dayEvents = weekEvents.filter(event =>
                            (event.startDate <= day.date && event.endDate >= day.date) ||
                            event.startDate === day.date
                          );
                          const maxVisibleEvents = 3;
                          const hasMoreEvents = dayEvents.length > maxVisibleEvents;

                          return hasMoreEvents && (
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                              <button className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-[#AAAAAA] text-xs hover:text-white transition-colors">
                                + 더보기
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    ))}
                  </div>

                  {/* 이벤트 레이어 (절대 위치) */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
                    <div className="grid grid-cols-7 h-full">
                      {week.map((day, dayIndex) => {
                        // 이 날짜에서 시작하는 이벤트만 렌더링
                        const startingEvents = weekEvents.filter(event => event.startDate === day.date);

                        return (
                        <div key={dayIndex} className="relative pt-[52px] px-3 overflow-visible">
                          {startingEvents
                            .map((event) => {
                              // 이 주의 셀들 중에서 이벤트가 포함되는 셀 개수 계산
                              const startIndex = week.findIndex(d => d.date === event.startDate);
                              const endIndex = week.findIndex(d => d.date === event.endDate);
                              const spanDays = endIndex >= startIndex ? endIndex - startIndex + 1 : 1;

                              const row = eventRows.get(event) ?? 0;
                              const eventHeight = 39; // 이벤트 높이
                              const gap = 12; // 이벤트 간격

                              // 화면 크기에 따른 실제 셀 너비 계산
                              let cellWidth;
                              if (isTablet) {
                                cellWidth = 150;
                              } else if (screenWidth < 1680) {
                                // 1280px ~ 1679px: 패딩을 고려한 실제 너비 계산
                                const availableWidth = screenWidth - 240; // 좌우 패딩 120px씩
                                cellWidth = Math.floor(availableWidth / 7);
                              } else {
                                cellWidth = 240;
                              }
                              const eventWidth = spanDays * cellWidth - 24;

                              // z-index용 실제 이벤트 길이 계산
                              const eventDates = [];
                              for (let d = event.startDate; eventDates.length < 100; d++) {
                                if (d === 0) continue; // 0일은 없음
                                eventDates.push(d);
                                if (d === event.endDate) break;
                                if (d === -1) d = 0; // -1 다음은 1
                              }
                              const eventLength = eventDates.length;

                              // 배경색과 텍스트 색상 추출
                              const bgColorMatch = event.color.match(/bg-\[([^\]]+)\]/);
                              const textColorMatch = event.textColor.match(/text-\[([^\]]+)\]/);
                              const bgColor = bgColorMatch ? bgColorMatch[1] : '#555555';
                              const textColor = textColorMatch ? textColorMatch[1] : '#aaaaaa';

                              const isSelected = selectedEvents.has(event.id);
                              const isDisabled = bgColor === '#555555';

                              return (
                                <div
                                  key={event.id}
                                  className={`group px-3 py-2 rounded transition-all duration-300 absolute flex items-center justify-between overflow-hidden ${isDisabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer pointer-events-auto'} ${isSelected ? 'ring-1 ring-[#21e786] ring-opacity-60' : ''}`}
                                  style={{
                                    width: `${eventWidth}px`,
                                    height: '39px',
                                    top: `${row * (eventHeight + gap)}px`,
                                    zIndex: eventLength + (isSelected ? 100 : 0),
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                                    boxShadow: isSelected ? '0 2px 6px rgba(33, 231, 134, 0.25)' : 'none',
                                    opacity: isDisabled ? 0.6 : 1,
                                    position: 'relative'
                                  }}
                                  onClick={() => handleEventClick(event.id)}
                                  onMouseEnter={(e) => {
                                    if (!isDisabled) {
                                      // 배경색과 텍스트색 반전
                                      e.currentTarget.style.backgroundColor = textColor;
                                      e.currentTarget.style.color = bgColor;
                                      e.currentTarget.style.transform = 'translateY(-2px)';
                                      e.currentTarget.style.boxShadow = `0 6px 16px ${textColor}40`;
                                      e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

                                      const textSpan = e.currentTarget.querySelector('span');
                                      if (textSpan) {
                                        textSpan.style.color = bgColor;
                                        textSpan.style.fontWeight = '600';
                                      }
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isDisabled) {
                                      // 원래 색상으로 복구
                                      e.currentTarget.style.backgroundColor = bgColor;
                                      e.currentTarget.style.color = textColor;
                                      e.currentTarget.style.transform = isSelected ? 'scale(1.01)' : 'scale(1)';
                                      e.currentTarget.style.boxShadow = isSelected ? '0 2px 6px rgba(33, 231, 134, 0.25)' : 'none';

                                      const textSpan = e.currentTarget.querySelector('span');
                                      if (textSpan) {
                                        textSpan.style.color = textColor;
                                        textSpan.style.fontWeight = '500';
                                      }
                                    }
                                  }}
                                >
                                  <span className={`[font-family:'Pretendard-Medium',Helvetica] font-medium text-base leading-tight ${isSelected ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''}`}>
                                    {event.icon} {event.text}
                                  </span>
                                  {isSelected && (
                                    <img
                                      src="/icons/iconFireCalendar.png"
                                      alt="Selected"
                                      className="w-5 h-5 mr-3 flex-shrink-0"
                                    />
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className={`mt-0 flex flex-col items-center bg-[#141b22] relative overflow-hidden ${
          isConfirmed
            ? (isMobile ? 'py-[10px] rounded-b-lg' : isTablet ? 'py-[30px] rounded-b-lg' : 'py-[40px] rounded-b-lg')
            : isMobile
              ? 'py-6 px-4 gap-6 rounded-b-lg'
              : 'py-10 px-8 gap-6 rounded-b-lg'
        } ${isTablet ? 'max-w-[686px] mx-auto' : ''}`}>
          {/* Footer 오른쪽 하단 빛나는 곡선 border */}
          {!isMobile && (
            <div className="absolute -bottom-[10px] -right-[1px] w-[250px] h-[60px] pointer-events-none">
              <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="glow-footer">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M250 0 C250 30, 250 45, 220 45 L0 45" stroke="#21e786" strokeWidth="3" fill="none" filter="url(#glow-footer)" strokeLinecap="round"/>
              </svg>
            </div>
          )}
          {/* 일정 확인 후에는 내용 숨김 */}
          {isConfirmed ? null : (
            <>
              <div className="flex flex-col items-center gap-3">
                {isMobile ? (
                  <>
                    <div className="text-center">
                      <div className="font-ria-sans font-bold bg-gradient-to-r from-[#21E786] to-[#FFFFFF] bg-clip-text text-transparent text-xl">클럽 일정</div>
                      <p className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xs mt-1 mb-1">
                        을 확인하고 3개의 기대 표현을 보내주세요!ㅇㅇㅇㄴ
                      </p>
                      <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-center text-xs">
                        클럽 전체 일정은 캘린더를 통해 확인해주세요
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-center text-2xl">
                      <span className="font-ria-sans font-bold bg-gradient-to-r from-[#21E786] to-[#FFFFFF] bg-clip-text text-transparent text-[32px]">클럽 일정</span>을 확인하고 3개의 기대 표현을 보내주세요!
                    </h3>
                    <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-center text-sm">
                      활동 일정 클릭 시 자동 선택됩니다.
                    </p>
                    <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-sm text-center">
                      '기대'는 앞으로 2주 내의 클럽 활동 중 두근두근 기대가 되는 활동을 표시하는 나의 '찜콩'입니다. (테스트2)
                      <br />
                      클럽의 중요한 활동을 놓치는 일 없이 다 후루룹짭짭..해서, 성장의 근수저가 되보자구요!
                    </p>
                  </>
                )}
              </div>

              <Button
                className={`inline-flex items-center justify-center gap-2 h-auto bg-[#21e786] hover:bg-[#1bc970] ${isMobile ? 'px-4 py-2 w-[204px]' : 'px-8 py-3'}`}
                onClick={() => {
                  if (isMobile) {
                    router.push('/calendar-events');
                  } else {
                    setIsModalOpen(true);
                  }
                }}
              >
                <span className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#040b11] ${isMobile ? 'text-sm' : 'text-base'}`}>
                  일정 확인하고 기대 표현 보내기
                </span>
              </Button>
            </>
          )}
        </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/modal-notice.png"
              alt="Notice Modal"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            {/* 버튼 영역 - 이미지 하단 버튼 위에 투명 오버레이 */}
            <div className="absolute inset-0 pointer-events-none">
              {/* 다시 확인할게요 버튼 */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute left-[22%] w-[28%] h-[13%] bg-transparent hover:bg-white hover:bg-opacity-10 transition-all rounded-lg pointer-events-auto"
                style={{ bottom: 'calc(12% + 40px)' }}
              />
              {/* 네! 확인했어요 버튼 */}
              <button
                onClick={handleConfirm}
                className="absolute right-[22%] w-[28%] h-[13%] bg-transparent hover:bg-white hover:bg-opacity-10 transition-all rounded-lg pointer-events-auto"
                style={{ bottom: 'calc(12% + 40px)' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast 알림 */}
      {showToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-[#21e786] text-[#040b11] px-8 py-4 rounded-full shadow-lg">
          <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-lg">
            ✓ 일정이 저장되었습니다
          </span>
        </div>
      )}

      {/* 최대 찜콩 수 초과 알림 */}
        {showMaxAlert && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto bg-gradient-to-r from-[#ff6b6b] to-[#ee5a52] text-white px-10 py-5 rounded-2xl shadow-2xl border-2 border-[#ff8787]">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-lg">
          최대 찜콩 수를 초과했습니다
        </span>
                    </div>
                </div>
            </div>
        )}

    </section>
  );
};
