"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, name);
        if (error) {
          setError(error.message);
        } else {
          // 회원가입 후 바로 로그인 시도
          const { error: signInError } = await signIn(email, password);
          if (signInError) {
            // 이메일 확인이 필요한 경우
            alert('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
          } else {
            // 바로 로그인 성공
            alert('회원가입 및 로그인이 완료되었습니다!');
          }
          onClose();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setIsSignUp(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        className="relative bg-[#1a1a1a] border-2 border-[#21e786] rounded-2xl w-full mx-4 shadow-[0_0_30px_rgba(33,231,134,0.3)]"
        style={{ padding: 'clamp(20px, 5vw, 32px)', maxWidth: 'min(90%, 448px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-[#21e786] transition-colors text-2xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Title */}
        <div style={{ marginBottom: 'clamp(16px, 4vw, 24px)' }}>
          <h2 className="font-bold text-white text-center font-ria-sans" style={{ fontSize: 'clamp(20px, 5vw, 24px)', marginBottom: 'clamp(6px, 1.5vw, 8px)' }}>
            {isSignUp ? '회원가입' : '로그인'}
          </h2>
          <p className="text-center text-gray-400 [font-family:'Pretendard-Regular',Helvetica]" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
            {isSignUp
              ? '새 계정을 만들어 시작하세요'
              : '계정에 로그인하여 계속하세요'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 16px)' }}>
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block font-medium text-white [font-family:'Pretendard-Medium',Helvetica]" style={{ fontSize: 'clamp(12px, 3vw, 14px)', marginBottom: 'clamp(6px, 1.5vw, 8px)' }}>
                이름
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21e786] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
                style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px)', fontSize: 'clamp(13px, 3.25vw, 15px)' }}
                placeholder="홍길동"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block font-medium text-white [font-family:'Pretendard-Medium',Helvetica]" style={{ fontSize: 'clamp(12px, 3vw, 14px)', marginBottom: 'clamp(6px, 1.5vw, 8px)' }}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21e786] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
              style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px)', fontSize: 'clamp(13px, 3.25vw, 15px)' }}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-white [font-family:'Pretendard-Medium',Helvetica]" style={{ fontSize: 'clamp(12px, 3vw, 14px)', marginBottom: 'clamp(6px, 1.5vw, 8px)' }}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21e786] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
              style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px)', fontSize: 'clamp(13px, 3.25vw, 15px)' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg" style={{ padding: 'clamp(10px, 2.5vw, 12px)' }}>
              <p className="text-red-500 [font-family:'Pretendard-Regular',Helvetica]" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#21e786] hover:bg-[#1bc876] text-black font-semibold rounded-full [font-family:'Pretendard-SemiBold',Helvetica] transition-colors"
            style={{ padding: 'clamp(10px, 2.5vw, 12px)', fontSize: 'clamp(14px, 3.5vw, 16px)' }}
          >
            {loading ? '처리중...' : isSignUp ? '회원가입' : '로그인'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                // 탭 전환 시 입력 필드 초기화
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-[#21e786] hover:text-[#1bc876] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
              style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}
            >
              {isSignUp
                ? '이미 계정이 있으신가요? 로그인'
                : '계정이 없으신가요? 회원가입'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};