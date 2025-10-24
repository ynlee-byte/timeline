import React from 'react';

interface ConfirmedBadgeProps {
  width?: number;
  className?: string;
}

export const ConfirmedBadge: React.FC<ConfirmedBadgeProps> = ({
  width = 184,
  className = ''
}) => {
  const height = 44;
  const scale = width / 184;

  return (
    <svg
      width={width}
      height={height * scale}
      viewBox="0 0 184 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* 그라데이션 정의 */}
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#87E687', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#A5EA35', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* 배경 둥근 사각형 */}
      <rect
        x="0"
        y="0"
        width="184"
        height="44"
        rx="22"
        fill="url(#badgeGradient)"
      />

      {/* 중앙 정렬을 위한 그룹 */}
      <g transform="translate(92, 22)">
        {/* 체크 아이콘 네모 박스 (초록색) */}
        <rect
          x="-67"
          y="-10.4"
          width="20.8"
          height="20.8"
          rx="3.9"
          fill="#00B400"
        />

        {/* 체크마크 (흰색) */}
        <path
          d="M -62 0 L -58.5 3.25 L -51 -4"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 텍스트 */}
        <text
          x="16"
          y="6"
          textAnchor="middle"
          fill="#2E7351"
          fontSize="20"
          fontWeight="600"
          fontFamily="Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          일정 확인 완료
        </text>
      </g>
    </svg>
  );
};
