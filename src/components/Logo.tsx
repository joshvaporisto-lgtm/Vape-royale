import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  theme = 'light',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const titleSizes = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-base font-extrabold tracking-tight',
    lg: 'text-xl font-extrabold tracking-tight',
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
  }[size];

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Precision Emblem Box */}
      <div
        className={`relative ${sizeClasses} rounded-lg overflow-hidden shrink-0 border transition-transform duration-200 group-hover:scale-105 ${
          isDark
            ? 'bg-slate-900 border-slate-700/80 shadow-sm'
            : 'bg-slate-950 border-slate-800 shadow-sm'
        }`}
      >
        {!imgError ? (
          <img
            src="/vape_royale_logo.jpg"
            alt="Vape Royale Logo"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-Precision Scalable SVG Fallback Emblem */
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="w-full h-full p-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 8L13 11L16 6.5L19 11L22 8L21 12H11L10 8Z"
              fill="#E2E8F0"
            />
            <path
              d="M16 13L22 16.5V23.5L16 27.5L10 23.5V16.5L16 13Z"
              stroke="#E2E8F0"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M13 18L16 24L19 18"
              stroke="#E2E8F0"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Structured Wordmark Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-sans uppercase ${titleSizes} ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}
        >
          Vape Royale
        </span>
        {showSubtitle && (
          <span
            className={`font-sans uppercase font-semibold mt-0.5 ${subtitleSizes} ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Commercial Distribution
          </span>
        )}
      </div>
    </div>
  );
};
