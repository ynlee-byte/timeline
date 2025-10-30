"use client";

import { useState, useEffect } from 'react';
import {
  getCurrentDayOfWeek,
  setMockDayOfWeek,
  clearMockDayOfWeek,
  getMockDayOfWeek,
  getDayName,
  canWriteReview,
  canWriteGoal,
  canWriteJudgment,
  type DayOfWeek
} from '@/lib/utils/dateUtils';
import { hasWrittenReviewThisWeek } from '@/lib/services/reviewService';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

export const DevDebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<DayOfWeek>(0);
  const [mockDay, setMockDay] = useState<DayOfWeek | null>(null);
  const [hasWrittenReview, setHasWrittenReview] = useState(false);
  const [isCheckingReview, setIsCheckingReview] = useState(false);
  const [isCalendarConfirmed, setIsCalendarConfirmed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    updateDays();
    checkReviewStatus();
  }, [user]);

  const updateDays = () => {
    setCurrentDay(getCurrentDayOfWeek());
    setMockDay(getMockDayOfWeek());
  };

  const checkReviewStatus = async () => {
    if (!user) {
      setHasWrittenReview(false);
      return;
    }

    setIsCheckingReview(true);
    try {
      const written = await hasWrittenReviewThisWeek();
      setHasWrittenReview(written);
    } catch (error) {
      console.error('Error checking review status:', error);
      setHasWrittenReview(false);
    } finally {
      setIsCheckingReview(false);
    }
  };

  const handleSetMockDay = (day: DayOfWeek) => {
    setMockDayOfWeek(day);
    updateDays();
    checkReviewStatus();
    // 커스텀 이벤트 발생시켜서 다른 컴포넌트에 알림
    window.dispatchEvent(new Event('dayChanged'));
  };

  const handleClearMockDay = () => {
    clearMockDayOfWeek();
    updateDays();
    checkReviewStatus();
    // 커스텀 이벤트 발생시켜서 다른 컴포넌트에 알림
    window.dispatchEvent(new Event('dayChanged'));
  };

  const handleToggleCalendarConfirmed = () => {
    const newValue = !isCalendarConfirmed;
    setIsCalendarConfirmed(newValue);
    // CalendarSection에 이벤트 전달
    window.dispatchEvent(new CustomEvent('calendarConfirmedChanged', {
      detail: { isConfirmed: newValue }
    }));
  };

  // 모든 환경에서 표시 (유저가 요일을 조정할 수 있도록)
  const days: DayOfWeek[] = [0, 1, 2, 3, 4, 5, 6];
  const realDay = new Date().getDay() as DayOfWeek;

  return (
    <>
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999]  bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors text-lg font-bold"
      >
        🛠️ 여기서 '요일' 조정하세요!
      </button>

      {/* 디버그 패널 */}
      {isOpen && (


        <div className="fixed bottom-20 right-4 z-[9999] bg-[#1a1a1a] border-2 border-purple-600 rounded-2xl p-6 w-[400px] shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">개발자 디버그 패널</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-400 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 현재 상태 */}
          <div className="mb-6 p-4 bg-[#2a2a2a] rounded-lg">
            <div className="text-gray-400 text-sm mb-2">실제 요일</div>
            <div className="text-white font-semibold text-lg mb-3">
              {getDayName(realDay)}
            </div>

            <div className="text-gray-400 text-sm mb-2">현재 사용 중인 요일</div>
            <div className="text-purple-400 font-semibold text-lg mb-3">
              {getDayName(currentDay)}
              {mockDay !== null && ' (모의)'}
            </div>

            <div className="space-y-2">
              {/* 캘린더 확인 상태 (기대 표현) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">기대 표현</span>
                  <button
                    onClick={handleToggleCalendarConfirmed}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      isCalendarConfirmed
                        ? 'bg-purple-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {isCalendarConfirmed ? '작성 완료' : '작성 전'}
                  </button>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${canWriteReview() ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {canWriteReview() ? '작성 가능 (월/화/수)' : '작성 기간이 아닙니다'}
                </span>
              </div>

              {/* 리뷰 상태 */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">리뷰 카드</span>
                <div className="flex gap-2">
                  {canWriteReview() ? (
                    <>
                      {hasWrittenReview ? (
                        <span className="px-2 py-1 rounded bg-purple-600 text-white text-xs">
                          작성 완료
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-green-600 text-white text-xs">
                          작성 가능 (월/화/수)
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="px-2 py-1 rounded bg-red-600 text-white text-xs">
                      작성 기간이 아닙니다
                    </span>
                  )}
                </div>
              </div>

              {/* 판정 상태 */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">판정 카드</span>
                <span className={`px-2 py-1 rounded text-xs ${canWriteJudgment() ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'}`}>
                  {canWriteJudgment() ? '작성 가능 (일요일)' : '작성 기간이 아닙니다'}
                </span>
              </div>

              {/* 목표 상태 */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">목표 카드</span>
                <span className={`px-2 py-1 rounded text-xs ${canWriteGoal() ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
                  {canWriteGoal() ? '작성 가능 (목/금/토/일)' : '작성 기간이 아닙니다'}
                </span>
              </div>
            </div>
          </div>

          {/* 요일 선택 */}
          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-3">모의 요일 설정</div>
            <div className="grid grid-cols-4 gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => handleSetMockDay(day)}
                  className={`relative z-[10000] px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    currentDay === day
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                  }`}
                >
                  {getDayName(day).slice(0, 1)}
                </button>
              ))}
            </div>
          </div>

          {/* 초기화 버튼 */}
          {mockDay !== null && (
            <Button
              onClick={handleClearMockDay}
              className="w-full bg-red-600 hover:bg-red-700 text-white mb-2"
            >
              모의 요일 초기화 (실제 요일로 복귀)
            </Button>
          )}

          {/* 5번째 모달 테스트 */}
          <div className="mt-4 mb-4">
            <div className="text-gray-400 text-sm mb-3">5번째 확인 모달 테스트</div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('testFifthModal', {
                    detail: { type: 'recognition', section: 'winner' }
                  }));
                }}
                className="px-3 py-2 bg-[#E52B50] hover:bg-[#d12546] text-white rounded text-xs font-semibold transition-colors"
              >
                귀감 5번째
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('testFifthModal', {
                    detail: { type: 'applause', section: 'challenger' }
                  }));
                }}
                className="px-3 py-2 bg-[#E52B50] hover:bg-[#d12546] text-white rounded text-xs font-semibold transition-colors"
              >
                박수 5번째
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('testFifthModal', {
                    detail: { type: 'review', section: 'recognition' }
                  }));
                }}
                className="px-3 py-2 bg-[#FFED00] hover:bg-[#FFE500] text-[#040B11] rounded text-xs font-semibold transition-colors"
              >
                인정 5번째
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('testFifthModal', {
                    detail: { type: 'goal', section: 'recognition' }
                  }));
                }}
                className="px-3 py-2 bg-[#FFED00] hover:bg-[#FFE500] text-[#040B11] rounded text-xs font-semibold transition-colors"
              >
                응원 5번째
              </button>
            </div>
          </div>

          {/* 안내 */}
          <div className="mt-4 p-3 bg-purple-900/20 border border-purple-600/30 rounded-lg">
            <div className="text-purple-300 text-xs">
              <div className="font-semibold mb-1">💡 사용법</div>
              <ul className="list-disc list-inside space-y-1">
                <li>기대 표현: 월/화/수</li>
                <li>리뷰 카드: 월/화/수</li>
                <li>목표 카드: 목/금/토</li>
                <li>판정 카드: 월/화/수</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};