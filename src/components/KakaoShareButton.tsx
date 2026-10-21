import React, { useState } from 'react';
import { LandingConfig } from '../data/landingData';
import { executeKakaoShare, ShareResult } from '../utils/kakaoShare';

interface KakaoShareButtonProps {
  variant?: 'header' | 'hero' | 'cta' | 'mobile-bar';
  config: LandingConfig;
  onShowToast: (result: ShareResult) => void;
  className?: string;
}

export const KakaoIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} fill-[#191919] shrink-0`}
    aria-hidden="true"
  >
    <path d="M12 3C6.477 3 2 6.582 2 11c0 2.855 1.874 5.38 4.72 6.78-.207.78-.748 2.812-.857 3.253-.134.542.197.534.415.39.172-.114 2.73-1.857 3.83-2.607.608.087 1.239.134 1.892.134 5.523 0 10-3.582 10-8S17.523 3 12 3z" />
  </svg>
);

export const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({
  variant = 'hero',
  config,
  onShowToast,
  className = '',
}) => {
  const [loading, setLoading] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const result = await executeKakaoShare(
        {
          title: config.shareCardTitle,
          description: config.shareCardDescription,
          buttonText: config.shareCardButtonText,
          landingUrl: config.landingUrl,
          appUrl: config.appUrl,
        },
        config.kakaoJsKey
      );

      onShowToast(result);
    } catch (err) {
      console.error('Share action error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'header') {
    return (
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#191919] bg-[#FEE500] hover:bg-[#FDD800] active:scale-95 rounded-xl transition-all shadow-[0_2px_8px_rgba(254,229,0,0.25)] hover:shadow-[0_4px_12px_rgba(254,229,0,0.4)] whitespace-nowrap shrink-0 cursor-pointer ${className}`}
        title="카카오톡으로 공유하기"
      >
        <KakaoIcon className="w-3.5 h-3.5" />
        <span className="hidden xl:inline">카카오톡으로 공유하기</span>
        <span className="xl:hidden">카카오 공유</span>
      </button>
    );
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={handleShare}
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#191919] bg-[#FEE500] hover:bg-[#FDD800] active:scale-98 rounded-xl shadow-[0_4px_15px_rgba(254,229,0,0.3)] hover:shadow-[0_6px_20px_rgba(254,229,0,0.45)] transition-all whitespace-nowrap cursor-pointer group ${className}`}
      >
        <KakaoIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>카카오톡으로 공유하기</span>
      </button>
    );
  }

  if (variant === 'cta') {
    return (
      <button
        onClick={handleShare}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-5 text-base font-bold text-[#191919] bg-[#FEE500] hover:bg-[#FDD800] active:scale-95 rounded-2xl shadow-[0_4px_25px_rgba(254,229,0,0.35)] hover:shadow-[0_6px_30px_rgba(254,229,0,0.55)] transition-all cursor-pointer whitespace-nowrap group ${className}`}
      >
        <KakaoIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>카카오톡으로 공유하기</span>
      </button>
    );
  }

  // Default / fallback
  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#191919] bg-[#FEE500] hover:bg-[#FDD800] active:scale-95 rounded-xl transition-all cursor-pointer whitespace-nowrap ${className}`}
    >
      <KakaoIcon className="w-4 h-4" />
      <span>카카오톡으로 공유하기</span>
    </button>
  );
};
