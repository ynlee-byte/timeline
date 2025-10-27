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
        className="relative bg-[#1a1a1a] border-2 border-[#21e786] rounded-2xl p-8 w-full max-w-md shadow-[0_0_30px_rgba(33,231,134,0.3)]"
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white text-center mb-2 font-ria-sans">
            {isSignUp ? '회원가입' : '로그인'}
          </h2>
          <p className="text-center text-gray-400 [font-family:'Pretendard-Regular',Helvetica] text-sm">
            {isSignUp
              ? '새 계정을 만들어 시작하세요'
              : '계정에 로그인하여 계속하세요'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2 [font-family:'Pretendard-Medium',Helvetica]">
                이름
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21e786] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
                placeholder="홍길동"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2 [font-family:'Pretendard-Medium',Helvetica]">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21e786] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2 [font-family:'Pretendard-Medium',Helvetica]">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21e786] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-sm text-red-500 [font-family:'Pretendard-Regular',Helvetica]">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#21e786] hover:bg-[#1bc876] text-black font-semibold py-3 rounded-full [font-family:'Pretendard-SemiBold',Helvetica] transition-colors"
          >
            {loading ? '처리중...' : isSignUp ? '회원가입' : '로그인'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-sm text-[#21e786] hover:text-[#1bc876] transition-colors [font-family:'Pretendard-Regular',Helvetica]"
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