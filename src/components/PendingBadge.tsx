import React from 'react';
import eyeIcon from '../icons/👀.png';

interface PendingBadgeProps {
  width?: number;
  className?: string;
}

export const PendingBadge: React.FC<PendingBadgeProps> = ({
  width = 184,
  className = ''
}) => {
  const height = 44;
  const scale = width / 184;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height * scale}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className={className}
    >
      <svg
        width={width}
        height={height * scale}
        viewBox="0 0 184 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* 배경 둥근 사각형 (투명 배경, 보더만) */}
        <rect
          x="1.5"
          y="1.5"
          width="181"
          height="41"
          rx="20.5"
          fill="none"
          stroke="#116039"
          strokeWidth="3"
        />
      </svg>

      {/* 중앙 정렬을 위한 컨텐츠 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* 눈 아이콘 이미지 */}
        <img
          src={eyeIcon.src}
          alt="eye"
          style={{
            width: `${20.8 * scale}px`,
            height: `${20.8 * scale}px`,
            objectFit: 'contain'
          }}
        />

        {/* 텍스트 */}
        <span style={{
          color: 'white',
          fontSize: `${20 * scale}px`,
          fontWeight: 600,
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
          whiteSpace: 'nowrap'
        }}>
          일정 확인 필요
        </span>
      </div>
    </div>
  );
};
