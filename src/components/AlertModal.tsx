"use client";

import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'recognition' | 'applause'; // 귀감(초록) vs 박수(보라)
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, message, type = 'recognition' }) => {
  if (!isOpen) return null;

  const isApplause = type === 'applause';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative bg-[#1a1a1a] border-2 rounded-2xl p-8 w-full max-w-md ${
          isApplause
            ? 'border-[#E52B50] shadow-[0_0_30px_rgba(229,43,80,0.3)]'
            : 'border-[#21e786] shadow-[0_0_30px_rgba(33,231,134,0.3)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-white transition-colors text-2xl ${
            isApplause ? 'hover:text-[#E52B50]' : 'hover:text-[#21e786]'
          }`}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Message */}
        <div className="flex flex-col items-center gap-6 mt-2">
          <p className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-center text-lg leading-relaxed">
            {message}
          </p>

          {/* Confirm Button */}
          <button
            onClick={onClose}
            className={`w-full font-semibold py-3 px-6 rounded-full [font-family:'Pretendard-SemiBold',Helvetica] transition-all ${
              isApplause
                ? 'bg-gradient-to-r from-[#6D24C8] to-[#E52B50] hover:from-[#5a1ea8] hover:to-[#c92443] text-white'
                : 'bg-[#21e786] hover:bg-[#1bc876] text-black'
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};