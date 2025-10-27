"use client";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "인증에 실패했습니다.");
    } finally {
      setLoading(false);
    }
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-app-primary text-2xl"
        >
          ✕
        </button>

        <h2 className="[font-family:'Pretendard-Bold',Helvetica] font-bold text-white text-2xl mb-6">
          {isLogin ? "로그인" : "회원가입"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-sm mb-2 block">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#141b22] border border-[#2a2f36] rounded text-white [font-family:'Pretendard-Regular',Helvetica] focus:outline-none focus:border-app-primary"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-sm mb-2 block">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#141b22] border border-[#2a2f36] rounded text-white [font-family:'Pretendard-Regular',Helvetica] focus:outline-none focus:border-app-primary"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && (
            <p className="[font-family:'Pretendard-Regular',Helvetica] text-red-500 text-sm">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-app-primary hover:bg-app-primary/90 text-[#141b22] py-3 rounded [font-family:'Pretendard-SemiBold',Helvetica] font-semibold"
          >
            {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
          </Button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="[font-family:'Pretendard-Medium',Helvetica] font-medium text-app-primary text-sm hover:underline"
          >
            {isLogin ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}