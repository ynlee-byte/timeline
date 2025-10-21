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
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleNextStep = () => {
    if (selectedActivity) {
      setStep(2);
    }
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
      <div className="relative w-full max-w-[1100px] h-[80vh] max-h-[900px] bg-[#040b11] rounded-[40px] overflow-hidden border-[3px] border-[#21e786]/30 flex flex-col" style={{
        boxShadow: '0px 0px 80px rgba(33, 231, 134, 0.2)'
      }}>
        {/* Header */}
        <div className="flex items-center justify-center py-8 px-8 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[32px]">👨‍💻</span>
            <h2 className="font-ria-sans font-bold text-white text-[32px]">
              리뷰 카드
            </h2>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-16 py-8 shrink-0">
          <div className="flex items-center justify-center max-w-[600px] mx-auto relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className={`w-6 h-6 rounded-full ${step >= 1 ? 'bg-[#21e786]' : 'bg-[#555555]'}`} />
              <span className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold ${step >= 1 ? 'text-white' : 'text-[#767676]'} text-[17px] whitespace-nowrap`}>
                활동 선택
              </span>
            </div>

            {/* Progress Line */}
            <div className="flex-1 h-[2px] bg-[#555555] mx-12 relative" style={{ top: '-22px' }}>
              <div className={`h-full ${step >= 2 ? 'bg-[#21e786]' : 'bg-[#555555]'} w-full transition-colors`} />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className={`w-6 h-6 rounded-full ${step >= 2 ? 'bg-[#21e786]' : 'bg-[#555555]'}`} />
              <span className={`[font-family:'Pretendard-SemiBold',Helvetica] font-semibold ${step >= 2 ? 'text-white' : 'text-[#767676]'} text-[17px] whitespace-nowrap`}>
                내용 작성
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-16 pb-16 flex-1 overflow-y-auto">
          <div className="bg-[#0a0f14] rounded-[28px] p-12 border-[3px] border-[#21e786]/50">
            {step === 1 ? (
              <>
                {/* Request Section */}
                <div className="mb-8">
                  <h3 className="font-ria-sans font-bold text-[#21e786] text-[22px] mb-5">
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
                          {activityOptions.map((option, index) => {
                            const isSelected = selectedActivity === option;
                            const isNoRegret = option === "아쉬움 없음";

                            return (
                              <button
                                key={index}
                                onClick={() => handleSelectActivity(option)}
                                className={`px-5 py-2.5 border-2 rounded-full [font-family:'Pretendard-Medium',Helvetica] font-medium text-[15px] transition-colors ${
                                  isSelected
                                    ? isNoRegret
                                      ? "bg-white border-white text-[#040b11]"
                                      : "bg-[#21e786] border-[#21e786] text-[#040b11]"
                                    : isNoRegret
                                    ? "bg-transparent border-white text-white hover:bg-white/10"
                                    : "bg-transparent border-[#21e786] text-white hover:bg-[#21e786]/10"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleNextStep}
                    disabled={!selectedActivity}
                    className="px-12 py-4 bg-[#21e786] hover:bg-[#1bc876] rounded-2xl shadow-[0px_0px_30px_rgba(33,231,134,0.3)] transition-all border-2 border-[#21e786] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#040b11] text-[17px]">
                      선택 완료
                    </span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2 Content */}
                {/* Selected Activity Display */}
                <div className="mb-8">
                  <h3 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#21e786] text-[22px] mb-3">
                    선택한 활동
                  </h3>
                  <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[18px]">
                    {selectedActivity}
                  </p>
                </div>

                {/* Request B Section */}
                <div className="mb-8">
                  <h3 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#21e786] text-[22px] mb-5">
                    Request B
                  </h3>
                  <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] leading-relaxed mb-2">
                    위 '리뷰' 대상 활동을 택한 경우, 해당 활동을 진행 하지않아
                  </p>
                  <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] leading-relaxed mb-2">
                    성장 경험을 누리지 못한 본인의 일정 및 개인의 이유를 작성한 뒤,
                  </p>
                  <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-[16px] leading-relaxed">
                    지금 1주일이 지난 시점에서 해당 이유를 어떻게 생각하는지 '리뷰'해주세요.
                  </p>
                  <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[14px] leading-relaxed mt-4">
                    *본 과정을 통해, 과거 1주일 전의 '스스로'의 대한 아카이, 이후 성장의 기틀을 만덜어 다질 수 있습니다. 실패는 성장의 어머니!
                  </p>
                </div>

                {/* Text Input */}
                <div className="mb-4">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value.slice(0, 100))}
                    placeholder="클릭해서 내용을 작성해 주세요."
                    className="w-full h-[200px] px-6 py-5 bg-[#1a1f26] border-2 border-[#2a2f36] rounded-2xl text-white placeholder:text-[#555555] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[16px] resize-none focus:outline-none focus:border-[#21e786] transition-colors"
                  />
                  <div className="mt-2 text-right">
                    <span className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[14px]">
                      {reviewText.length} / 100
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-8">
                  <div className="flex gap-2 justify-center items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-all hover:scale-110"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill={star <= rating ? "#21e786" : "#555555"}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16 2L20.12 11.88L31 13.18L23.5 20.34L25.24 31L16 26.11L6.76 31L8.5 20.34L1 13.18L11.88 11.88L16 2Z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <p className="text-center mt-4 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#aaaaaa] text-[14px]">
                    변경을 주저말 주세요
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={onClose}
                    className="px-12 py-4 bg-[#21e786] hover:bg-[#1bc876] rounded-2xl shadow-[0px_0px_30px_rgba(33,231,134,0.3)] transition-all border-2 border-[#21e786]"
                  >
                    <span className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-[#040b11] text-[17px]">
                      제출하기
                    </span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
