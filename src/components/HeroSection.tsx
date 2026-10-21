import React from 'react';
import { ExternalLink, ArrowDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { LandingConfig } from '../data/landingData';
import { PhoneMockup } from './PhoneMockup';
import { KakaoShareButton } from './KakaoShareButton';
import { ShareResult } from '../utils/kakaoShare';

interface HeroSectionProps {
  config: LandingConfig;
  onShareToast: (result: ShareResult) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onShareToast }) => {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#features');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            {/* Unboxed Editorial Kicker (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 tracking-wide">
              <span>스마트 피트니스 솔루션</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Gemini AI 연동</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>최윤석 제작</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              {config.heroHeadline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {config.heroSubheadline}
            </p>

            {/* Highlighted Slogan */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-sm sm:text-base text-neutral-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">
                {config.heroHighlight}
              </span>
            </div>

            {/* Action Buttons & Kakao Share */}
            <div className="space-y-3.5 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Primary CTA (Links to live app) */}
                <a
                  href={config.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 rounded-xl shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] transition-all whitespace-nowrap cursor-pointer group"
                >
                  <span>지금 헬스메이트 시작하기</span>
                  <ExternalLink className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Secondary CTA (Scrolls to features) */}
                <button
                  onClick={scrollToFeatures}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-all whitespace-nowrap cursor-pointer hover:border-neutral-600"
                >
                  <span>주요 기능 살펴보기</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Kakao Share button below "지금 헬스메이트 시작하기" */}
              <div className="pt-1 flex items-center">
                <KakaoShareButton
                  variant="hero"
                  config={config}
                  onShowToast={onShareToast}
                />
              </div>
            </div>

            {/* Credibility Trust Signals */}
            <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>무료 웹앱 서비스</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>설치 없이 즉시 실행</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>모바일·태블릿·PC 지원</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Smartphone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Backlight for Phone */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center">
              <PhoneMockup screenType="routine" isInteractive={true} />

              <div className="mt-4 text-center">
                <p className="text-xs text-neutral-400 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>실제 헬스메이트 화면 시뮬레이션 (하단 탭을 터치해 보세요)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
