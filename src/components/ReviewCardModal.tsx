"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

interface ReviewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewCardModal: React.FC<ReviewCardModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activityOptions = [
    "아쉬움 없음",
    "중앙 시작 브리핑",
    "엥크레 wisdom",
    "중앙 중간 브리핑",
    "엥크레 인포데스크",
    "중앙 마감 브리핑",
    "엥크레 인포데스크",
    "중앙 마감 브리핑",
    "중앙 마감 브리핑",
    "중앙 마감 브리핑",
  ];

  const handleSelectActivity = (activity: string) => {
    setSelectedActivity(activity);
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[1100px] bg-[#040b11] rounded-[40px] overflow-hidden border-[3px] border-[#21e786]/30" style={{
        boxShadow: '0px 0px 80px rgba(33, 231, 134, 0.2)'
      }}>
        {/* Header */}
        <div className="flex items-center justify-center py-8 px-8">
          <div className="flex items-center gap-3">
            <span className="text-[32px]">👨‍💻</span>
            <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-[32px]">
              리뷰 카드
            </h2>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-16 py-8">
          <div className="flex items-center justify-center max-w-[600px] mx-auto relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="w-6 h-6 rounded-full bg-[#21e786]" />
              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[17px] whitespace-nowrap">
                활동 선택
              </span>
            </div>

            {/* Progress Line */}
            <div className="flex-1 h-[2px] bg-[#555555] mx-12 relative" style={{ top: '-22px' }}>
              <div className="h-full bg-[#555555] w-full" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="w-6 h-6 rounded-full bg-[#555555]" />
              <span className="[font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#767676] text-[17px] whitespace-nowrap">
                내용 작성
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-16 pb-16">
          <div className="bg-[#0a0f14] rounded-[28px] p-12 border-[3px] border-[#21e786]/50">
            {/* Request Section */}
            <div className="mb-8">
              <h3 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#21e786] text-[22px] mb-5">
                Request A
              </h3>
              <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] leading-relaxed mb-2">
                지난 주 클럽 활동 중에'할 수 있었는데 '우하거나 아쉬웠습니다' 아쉬운 활동을 1개 들어보자구요!
              </p>
              <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-[16px] leading-relaxed">
                팀다른 놓친것이 없는 경우에는, '아쉬움 없음'을 선택할 수 있습니다.
              </p>
            </div>

            {/* Activity Tags */}
            <div className="flex flex-wrap gap-1 mb-8">
              {['서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트', '서브멘트'].map((tag, index) => (
                <span
                  key={index}
                  className="text-[#555555] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[14px]"
                >
                  *{tag}
                </span>
              ))}
            </div>

            {/* Input Field with Dropdown */}
            <div className="mb-10">
              <div className="relative">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-6 py-5 bg-[#1a1f26] border-2 border-[#2a2f36] rounded-2xl text-white placeholder:text-[#555555] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[16px] cursor-pointer flex items-center justify-between focus:outline-none focus:border-[#21e786] transition-colors"
                >
                  <span className={selectedActivity ? "text-white" : "text-[#555555]"}>
                    {selectedActivity || "활동을 선택해주세요"}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M7 10L12 15L17 10" stroke="#21e786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Dropdown List */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-[#1a1f26] border-2 border-[#21e786] rounded-2xl p-6 max-h-[300px] overflow-y-auto z-10">
                    <div className="flex flex-wrap gap-3">
                      {activityOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectActivity(option)}
                          className="px-5 py-2.5 bg-transparent border-2 border-[#21e786] rounded-full text-white [font-family:'Pretendard-Medium',Helvetica] font-medium text-[15px] hover:bg-[#21e786]/10 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button className="px-12 py-4 bg-[#21e786] hover:bg-[#1bc876] rounded-2xl shadow-[0px_0px_30px_rgba(33,231,134,0.3)] transition-all border-2 border-[#21e786]">
                <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#040b11] text-[17px]">
                  선택 완료
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
