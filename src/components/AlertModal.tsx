"use client";

import React from "react";
import { Button } from "./ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  type?: string;
}

export function AlertModal({
  isOpen,
  onClose,
  title = "",
  message,
  confirmText = "확인",
  cancelText,
  onConfirm,
  type,
}: AlertModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-[#1a1f26] rounded-lg p-8 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-xl mb-4">
            {title}
          </h2>
        )}

        <p className="[font-family:'Pretendard-Regular',Helvetica] font-normal text-white text-base mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-end">
          {cancelText && (
            <Button
              onClick={onClose}
              className="bg-[#2a2f36] hover:bg-[#3a3f46] text-white px-6 py-2 rounded [font-family:'Pretendard-SemiBold',Helvetica] font-semibold"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            className="bg-app-primary hover:bg-app-primary/90 text-[#141b22] px-6 py-2 rounded [font-family:'Pretendard-SemiBold',Helvetica] font-semibold"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}