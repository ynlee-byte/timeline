"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../src/components/ui/button";

// 전체 이벤트 리스트
const events = [
  { id: 1, text: "앵크레 에세이", startDate: -29, endDate: 1, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📓", deadline: "24:00" },
  { id: 2, text: "중앙 시작 브리핑", startDate: -29, endDate: -29, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📢", deadline: "24:00" },
  { id: 3, text: "앵크레 Wisdom", startDate: 1, endDate: 2, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "▼", deadline: "24:00" },
  { id: 4, text: "중앙 중간 브리핑", startDate: 1, endDate: 1, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📢", deadline: "24:00" },
  { id: 5, text: "주차 결과물 제출", startDate: 2, endDate: 2, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "🗓️", deadline: "24:00" },
  { id: 6, text: "중앙 마감 브리핑", startDate: 4, endDate: 4, color: "bg-[#555555]", textColor: "text-[#aaaaaa]", icon: "📢", deadline: "24:00" },
  { id: 7, text: "크루 상호 피드백", startDate: 6, endDate: 8, color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]", icon: "📝", deadline: "24:00" },
  { id: 8, text: "중앙 시작 브리핑", startDate: 6, endDate: 6, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📢", deadline: "24:00" },
  { id: 9, text: "앵크레 Wisdom", startDate: 8, endDate: 9, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼", deadline: "24:00" },
  { id: 10, text: "중앙 중간 브리핑", startDate: 8, endDate: 8, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📢", deadline: "24:00" },
  { id: 11, text: "앵크레 인포데스크", startDate: 9, endDate: 11, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "💬", deadline: "24:00" },
  { id: 12, text: "중앙 마감 브리핑", startDate: 11, endDate: 11, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📢", deadline: "24:00" },
  { id: 13, text: "앵고라 주제 공모", startDate: 13, endDate: 15, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼", deadline: "24:00" },
  { id: 14, text: "콘텐츠 초안 제출", startDate: 13, endDate: 13, color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]", icon: "📝", deadline: "24:00" },
  { id: 15, text: "클럽 캘린더 공표", startDate: 15, endDate: 15, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📅", deadline: "24:00" },
  { id: 16, text: "앵고라 주제 공표", startDate: 16, endDate: 16, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼", deadline: "24:00" },
  { id: 17, text: "커리어 일정 공표", startDate: 16, endDate: 16, color: "bg-[#fdece7]", textColor: "text-[#b54800]", icon: "📄", deadline: "24:00" },
  { id: 18, text: "주차 결과물 제출", startDate: 16, endDate: 16, color: "bg-[#e6feee]", textColor: "text-[#04ae3e]", icon: "🗓️", deadline: "24:00" },
  { id: 19, text: "앵고라 진행", startDate: 17, endDate: 17, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼", deadline: "24:00" },
  { id: 20, text: "콘텐츠 최종 제출", startDate: 17, endDate: 17, color: "bg-[#eae8fd]", textColor: "text-[#2e17e7]", icon: "📝", deadline: "24:00" },
  { id: 21, text: "앵무새 발표", startDate: 18, endDate: 18, color: "bg-[#fde8f9]", textColor: "text-[#ea31cc]", icon: "▼", deadline: "24:00" },
];

const calendarData = [
  [
    { date: -28, isCurrentMonth: false },
    { date: -29, isCurrentMonth: false },
    { date: -30, isCurrentMonth: false },
    { date: 1, isCurrentMonth: true },
    { date: 2, isCurrentMonth: true },
    { date: 3, isCurrentMonth: true },
    { date: 4, isCurrentMonth: true },
  ],
  [
    { date: 5, isCurrentMonth: true },
    { date: 6, isCurrentMonth: true, isToday: true },
    { date: 7, isCurrentMonth: true },
    { date: 8, isCurrentMonth: true },
    { date: 9, isCurrentMonth: true },
    { date: 10, isCurrentMonth: true },
    { date: 11, isCurrentMonth: true },
  ],
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

export default function CalendarEventsPage() {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<Set<number>>(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEventClick = (eventId: number) => {
    setSelectedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        if (newSet.size < 3) {
          newSet.add(eventId);
        }
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    // 확인 모달 표시
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // 확인했어요 클릭 시
    setShowConfirmModal(false);
    // localStorage에 일정 확인 완료 저장
    localStorage.setItem('calendarConfirmed', 'true');
    router.push('/');
  };

  const handleCancel = () => {
    // 다시볼게요 클릭 시
    setShowConfirmModal(false);
  };

  // 2주간의 일정만 필터링 (6일~18일)
  const twoWeekEvents = events.filter(event => {
    // 이벤트가 6일~18일 범위와 겹치는지 확인
    return (event.startDate <= 18 && event.endDate >= 6);
  });

  // 날짜별 이벤트 그룹화
  const eventsByDate: { [key: string]: typeof events } = {};
  twoWeekEvents.forEach(event => {
    // 6일~18일 범위 내의 날짜만 처리
    const startDate = Math.max(event.startDate, 6);
    const endDate = Math.min(event.endDate, 18);

    for (let date = startDate; date <= endDate; date++) {
      const dateKey = `25.10.${String(Math.abs(date)).padStart(2, '0')}`;
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    }
  });

  // 날짜 정렬
  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <div className="min-h-screen bg-[#040b11] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-[#141b22]">
        <button onClick={() => router.back()} className="w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="font-ria-sans font-bold text-[#21e786] text-lg">클럽 일정</h1>
        <button className="w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Description */}
        <div className="mb-6">
          <h2 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-base mb-2">
            2주간의 클럽 일정을 확인하고
            <br />
            기대 표현을 보내주세요.
          </h2>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-transparent rounded-full border-2 border-[#21e786]">
            <span className="text-base">👀</span>
            <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-xs">
              일정 확인 필요
            </span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-center gap-4 mb-4">
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

        {/* Mini Calendar */}
        <div className="bg-[#1a1f26] rounded-lg overflow-hidden mb-6">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 bg-[#141b22]">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={idx} className="text-center py-2 text-[#aaaaaa] text-xs font-semibold">
                {day}
              </div>
            ))}
          </div>
          {/* 캘린더 그리드 */}
          {calendarData.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b border-[#2a2f36] last:border-b-0">
              {week.map((day, dayIndex) => {
                const startingEvents = events?.filter(event =>
                  event?.startDate === day.date
                ) || [];

                return (
                  <div
                    key={dayIndex}
                    className={`min-h-[50px] p-1.5 border-r border-[#2a2f36] last:border-r-0 relative ${
                      day.isToday
                        ? "bg-[#1e2a1e] border-2 border-[#21e786]"
                        : "bg-[#222222]"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <span
                        className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-xs ${
                          day.isToday
                            ? "text-[#21e786]"
                            : day.isCurrentMonth
                              ? "text-white"
                              : "text-[#767676]"
                        }`}
                      >
                        {Math.abs(day.date)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 relative">
                      {startingEvents.map((event, eventIndex) => {
                        const eventSpan = event.endDate - event.startDate + 1;
                        let eventWidth;
                        if (eventSpan === 1) {
                          eventWidth = 34;
                        } else if (eventSpan === 2) {
                          eventWidth = 74;
                        } else {
                          eventWidth = 114;
                        }

                        const bgColorMatch = event.color.match(/bg-\[([^\]]+)\]/);
                        const bgColor = bgColorMatch ? bgColorMatch[1] : '#555555';

                        return (
                          <div
                            key={eventIndex}
                            className="rounded-sm absolute"
                            style={{
                              width: `${eventWidth}px`,
                              height: '3px',
                              backgroundColor: bgColor,
                              top: `${eventIndex * 4}px`,
                              left: '0'
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Event List */}
        <div className="space-y-4 pb-28">
          {sortedDates.map((dateKey) => {
            const dateEvents = eventsByDate[dateKey];
            const dayOfWeek = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
            const dateNum = parseInt(dateKey.split('.')[2]);
            const dayIndex = (dateNum + 4) % 7; // 10월 1일이 화요일이라고 가정

            return (
              <div key={dateKey}>
                <h3 className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#21e786] text-sm mb-2">
                  {dateKey}{dayOfWeek[dayIndex]}
                </h3>
                <div className="space-y-2">
                  {dateEvents.map((event) => {
                    const bgColorMatch = event.color.match(/bg-\[([^\]]+)\]/);
                    const textColorMatch = event.textColor.match(/text-\[([^\]]+)\]/);
                    const bgColor = bgColorMatch ? bgColorMatch[1] : '#555555';
                    const textColor = textColorMatch ? textColorMatch[1] : '#aaaaaa';
                    const isSelected = selectedEvents.has(event.id);

                    // 시작일과 마감일 요일 계산
                    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
                    const startDayIndex = (Math.abs(event.startDate) + 4) % 7;
                    const endDayIndex = (Math.abs(event.endDate) + 4) % 7;

                    // 날짜 범위 텍스트 생성
                    const dateRangeText = event.startDate === event.endDate
                      ? `10/${String(Math.abs(event.endDate)).padStart(2, '0')}(${dayOfWeek[endDayIndex]}) ${event.deadline}`
                      : `10/${String(Math.abs(event.startDate)).padStart(2, '0')}(${dayOfWeek[startDayIndex]}) ~ 10/${String(Math.abs(event.endDate)).padStart(2, '0')}(${dayOfWeek[endDayIndex]}) ${event.deadline}`;

                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event.id)}
                        className="px-4 py-3 rounded-lg cursor-pointer transition-all"
                        style={{
                          backgroundColor: bgColor,
                          color: textColor,
                          border: isSelected ? '2px solid #21e786' : 'none'
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-base">
                              {event.icon} {event.text}
                            </div>
                            {isSelected && (
                              <div className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-xs opacity-80 mt-1">
                                {dateRangeText}
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <span className="text-xl flex-shrink-0">🔥</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-6 bg-gradient-to-t from-[#040b11] via-[#040b11] to-transparent pt-10">
        <Button
          onClick={handleSubmit}
          disabled={selectedEvents.size !== 3}
          className="w-full py-5 bg-[#21e786] hover:bg-[#1bc970] text-[#040b11] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-base rounded-lg disabled:bg-[#2a2f36] disabled:text-[#767676] disabled:opacity-50"
        >
          기대 표현 보내기
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
          <div className="relative bg-[#141b22] rounded-lg p-6 w-full max-w-[280px]" style={{ boxShadow: '0 0 30px rgba(33, 231, 134, 0.4)' }}>
            {/* 좌측 상단 초록색 빛 효과 */}
            <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#21e786] blur-2xl opacity-70 rounded-full"></div>
            {/* 우측 하단 초록색 빛 효과 */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#21e786] blur-2xl opacity-70 rounded-full"></div>

            <h3 className="font-ria-sans font-semibold text-white text-center text-base mb-5 leading-relaxed">
              2주 후까지의 클럽 일정을<br />전체 확인하셨나요?
            </h3>

            <div className="flex gap-2">
              <Button
                onClick={handleCancel}
                className="flex-1 py-2.5 bg-transparent border-2 border-[#21e786] text-[#21e786] hover:bg-[#21e786] hover:bg-opacity-10 [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-sm rounded transition-all"
              >
                다시볼게요
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 py-2.5 bg-[#21e786] text-[#040b11] hover:bg-[#1bc970] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-sm rounded transition-all"
              >
                확인했어요!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
