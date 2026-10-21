import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Sparkles, Dumbbell } from 'lucide-react';
import { LandingConfig } from '../data/landingData';
import { KakaoShareButton } from './KakaoShareButton';
import { ShareResult } from '../utils/kakaoShare';

interface CtaSectionProps {
  config: LandingConfig;
  onShareToast: (result: ShareResult) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ config, onShareToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const landingUrl =
      config.landingUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    navigator.clipboard.writeText(landingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-[36px] bg-gradient-to-b from-neutral-900/90 via-[#0C1420]/95 to-neutral-950 border border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden">
          {/* Decorative Corner Glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />

          {/* Small Icon Badge */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
            <Dumbbell className="w-7 h-7" />
          </div>

          {/* Big Title */}
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance mb-5">
            당신의 다음 운동, 헬스메이트와 함께하세요.
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            복잡한 운동 관리에서 벗어나 더 스마트하고 편리한 운동 생활을 시작해 보세요.
          </p>

          {/* Large CTA & Kakao Share Button Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Launch Button */}
            <a
              href={config.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-5 text-lg font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.45)] hover:shadow-[0_0_55px_rgba(16,185,129,0.65)] transition-all cursor-pointer whitespace-nowrap group"
            >
              <span>{config.ctaText}</span>
              <ExternalLink className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Kakao Share Button next to Launch Button */}
            <KakaoShareButton
              variant="cta"
              config={config}
              onShowToast={onShareToast}
            />

            {/* Quick URL Copy */}
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-5 text-base font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-2xl transition-all cursor-pointer whitespace-nowrap"
              title="랜딩페이지 주소 복사"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">주소 복사됨!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>주소 복사</span>
                </>
              )}
            </button>
          </div>

          {/* Sub Trust info */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              100% 무료 웹앱
            </span>
            <span>·</span>
            <span>별도 앱스토어 설치 불필요</span>
            <span>·</span>
            <span>모든 모바일 및 PC 브라우저 지원</span>
          </div>
        </div>
      </div>
    </section>
  );
};
