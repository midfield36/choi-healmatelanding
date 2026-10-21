import React from 'react';
import { Dumbbell, ExternalLink, ArrowUp } from 'lucide-react';
import { LandingConfig } from '../data/landingData';

interface FooterProps {
  config: LandingConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-[#050810] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-neutral-800/80">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                HEALTHMATE
              </span>
            </div>
            <p className="text-sm text-neutral-400">
              {config.brandTagline}
            </p>
          </div>

          {/* Quick Actions & Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-300">
            <a
              href="#hero"
              className="hover:text-emerald-400 transition-colors"
            >
              서비스 소개
            </a>
            <a
              href="#features"
              className="hover:text-emerald-400 transition-colors"
            >
              주요 기능
            </a>
            <a
              href="#screenshots"
              className="hover:text-emerald-400 transition-colors"
            >
              화면 미리보기
            </a>
            <a
              href={config.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
            >
              <span>실제 앱 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="맨 위로 이동"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center sm:text-left">
          <div>
            <span>Developed by </span>
            <span className="font-semibold text-neutral-200">{config.developerName}</span>
            <span className="mx-2">·</span>
            <span>AI 맞춤 헬스 코치 & 통합 운동 관리 MVP</span>
          </div>

          <div>
            <span>© 2026 HealthMate. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
