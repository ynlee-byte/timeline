import React, { useState, useRef } from "react";
import cardModalSuccess from "../../../../../assets/cardModal-suscess.png";
import cardModalSuccessBanner from "../../../../../assets/cardModal-suscess02.png";
import cardModalFail from "../../../../../assets/cardModal-fail.png";
import iconScoop from "../../../../../icons/iconScoop.png";
import cardModalBg from "../../../../../assets/contact-bg.svg.png";
import selectButton02 from "../../../../../assets/selectButton02.png";
import selectButton03Mobile from "../../../../../assets/selectButton03 -m.png";
import selectButton04Mobile from "../../../../../assets/selectButton04 -m.png";
import modalBody from "../../../../../assets/modal body.png";
import bodyBadge from "../../../../../assets/body.png";
// Success badge images now loaded from public folder for better quality
import noticeModalSuccess from "../../../../../assets/noticeModal-suscess.png";
import noticeModalSuccessMobile from "../../../../../assets/noticeModal-m.png";
import noticeModalFail from "../../../../../icons/noticeModal-fail.png";
import noticeModalFailMobile from "../../../../../assets/noticeModal-m2.png";
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

interface JudgmentCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  type: 'success' | 'fail';
}

export const JudgmentCardModal: React.FC<JudgmentCardModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  type
}) => {
  const [reflectionText, setReflectionText] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const maxLength = 50;
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth > 0 && screenWidth >= 320 && screenWidth < 768;
  const isTablet = screenWidth > 0 && screenWidth >= 768 && screenWidth < 1280;
  const submitButtonRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (reflectionText.trim()) {
      setShowNotice(true);
      // 팝업은 클릭해야만 닫힘 (자동으로 닫히지 않음)
    }
  };

  const handleNoticeClose = () => {
    setShowNotice(false);
    if (onComplete) {
      onComplete();
    }
    onClose();
  };

  const handleTextareaFocus = () => {
    if (isTablet && submitButtonRef.current) {
      setTimeout(() => {
        submitButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute right-[5%] text-white hover:text-gray-300 transition-colors z-10 flex items-center ${isMobile ? 'text-xl' : 'text-3xl'}`}
            style={{
              top: isTablet ? 'calc(13% + 45px)' : isMobile ? '5%' : 'calc(13% - 25px)',
              height: isMobile ? 'auto' : isTablet ? '50px' : '60px'
            }}
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Modal container with background image */}
          <div className="relative w-full max-h-[95vh]" style={{
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

          {/* Content overlay */}
          <div className={`flex flex-col ${isMobile ? 'relative' : 'absolute inset-0'}`} style={{
            backgroundColor: isMobile ? '#4a4a4a' : undefined,
            borderRadius: isMobile ? '8px' : undefined,
            height: isMobile ? '100%' : undefined,
            transform: isTablet ? 'translateY(-10px)' : isMobile ? undefined : 'translateY(50px)'
          }}>
            {/* Header */}
            <div className={`flex items-center justify-center ${isMobile ? 'gap-0.25' : 'gap-1.5'}`} style={{
              marginTop: isTablet ? 'calc(13% + 55px)' : isMobile ? '8%' : 'calc(13% - 45px)'
            }}>
              {isMobile ? (
                <img
                  src={iconScoop.src}
                  alt="Scoop"
                  style={{
                    width: '30px',
                    height: '29px',
                    flexShrink: 0,
                    transform: 'scale(1.728)',
                    marginTop: '3px'
                  }}
                />
              ) : (
                <div className={`${isTablet ? 'w-[50px] h-[50px]' : 'w-[60px] h-[60px]'} flex items-center justify-center overflow-visible`}>
                  <img
                    src={iconScoop.src}
                    alt="Scoop"
                    className={`w-full h-full object-contain ${isTablet ? 'scale-[1.0368]' : 'scale-[1.44]'}`}
                  />
                </div>
              )}
              <h2 className={`font-ria-sans font-bold text-white ${isMobile ? 'text-[12px]' : isTablet ? 'text-[18px]' : 'text-[24px]'}`}>
                지난주 목표 카드 판정하기
              </h2>
            </div>

            {/* Banner */}
            <div className={`${isMobile ? 'mb-[3%]' : 'mx-[8%] mt-[1%] mb-[2%]'}`} style={{
              marginTop: isMobile ? 'calc(2% + 10px)' : undefined,
              marginLeft: isMobile ? 'calc(3% + 10px)' : undefined,
              marginRight: isMobile ? 'calc(3% + 10px)' : undefined
            }}>
              <div
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{
                  borderRadius: isMobile ? '12px' : '20px',
                  background: type === 'success'
                    ? 'linear-gradient(90deg, #10B981 0%, #FCD34D 100%)'
                    : 'linear-gradient(90deg, #8B5CF6 0%, #EF4444 100%)',
                  aspectRatio: isMobile ? '280 / 70' : '880 / 122'
                }}
              >
                <div className={`flex flex-col items-center justify-center ${isMobile ? (type === 'fail' ? 'mt-[29px]' : 'mt-[38px]') : isTablet ? (type === 'fail' ? 'mt-[25px]' : 'mt-[33px]') : 'mt-[33px]'}`}>
                  <span className={`font-ria-sans font-bold leading-none ${type === 'success' ? 'text-black' : 'text-white'} ${isMobile ? 'text-[12px]' : isTablet ? 'text-[14px]' : 'text-[24px]'}`} style={{
                    lineHeight: isMobile ? '1' : undefined,
                    display: isMobile ? 'block' : undefined
                  }}>
                    앵크레 wisdom
                  </span>
                  <img
                    src={type === 'success' ? (isMobile ? "/badge02-m.png" : "/badge02.png") : bodyBadge.src}
                    alt={type === 'success' ? "목표 달성!" : "다음 기회에..."}
                    className={`h-auto`}
                    style={{
                      width: type === 'success' ? (isMobile ? '171.6px' : isTablet ? '142.56px' : '198px') : (isMobile ? '132px' : isTablet ? '118.8px' : '150px'),
                      marginTop: isMobile ? (type === 'success' ? '-30px' : '-13px') : (isTablet ? (type === 'success' ? '-15px' : '-6px') : (type === 'success' ? '-5px' : '0px')),
                      imageRendering: 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`${isMobile ? 'mx-[2%]' : 'mx-[8%]'} relative`}
              style={{
                height: isMobile ? 'auto' : isTablet ? (type === 'success' ? '240px' : '240px') : (type === 'success' ? '360px' : '380px'),
                marginTop: isMobile ? '-10px' : undefined
              }}
            >
              {/* Modal Body Background */}
              {!isMobile && (
              <img
                src={modalBody.src}
                alt="Modal body"
                className="w-full h-full object-cover"
                style={{ borderRadius: isMobile ? '12px' : '20px' }}
              />
              )}

              {/* Content Overlay */}
              <div className={`${isMobile ? 'px-3 py-2.5 overflow-y-auto custom-scrollbar' : 'absolute inset-0'} ${isTablet ? 'px-6 py-3 overflow-y-auto custom-scrollbar' : 'px-6 py-4 overflow-y-auto custom-scrollbar'}`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#21e786 transparent',
                  maxHeight: isMobile ? 'calc(380px - 120px)' : undefined
                }}
              >
                {/* Request A Label */}
                <div className={`${isMobile ? 'mb-1' : isTablet ? 'mb-1' : 'mb-2'}`}>
                  <span className={`font-ria-sans font-bold text-[#21e786] ${isMobile ? 'text-[10px]' : isTablet ? 'text-[11px]' : 'text-[16px]'}`}>
                    Request A
                  </span>
                </div>

                {/* Main Text */}
                <div className={`${isMobile ? 'mb-1.5' : isTablet ? 'mb-2' : 'mb-3'}`}>
                  <p className={`[font-family:'Pretendard-SemiBold',Helvetica] font-medium text-white ${isMobile ? 'text-[14px]' : isTablet ? 'text-[14px]' : 'text-[20px]'} leading-[1.4] ${isMobile ? 'mb-0.5' : 'mb-2'}`}>
                    {type === 'success'
                      ? (isMobile ? '본인이 달성한 목표에 대해 돌아보고, 성취감과 자신감을 표현해보세요! 마음껏 자랑해보자구요 !' : '본인이 달성한 목표에 대해 돌아보고, 성취감과 자신감을 표현해보세요! 마음껏 자랑해보자구요 !')
                      : (isMobile ? '본인이 달성지 못한 목표에 대해 아쉬움, 그리고 그 아쉬움을 성찰하여 다음의 성장을 위한 다짐을 써주세요.' : '본인이 달성지 못한 목표에 대해 아쉬움, 그리고 그 아쉬움을 성찰하여 다음의 성장을 위한 다짐을 써주세요.')}
                  </p>
                  {!isMobile && (
                  <p className={`[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#808080] ${isTablet ? 'text-[11px]' : 'text-[14px]'} leading-[1.5]`}>
                    {type === 'success'
                      ? '어머어머하네요..! 규모가 크든, 작든! 스스로 목표를 세우고, 정말 달성했다는 것. 미래의 나와 과거의 내가 안정적으로 연결되어 신뢰감 있게 움직일 수 있다는 증표에요! 많은 기업의 인사 담당자들이 사회로의 진출과 커리어 성장에 제일 중요한 것 이라고 지적하는 것입니다! 축하드립니다. 멋진 성장을 이루셨네요!'
                      : '실망하셨나요? 천만의 말씀..! 목표를 세우고 실패하는 것은 아주 좋은 예행 연습이자 마음의 내성을 강하게 만드는 일입니다. 100전 100승 한 챔피언 보다 무서운 사람은 100전 100패를 하며 이를 갈고 있는 분노의 플레이어입니다. 목표를 설정했고, 노력한 당신, 충분히 박수받을만한 것 잘 아시죠?'}
                  </p>
                  )}
                </div>

                {/* Text Input */}
                <div className={`relative ${isMobile ? 'mb-0.5' : 'mb-2'}`}>
                  <textarea
                    value={reflectionText}
                    onChange={(e) => {
                      if (e.target.value.length <= maxLength) {
                        setReflectionText(e.target.value);
                      }
                    }}
                    onFocus={handleTextareaFocus}
                    placeholder="클릭해서 내용을 작성해주세요."
                    className={`w-full ${isMobile ? 'h-[50px]' : isTablet ? 'h-[60px]' : 'h-[100px]'} bg-[#2a2a2a] text-white ${isMobile ? 'rounded-md' : 'rounded-lg'} ${isMobile ? 'px-2.5 py-1.5' : 'px-4 py-3'} resize-none
                      [font-family:'Pretendard-Regular',Helvetica] ${isMobile ? 'text-[14px]' : isTablet ? 'text-[13px]' : 'text-[14px]'}
                      placeholder:text-[#666666]
                      focus:outline-none focus:ring-0 border-0`}
                    maxLength={maxLength}
                  />
                  <div className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-[#666666]" style={{
                    fontSize: isMobile ? '12px' : '12px',
                    marginTop: isMobile ? '-2px' : '4px'
                  }}>
                    {reflectionText.length} / {maxLength}
                  </div>
                </div>

                {/* Submit Button */}
                <div ref={submitButtonRef} className={`flex justify-center ${isMobile ? 'mt-1.5' : isTablet ? 'mt-2' : 'mt-3'}`}>
                  <button
                    onClick={handleSubmit}
                    disabled={!reflectionText.trim()}
                    className="disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    <img
                      src={isMobile ? selectButton04Mobile.src : selectButton02.src}
                      alt="작성 완료"
                      className={`${isMobile ? 'h-auto' : isTablet ? 'h-[32px]' : 'h-[40px]'} w-auto`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Notice Modal */}
      {showNotice && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={handleNoticeClose}
        >
          <div className="animate-fade-in">
            <img
              src={type === 'success'
                ? (isMobile ? noticeModalSuccessMobile.src : noticeModalSuccess.src)
                : (isMobile ? noticeModalFailMobile.src : noticeModalFail.src)
              }
              alt="판정 작성 완료"
              className="max-w-[90vw] max-h-[90vh] object-contain cursor-pointer"
              onClick={handleNoticeClose}
            />
          </div>
        </div>
      )}
    </>
  );
};
