import React, { useState, useEffect, useRef } from "react";
import cardModalBg from "../../../../../assets/contact-bg.svg.png";
import iconChat from "../../../../../icons/iconChat.png";
import lineModal from "../../../../../assets/line modal.png";
import modalBody from "../../../../../assets/modal body.png";
import selectButton from "../../../../../assets/selectButton.png";
import selectButton02 from "../../../../../assets/selectButton02.png";
import selectButton03Mobile from "../../../../../assets/selectButton03 -m.png";
import selectButton05 from "../../../../../assets/selectButton05.png";
import selectButton00 from "../../../../../assets/00.png";
// Notice modal images now loaded from public folder
import { useWindowWidth } from "../../../../../breakpoints";

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
  onComplete?: () => void;
}

const activityOptions = [
  "아쉬움 없음",
  "중앙 시작 브리핑",
  "엥크레 wisdom",
  "중앙 중간 브리핑",
  "엥크레 인포데스크",
  "중앙 마감 브리핑",
  "팀 미팅",
  "프로젝트 회의",
  "워크샵",
  "세미나",
  "네트워킹 행사",
  "멘토링 세션",
];

export const ReviewCardModal: React.FC<ReviewCardModalProps> = ({ isOpen, onClose, onComplete }) => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [step, setStep] = useState(1); // 1: 활동 선택, 2: Request B (아쉬움 없음인 경우) or 내용 작성, 3: 내용 작성 (아쉬움 없음인 경우)
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [showNotice, setShowNotice] = useState(false);
  const requestBButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  // Request B 화면에 진입하면 하단 버튼으로 자동 스크롤
  useEffect(() => {
    if (step === 2 && selectedActivity === '아쉬움 없음' && requestBButtonRef.current) {
      setTimeout(() => {
        requestBButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300);
    }
  }, [step, selectedActivity]);

  // 드롭다운이 열리면 드롭다운 끝까지 보이도록 자동 스크롤
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [isDropdownOpen]);

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

    // 3초 후 알림 모달과 메인 모달 닫기
    setTimeout(() => {
      setShowNotice(false);
      handleClose();
      // 작성 완료 콜백 호출
      if (onComplete) {
        onComplete();
      }
    }, 3000);
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      {!showNotice && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ${
          isAnimating ? 'bg-opacity-80 backdrop-blur-md' : 'bg-opacity-0'
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
            className={`absolute right-[5%] text-white hover:text-gray-300 transition-colors z-10 ${isMobile ? 'text-xl' : 'text-3xl'}`}
            style={{
              top: isTablet ? 'calc(13% + 52px)' : isMobile ? '5%' : 'calc(15% + 20px)'
            }}
            aria-label="Close modal"
          >
            ✕
          </button>

        {/* Modal container with background image */}
        <div className={`relative w-full max-h-[95vh]`} style={{
          maxWidth: isTablet ? '640px' : isMobile ? '280px' : 'min(1004px,90vw)',
          width: isMobile ? '280px' : undefined,
          height: isTablet ? '646px' : isMobile ? '380px' : 'auto',
          aspectRatio: isTablet ? undefined : isMobile ? undefined : '1004/850',
          background: isMobile ? 'linear-gradient(180deg, #2DF4A1 0%, #2DF4A1 100%)' : undefined,
          borderRadius: isMobile ? '10px' : undefined,
          padding: isMobile ? '2px' : undefined,
          boxShadow: isMobile ? '0 0 20px rgba(45, 244, 161, 0.5), 0 0 40px rgba(45, 244, 161, 0.3)' : undefined
        }}>
          {/* Background image */}
          {!isMobile && (
          <img
            src={cardModalBg.src}
            alt="Modal background"
            className="w-full h-full object-contain"
            style={{
              imageRendering: '-webkit-optimize-contrast',
            }}
          />
          )}

          {/* Content overlay - positioned absolutely */}
          <div className={`flex flex-col ${isMobile ? 'relative' : 'absolute inset-0'}`} style={{
            backgroundColor: isMobile ? '#4a4a4a' : undefined,
            borderRadius: isMobile ? '8px' : undefined,
            height: isMobile ? '100%' : undefined
          }}>
            {/* Header: Icon and Title */}
            <div className={`flex items-center justify-center ${isMobile ? 'gap-0.5' : 'gap-[clamp(8px,2vw,12px)]'}`} style={{
              marginTop: isTablet ? 'calc(13% + 55px)' : isMobile ? '8%' : 'calc(13% + 20px)'
            }}>
              {isMobile ? (
                <img
                  src={iconChat.src}
                  alt="Chat icon"
                  style={{
                    width: '30px',
                    height: '29px',
                    flexShrink: 0,
                    transform: 'scale(1.6)',
                    marginTop: '3px'
                  }}
                />
              ) : (
                <div className="flex items-center justify-center" style={{
                  width: isTablet ? '36px' : 'clamp(30px,8vw,43px)',
                  height: isTablet ? '36px' : 'clamp(30px,8vw,43px)',
                  marginTop: '3px'
                }}>
                  <img
                    src={iconChat.src}
                    alt="Chat icon"
                    style={{
                      width: isTablet ? '36px' : 'clamp(30px,8vw,43px)',
                      height: isTablet ? '34px' : 'clamp(28px,7.5vw,41px)',
                      flexShrink: 0,
                      transform: isTablet ? 'scale(1.5)' : 'scale(1.95)'
                    }}
                  />
                </div>
              )}
              <h2 className="font-ria-sans font-bold text-white tracking-[-0.5px]" style={{
                fontSize: isMobile ? '12px' : isTablet ? '22px' : 'clamp(20px,5vw,32px)'
              }}>
                리뷰 카드
              </h2>
            </div>

            {/* Step indicator */}
            <div className={`relative flex items-center justify-center ${isMobile ? 'hidden' : ''}`} style={{
              gap: '46%',
              paddingLeft: '27%',
              paddingRight: '27%',
              marginTop: isTablet ? '20px' : 'clamp(20px,6vw,50px)',
              marginBottom: isTablet ? '10px' : undefined
            }}>
              {/* Line background */}
              <img
                src={lineModal.src}
                alt="Progress line"
                className="absolute top-[15px] left-0 right-0 w-full h-auto z-0"
                style={{ transform: 'translateY(-50%)' }}
              />

              <div className="flex flex-col items-center gap-[clamp(4px,1vw,8px)] relative z-10">
                <div className="relative flex items-center justify-center">
                  <div className={`rounded-full ${step === 1 ? 'bg-[#21e786]' : 'bg-[#888888]'} opacity-20`} style={{ width: 'clamp(20px,5vw,30px)', height: 'clamp(20px,5vw,30px)' }} />
                  <div className={`absolute rounded-full ${step === 1 ? 'bg-[#21e786]' : 'bg-[#888888]'}`} style={{ width: 'clamp(10px,2.5vw,15px)', height: 'clamp(10px,2.5vw,15px)' }} />
                </div>
                <span className={`font-ria-sans font-medium ${step === 1 ? 'text-white' : 'text-[#888888]'} whitespace-nowrap`} style={{ fontSize: isTablet ? '12px' : 'clamp(12px,3vw,16px)' }}>
                  활동 선택
                </span>
              </div>
              <div className="flex flex-col items-center gap-[clamp(4px,1vw,8px)] relative z-10">
                <div className="relative flex items-center justify-center">
                  <div className={`rounded-full ${(selectedActivity !== '아쉬움 없음' && step === 2) || (selectedActivity === '아쉬움 없음' && step === 3) ? 'bg-[#21e786]' : 'bg-[#888888]'} opacity-20`} style={{ width: 'clamp(20px,5vw,30px)', height: 'clamp(20px,5vw,30px)' }} />
                  <div className={`absolute rounded-full ${(selectedActivity !== '아쉬움 없음' && step === 2) || (selectedActivity === '아쉬움 없음' && step === 3) ? 'bg-[#21e786]' : 'bg-[#888888]'}`} style={{ width: 'clamp(10px,2.5vw,15px)', height: 'clamp(10px,2.5vw,15px)' }} />
                </div>
                <span className={`font-ria-sans font-medium ${(selectedActivity !== '아쉬움 없음' && step === 2) || (selectedActivity === '아쉬움 없음' && step === 3) ? 'text-white' : 'text-[#888888]'} whitespace-nowrap`} style={{ fontSize: isTablet ? '12px' : 'clamp(12px,3vw,16px)' }}>
                  내용 작성
                </span>
              </div>
            </div>

            {/* Modal Body Container with background */}
            <div className={`relative ${isMobile ? 'mx-[5%]' : 'mx-[17.7%]'}`} style={{
              marginTop: isTablet ? '25px' : isMobile ? '12px' : 'clamp(10px,6vw,40px)'
            }}>
              {/* Background image */}
              {!isMobile && (
              <img
                src={modalBody.src}
                alt="Modal body background"
                className="w-full h-auto"
              />
              )}

              {/* Content overlay */}
              <div
                className={`${isMobile ? 'flex flex-col px-3 py-2 overflow-y-auto custom-scrollbar' : 'absolute inset-0 flex flex-col overflow-y-auto custom-scrollbar px-[5%]'} ${isTablet ? 'py-[4%]' : 'py-[6%]'}`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#21e786 transparent',
                  maxHeight: isMobile ? 'calc(380px - 80px)' : undefined
                }}
              >
                {step === 1 ? (
                  <>
                    {/* Request A */}
                    <h3 className="font-ria-sans font-bold text-[#21e786]" style={{
                      fontSize: isMobile ? '10px' : isTablet ? '12px' : '14px',
                      marginBottom: isMobile ? '8px' : isTablet ? '1%' : '1.5%'
                    }}>
                      Request A
                    </h3>

                    {/* Description */}
                    <p className="[font-family:'Pretendard',sans-serif] font-medium text-white" style={{
                      fontSize: isMobile ? '14px' : isTablet ? '14px' : '18px',
                      lineHeight: isMobile ? '1.4' : '1.5',
                      marginBottom: isMobile ? '10px' : isTablet ? '0.75%' : '1%'
                    }}>
                      {isMobile ? (
                        <>
                          지난 주 클럽 활동 중에 '할 수 있었'는데 '못하거나 안해서' 아쉬운 활동을 1개 돌아보자구요!
                          <br />
                          별다른 놓친것이 없는 경우에는, '아쉬움 없음'을 선택할 수 있습니다.
                        </>
                      ) : (
                        <>
                          지난 주 클럽 활동 중에 '할 수 있었는데 '못하거나 아쉬운 활동을 1개 돌아보자구요!
                          <br />
                          별다른 놓친것이 없는 경우에는, '아쉬움 없음'을 선택할 수 있습니다.
                        </>
                      )}
                    </p>

                    {/* Sub text */}
                    <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666]" style={{
                      fontSize: isMobile ? '12px' : isTablet ? '13px' : '16px',
                      marginBottom: isMobile ? '10px' : isTablet ? '7.5px' : '10px'
                    }}>
                      *서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트서브엔트
                    </p>

                    {/* Dropdown */}
                    <div className="relative">
                      <div
                        className={`bg-[#3a3a3a] ${isMobile ? 'rounded-[8px]' : 'rounded-[12px]'} border border-[#4a4a4a] cursor-pointer hover:border-[#21e786] transition-colors flex items-center justify-between ${isMobile ? 'px-2.5' : 'px-4'} w-full`}
                        style={{
                          height: isMobile ? '50px' : isTablet ? '40px' : '50px',
                          marginBottom: isMobile ? '5px' : isTablet ? '10px' : '15px'
                        }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className={`[font-family:'Pretendard',sans-serif] font-medium ${selectedActivity ? 'text-white' : 'text-[#888888]'}`} style={{
                          fontSize: isMobile ? '12px' : isTablet ? '14px' : '18px'
                        }}>
                          {selectedActivity || "활동을 선택해주세요"}
                        </span>
                        <svg
                          className={`${isMobile ? 'w-[16px] h-[16px]' : 'w-[24px] h-[24px]'} transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 9L12 16L5 9" stroke="#21e786" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Dropdown options */}
                      {isDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className={`absolute ${isMobile ? 'top-[58px]' : isTablet ? 'top-[50px]' : 'top-[60px]'} left-0 right-0 z-50 bg-[#1a1a1a] ${isMobile ? 'p-2.5 rounded-[8px] max-h-[150px]' : isTablet ? 'p-4 rounded-[12px] max-h-[200px]' : 'p-4 rounded-[12px] max-h-[300px]'} overflow-y-auto custom-scrollbar`}
                          onWheel={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()}
                        >
                          <div className={isMobile ? 'flex flex-col items-center gap-2' : 'flex flex-wrap gap-[2%]'}>
                            {activityOptions.map((option, index) => {
                              const isSelected = selectedActivity === option;
                              const borderColor = option === '아쉬움 없음' ? 'border-white' : 'border-[#21e786]';
                              const isNoRegret = option === '아쉬움 없음';

                              return (
                                <button
                                  key={index}
                                  onClick={() => handleSelectActivity(option)}
                                  className={`${isMobile ? 'inline-block px-4 py-2 border-[1.5px]' : 'px-[4%] py-[1%] border-2 mb-[2%]'} ${borderColor} rounded-full [font-family:'Pretendard',sans-serif] font-medium transition-all duration-200 ${
                                    isSelected
                                      ? isNoRegret
                                        ? 'bg-white text-black'
                                        : 'bg-[#21e786] text-[#0a0a0a]'
                                      : isNoRegret
                                        ? 'bg-transparent text-white hover:bg-white hover:text-black'
                                        : 'bg-transparent text-white hover:bg-[#21e786] hover:text-[#0a0a0a]'
                                  }`}
                                  style={{
                                    fontSize: isMobile ? '12px' : isTablet ? '12px' : '14px'
                                  }}
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
                    <div className="flex justify-center" style={{
                      marginTop: isMobile ? '10px' : undefined
                    }}>
                      <img
                        src={isMobile ? selectButton03Mobile.src : selectButton.src}
                        alt="선택 완료"
                        onClick={handleNextStep}
                        className="cursor-pointer transition-transform duration-200 hover:scale-105"
                        style={{
                          width: 'auto',
                          height: isMobile ? 'auto' : 'auto',
                          transform: isTablet ? 'scale(0.8)' : 'none'
                        }}
                      />
                    </div>
                  </>
                ) : step === 2 && selectedActivity === '아쉬움 없음' ? (
                  <>
                    {/* Step 2: Request B (아쉬움 없음인 경우) */}
                    {/* Selected Activity */}
                    <div className={`${isMobile ? 'mb-2' : 'mb-[2%]'}`}>
                      <h3 className="font-ria-sans font-bold text-[#767676]" style={{
                        fontSize: isMobile ? '12px' : isTablet ? '11px' : '14px',
                        marginBottom: isMobile ? '2px' : '2%'
                      }}>
                        선택한 활동
                      </h3>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-[#555555]" style={{
                        fontSize: isMobile ? '14px' : isTablet ? '15px' : '18px'
                      }}>
                        {selectedActivity}
                      </p>
                    </div>

                    {/* Request B */}
                    <div className={`${isMobile ? 'mb-3' : 'mb-[3%]'}`}>
                      <h3 className="font-ria-sans font-bold text-[#767676]" style={{
                        fontSize: isMobile ? '12px' : isTablet ? '11px' : '14px',
                        marginBottom: isMobile ? '4px' : '3%'
                      }}>
                        Request B
                      </h3>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-[#555555]" style={{
                        fontSize: isMobile ? '14px' : isTablet ? '14px' : '18px',
                        lineHeight: isMobile ? '1.4' : '1.5',
                        marginBottom: isMobile ? '4px' : '2%'
                      }}>
                        위 '리뷰' 대상 활동을 택한 경우, 해당 활동을 진행 하지 않아
                        성장 경험을 누리지 못한 본인의 일정 및 개인의 이유를 작성한 뒤,
                        지금 1주일이 지난 시점에서 해당 이유를 어떻게 생각하는지 '리뷰'해주세요.
                      </p>
                      {!isMobile && (
                        <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#555555] leading-[1.5]" style={{
                          fontSize: isTablet ? '11px' : '14px'
                        }}>
                          *본 과정을 통해, 과거 1주일 전의 '스스로'와 대화 하며, 이후 성장의 기틀을 단단히 다질 수 있습니다. 실패는 성공의 어머니!
                        </p>
                      )}
                    </div>

                    {/* Information Message */}
                    <div className={`bg-[#2a2a2a] ${isMobile ? 'rounded-md px-3 py-2.5 mb-3' : 'rounded-lg px-4 py-4 mb-[3%]'}`}>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-[#21e786] text-center" style={{
                        fontSize: isMobile ? '14px' : isTablet ? '14px' : '16px',
                        lineHeight: '1.5'
                      }}>
                        "아쉬움 없음"을 선택했으므로
                        <br />
                        다른 페이지에서 작성을 하실 수 있습니다
                      </p>
                    </div>

                    {/* 넘어 가기 Button */}
                    <div ref={requestBButtonRef} className="flex justify-center" style={{
                      marginTop: isMobile ? '10px' : undefined
                    }}>
                      <img
                        src={isMobile ? selectButton00.src : selectButton05.src}
                        alt="넘어 가기"
                        onClick={() => setStep(3)}
                        className="cursor-pointer transition-transform duration-200 hover:scale-105"
                        style={{
                          width: 'auto',
                          height: isMobile ? 'auto' : 'auto',
                          transform: isTablet ? 'scale(0.8)' : 'none'
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step 2 or 3: 내용 작성 */}
                    {/* Selected Activity */}
                    <div className={`${isMobile ? 'mb-2' : 'mb-[2%]'}`}>
                      <h3 className="font-ria-sans font-bold text-[#21e786]" style={{
                        fontSize: isMobile ? '12px' : isTablet ? '11px' : '14px',
                        marginBottom: isMobile ? '2px' : '2%'
                      }}>
                        선택한 활동
                      </h3>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white" style={{
                        fontSize: isMobile ? '14px' : isTablet ? '15px' : '18px'
                      }}>
                        {selectedActivity}
                      </p>
                    </div>

                    {/* Request B or C */}
                    <div className={`${isMobile ? 'mb-2' : 'mb-[2%]'}`}>
                      <h3 className="font-ria-sans font-bold text-[#21e786]" style={{
                        fontSize: isMobile ? '12px' : isTablet ? '11px' : '14px',
                        marginBottom: isMobile ? '2px' : '3%'
                      }}>
                        {selectedActivity === '아쉬움 없음' ? 'Request C' : 'Request B'}
                      </h3>
                      {selectedActivity === '아쉬움 없음' ? (
                        // 아쉬움 없음 선택 시 - Request C
                        <p className="[font-family:'Pretendard',sans-serif] font-medium text-white" style={{
                          fontSize: isMobile ? '14px' : isTablet ? '14px' : '18px',
                          lineHeight: isMobile ? '1.4' : '1.5',
                          marginBottom: isMobile ? '2px' : '1%'
                        }}>
                          위 '리뷰' 대상 활동을 택한 경우, 해당 활동을 진행 하지않아
                          성장 경험을 누리지 못한 본인의 일정 및 개인의 이유를 작성한 뒤,
                          지금 1주일이 지난 시점에서 해당 이유를 어떻게 생각하는지 '리뷰'해주세요.
                        </p>
                      ) : (
                        // 나머지 활동 선택 시
                        <>
                          <p className="[font-family:'Pretendard',sans-serif] font-medium text-white" style={{
                            fontSize: isMobile ? '14px' : isTablet ? '14px' : '18px',
                            lineHeight: isMobile ? '1.4' : '1.5',
                            marginBottom: isMobile ? '2px' : '1%'
                          }}>
                            {isMobile
                              ? '위 \'리뷰\' 대상 활동을 택한 경우, 해당 활동을 진행 하지 않아 성장 경험을 누리지 못한 본인의 일정 및 개인의 이유를 작성한 뒤, 지금 1주일이 지난 시점에서 해당 이유를 어떻게 생각하는지 \'리뷰\'해주세요.'
                              : '위 \'리뷰\' 대상 활동을 택한 경우, 해당 활동을 진행 하지 않아'}
                          </p>
                          {!isMobile && (
                            <>
                              <p className="[font-family:'Pretendard',sans-serif] font-medium text-white leading-[1.5] mb-[1%]" style={{
                                fontSize: isTablet ? '14px' : '18px'
                              }}>
                                성장 경험을 누리지 못한 본인의 일정 및 개인의 이유를 작성한 뒤,
                              </p>
                              <p className="[font-family:'Pretendard',sans-serif] font-medium text-white leading-[1.5] mb-[2%]" style={{
                                fontSize: isTablet ? '14px' : '18px'
                              }}>
                                지금 1주일이 지난 시점에서 해당 이유를 어떻게 생각하는지 '리뷰'해주세요.
                              </p>
                              <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666] leading-[1.5]" style={{
                                fontSize: isTablet ? '11px' : '14px'
                              }}>
                                *본 과정을 통해, 과거 1주일 전의 '스스로'와 대화 하며, 이후 성장의 기틀을 단단히 다질 수 있습니다. 실패는 성공의 어머니!
                              </p>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* Text Input */}
                    <div className={`${isMobile ? 'mb-1' : 'mb-[1%]'}`}>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value.slice(0, 100))}
                        placeholder="클릭해서 내용을 작성해주세요."
                        className={`w-full ${isMobile ? 'h-[50px] px-2.5 py-1.5 rounded-[8px]' : isTablet ? 'h-[80px] px-4 py-3 rounded-[12px]' : 'h-[120px] px-4 py-3 rounded-[12px]'} bg-[#3a3a3a] border border-[#4a4a4a] text-white placeholder:text-[#666666] [font-family:'Pretendard',sans-serif] font-normal resize-none focus:outline-none focus:border-[#21e786] transition-colors`}
                        style={{
                          fontSize: isMobile ? '14px' : isTablet ? '13px' : '16px'
                        }}
                      />
                      <div className={`text-left ${isMobile ? 'mt-0.5' : 'mt-1'}`}>
                        <span className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666]" style={{
                          fontSize: isMobile ? '14px' : isTablet ? '11px' : '14px'
                        }}>
                          {reviewText.length} / 100
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className={`${isMobile ? 'mb-0.5' : 'mb-[1.5%]'}`}>
                      <div className={`flex ${isMobile ? 'gap-1' : 'gap-0'} justify-start`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`transition-all hover:scale-110 ${isMobile ? 'p-1' : 'p-0'}`}
                          >
                            <svg
                              width={isMobile ? "22" : "22"}
                              height={isMobile ? "22" : "22"}
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
                    <div className={`${isMobile ? 'mb-1' : 'mb-[2%]'}`}>
                      <p className="[font-family:'Pretendard',sans-serif] font-medium text-white leading-[1.5]" style={{
                        fontSize: isMobile ? '14px' : isTablet ? '13px' : '16px',
                        marginBottom: isMobile ? '0' : '2%'
                      }}>
                        별점을 추가해 주세요.
                      </p>
                      {!isMobile && selectedActivity === '아쉬움 없음' && (
                      <p className="[font-family:'Pretendard',sans-serif] font-normal text-[#666666] leading-[1.6]" style={{
                        fontSize: isTablet ? '10px' : '12px'
                      }}>
                        본인의 이유가 스스로 생각했을때 '정당할수록' 별점이 올라갑니다! 즉 별 5개를 책정했다는 것은 하지 못한 활동과 기회를 놓친 것이, 정말 피할수 없는 일이었다는 것 ! 별점이 높을수록 후회가 남지 않고 스스로 자신감이 생길거에요! 별 갯수가 낮다고 하더라도 ! 내 스스로를 돌아보며 또 성장할 수 있는 하나의 기틀이 됩니다! 우리 지독하게 성장하자구요!
                      </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center" style={{
                      marginTop: isMobile ? '10px' : undefined
                    }}>
                      <img
                        src={isMobile ? selectButton03Mobile.src : selectButton02.src}
                        alt="작성 완료"
                        onClick={handleSubmit}
                        className="cursor-pointer transition-transform duration-200 hover:scale-105"
                        style={{
                          width: 'auto',
                          height: isMobile ? 'auto' : 'auto',
                          transform: isTablet ? 'scale(0.8)' : 'none'
                        }}
                      />
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
              src={isMobile ? "/noticeModal-m3.png" : "/noticeModal.png"}
              alt="리뷰 작성 완료"
              className="max-w-[90vw] max-h-[90vh]"
              style={{
                objectFit: 'contain',
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'transform'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
