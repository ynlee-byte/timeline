import React, { useState, useEffect } from "react";
import cardModalBg from "../../../../../assets/contact-bg.svg.png";
import iconChat from "../../../../../icons/iconChat.png";
import lineModal from "../../../../../assets/line modal.png";
import modalBody from "../../../../../assets/modal body.png";
import selectButton from "../../../../../assets/selectButton.png";
import noticeModal from "../../../../../assets/noticeModal.png";

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #21e786;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #1bc876;
  }
`;

interface ReviewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const activityOptions = [
  "아쉬움 없음",
  "중앙 시작 브리핑",
  "엥크레 wisdom",
  "중앙 중간 브리핑",
  "엥크레 인포데스크",
  "중앙 마감 브리핑",
];

export const ReviewCardModal: React.FC<ReviewCardModalProps> = ({ isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [step, setStep] = useState(1); // 1: 활동 선택, 2: 내용 작성
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsDropdownOpen(false);
    setSelectedActivity("");
    setStep(1);
    setReviewText("");
    setRating(0);
    setShowNotice(false);
    onClose();
  };

  const handleSelectActivity = (activity: string) => {
    setSelectedActivity(activity);
    setIsDropdownOpen(false);
  };

  const handleNextStep = () => {
    if (selectedActivity) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    setShowNotice(true);

    // 5초 후 알림 모달과 메인 모달 닫기
    setTimeout(() => {
      setShowNotice(false);
      handleClose();
    }, 5000);
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      {!showNotice && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ${
          isAnimating ? 'bg-opacity-75 backdrop-blur-sm' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      >
        <div
          className={`relative transition-all duration-300 ease-out ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            aria-label="Close modal"
          >
            ✕
          </button>

        {/* Modal container with background image */}
        <div className="relative" style={{ width: '1004px', height: '691px', maxWidth: '90vw', maxHeight: '90vh' }}>
          {/* Background image */}
          <img
            src={cardModalBg.src}
            alt="Modal background"
            className="w-full h-full object-contain"
            style={{
              imageRendering: '-webkit-optimize-contrast',
            }}
          />

          {/* Content overlay - positioned absolutely */}
          <div className="absolute inset-0 flex flex-col">
            {/* Header: Icon and Title */}
            <div className="flex items-center justify-center gap-3 mt-[7.5%]">
              <img
                src={iconChat.src}
                alt="Chat icon"
                style={{ width: '43px', height: '41px', flexShrink: 0 }}
              />
              <h2 className="font-ria-sans font-bold text-white text-[32px] tracking-[-0.5px]">
                리뷰 카드
              </h2>
            </div>

            {/* Step indicator */}
            <div className="relative flex items-center justify-center gap-[46%] px-[27%]" style={{ marginTop: '43px' }}>
              {/* Line background */}
              <img
                src={lineModal.src}
                alt="Progress line"
                className="absolute top-[15px] left-0 right-0 w-full h-auto z-0"
                style={{ transform: 'translateY(-50%)' }}
              />

              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="relative flex items-center justify-center">
                  <div className={`w-[30px] h-[30px] rounded-full ${step >= 1 ? 'bg-[#21e786]' : 'bg-[#888888]'} opacity-20`} />
                  <div className={`absolute w-[15px] h-[15px] rounded-full ${step >= 1 ? 'bg-[#21e786]' : 'bg-[#888888]'}`} />
                </div>
                <span className={`font-ria-sans font-medium ${step >= 1 ? 'text-white' : 'text-[#888888]'} text-[16px] whitespace-nowrap`}>
                  활동 선택
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="relative flex items-center justify-center">
                  <div className={`w-[30px] h-[30px] rounded-full ${step >= 2 ? 'bg-[#21e786]' : 'bg-[#888888]'} opacity-20`} />
                  <div className={`absolute w-[15px] h-[15px] rounded-full ${step >= 2 ? 'bg-[#21e786]' : 'bg-[#888888]'}`} />
                </div>
                <span className={`font-ria-sans font-medium ${step >= 2 ? 'text-white' : 'text-[#888888]'} text-[16px] whitespace-nowrap`}>
                  내용 작성
                </span>
              </div>
            </div>

            {/* Modal Body Container with background */}
            <div className="relative mx-[17.7%]" style={{ marginTop: '43px' }}>
              {/* Background image */}
              <img
                src={modalBody.src}
                alt="Modal body background"
                className="w-full h-auto"
              />

              {/* Content overlay */}
              <div
                className="absolute inset-0 flex flex-col px-[5%] py-[6%] overflow-y-auto custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#21e786 transparent'
                }}
              >
                {step === 1 ? (
                  <>
                    {/* Request A */}
                    <h3 className="font-ria-sans font-bold text-[#21e786] text-[14px] mb-[3%]">
                      Request A
                    </h3>

                    {/* Description */}
                    <p className="[font-family:'Pretendard',sans-serif] font-medium text-white text-[18px] leading-[1.5] mb-[2%]">
                      지난 주 클럽 활동 중에 '할 수 있었는데 '못하거나 아쉬운 활동을 1개 돌아보자구요!
                      <br />
                      별다른 놓친것이 없는 경우에는, '아쉬움 없음'을 선택할 수 있습니다.
                    </p>

                    {/* Sub text */}
                    <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666] text-[16px]" style={{ marginBottom: '20px' }}>
                      *서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트
                    </p>

                    {/* Dropdown */}
                    <div className="relative">
                      <div
                        className="bg-[#3a3a3a] rounded-[12px] border border-[#4a4a4a] cursor-pointer hover:border-[#21e786] transition-colors flex items-center justify-between px-4 w-full"
                        style={{ height: '50px', marginBottom: '30px' }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className={`[font-family:'Pretendard',sans-serif] font-medium text-[18px] ${selectedActivity ? 'text-white' : 'text-[#888888]'}`}>
                          {selectedActivity || "활동을 선택해주세요"}
                        </span>
                        <svg
                          className={`w-[24px] h-[24px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 9L12 16L5 9" stroke="#21e786" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Dropdown options */}
                      {isDropdownOpen && (
                        <div className="absolute top-[60px] left-0 right-0 z-50 bg-[#1a1a1a] p-4 rounded-[12px]">
                          <div className="flex flex-wrap gap-[2%]">
                            {activityOptions.map((option, index) => {
                              const isSelected = selectedActivity === option;
                              const borderColor = option === '아쉬움 없음' ? 'border-white' : 'border-[#21e786]';

                              return (
                                <button
                                  key={index}
                                  onClick={() => handleSelectActivity(option)}
                                  className={`px-[4%] py-[1%] border-2 ${borderColor} rounded-full [font-family:'Pretendard',sans-serif] font-medium text-[14px] transition-all duration-200 mb-[2%] ${
                                    isSelected
                                      ? 'bg-[#21e786] text-[#0a0a0a]'
                                      : 'bg-transparent text-white hover:bg-[#21e786] hover:text-[#0a0a0a]'
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

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <img
                        src={selectButton.src}
                        alt="선택 완료"
                        onClick={handleNextStep}
                        className="cursor-pointer hover:opacity-90 transition-opacity duration-200"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step 2: 내용 작성 */}
                    {/* Selected Activity */}
                    <div className="mb-[4%]">
                      <h3 className="font-ria-sans font-bold text-[#21e786] text-[14px] mb-[2%]">
                        선택한 활동
                      </h3>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white text-[18px]">
                        {selectedActivity}
                      </p>
                    </div>

                    {/* Request B */}
                    <div className="mb-[4%]">
                      <h3 className="font-ria-sans font-bold text-[#21e786] text-[14px] mb-[3%]">
                        Request B
                      </h3>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white text-[18px] leading-[1.5] mb-[1%]">
                        위 '리뷰' 대상 활동을 택한 경우, 해당 활동을 진행 하지 않아
                      </p>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white text-[18px] leading-[1.5] mb-[1%]">
                        성장 경험을 누리지 못한 본인의 일정 및 개인의 이유를 작성한 뒤,
                      </p>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white text-[18px] leading-[1.5] mb-[2%]">
                        지금 1주일이 지난 시점에서 해당 이유를 어떻게 생각하는지 '리뷰'해주세요.
                      </p>
                      <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666] text-[14px] leading-[1.5]">
                        *본 과정을 통해, 과거 1주일 전의 '스스로'와 대화 하며, 이후 성장의 기틀을 단단히 다질 수 있습니다. 실패는 성공의 어머니!
                      </p>
                    </div>

                    {/* Text Input */}
                    <div className="mb-[2%]">
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value.slice(0, 100))}
                        placeholder="클릭해서 내용을 작성해 주세요."
                        className="w-full h-[120px] px-4 py-3 bg-[#3a3a3a] rounded-[12px] border border-[#4a4a4a] text-white placeholder:text-[#666666] [font-family:'Pretendard',sans-serif] font-normal text-[16px] resize-none focus:outline-none focus:border-[#21e786] transition-colors"
                      />
                      <div className="text-left mt-1">
                        <span className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666] text-[14px]">
                          {reviewText.length} / 100
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="mb-[3%]">
                      <div className="flex gap-0 justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-all hover:scale-110 p-0"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill={star <= rating ? "#21e786" : "#767676"}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2L14.09 8.92L21 9.77L16.5 14.14L17.63 21L12 17.77L6.37 21L7.5 14.14L3 9.77L9.91 8.92L12 2Z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Text */}
                    <div className="mb-[4%]">
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white text-[16px] leading-[1.5] mb-[2%]">
                        별점을 추가해 주세요.
                      </p>
                      <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666] text-[12px] leading-[1.6]">
                        본인의 이유가 스스로 생각했을때 '정당할수록' 별점이 올라갑니다! 즉 별 5개를 책정했다는 것은 하지 못한 활동과 기회를 놓친 것이, 정말 피할수 없는 일이었다는 것 ! 별점이 높을수록 후회가 남지 않고 스스로 자신감이 생길거에요! 별 갯수가 낮다고 하더라도 ! 내 스스로를 돌아보며 또 성장할 수 있는 하나의 기틀이 됩니다! 우리 지독하게 성장하자구요!
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={handleSubmit}
                        className="bg-[#21e786] hover:opacity-90 rounded-[8px] transition-opacity duration-200"
                        style={{
                          padding: '10px 28px',
                          boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.25)',
                        }}
                      >
                        <span className="[font-family:'Pretendard',sans-serif] font-bold text-black text-[16px]">
                          작성 완료
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      )}

      {/* Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="animate-fade-in">
            <img
              src={noticeModal.src}
              alt="리뷰 작성 완료"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
