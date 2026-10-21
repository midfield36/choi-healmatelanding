import React, { useState, useEffect } from 'react';
import { ExternalLink, Menu, X, Dumbbell } from 'lucide-react';
import { LandingConfig } from '../data/landingData';
import { KakaoShareButton } from './KakaoShareButton';
import { ShareResult } from '../utils/kakaoShare';

interface HeaderProps {
  config: LandingConfig;
  onOpenSettings: () => void;
  onShareToast: (result: ShareResult) => void;
}

export const Header: React.FC<HeaderProps> = ({ config, onOpenSettings, onShareToast }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '서비스 소개', href: '#hero' },
    { label: '비포 & 애프터', href: '#before-after' },
    { label: '주요 기능', href: '#features' },
    { label: '앱 미리보기', href: '#screenshots' },
    { label: '추천 대상', href: '#audience' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070B14]/90 backdrop-blur-md border-b border-neutral-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              HEALTHMATE
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop, single line, no pill badges) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Kakao Share + App Launch) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenSettings}
              className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1.5 transition-colors cursor-pointer"
              title="랜딩페이지 설정 및 스크린샷 교체"
            >
              설정
            </button>
            <KakaoShareButton
              variant="header"
              config={config}
              onShowToast={onShareToast}
            />
            <a
              href={config.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] whitespace-nowrap shrink-0"
            >
              <span>앱 실행하기</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Button & Quick Share */}
          <div className="flex items-center gap-2 sm:hidden">
            <KakaoShareButton
              variant="header"
              config={config}
              onShowToast={onShareToast}
            />
            <a
              href={config.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold text-neutral-950 bg-emerald-400 rounded-lg whitespace-nowrap"
            >
              앱 실행
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white cursor-pointer"
              aria-label="메뉴 토글"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D]/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-5 mt-3 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-neutral-200 hover:text-emerald-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="text-xs text-neutral-400 hover:text-neutral-200 py-1"
            >
              페이지 설정
            </button>
            <a
              href={config.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-neutral-950 bg-emerald-400 rounded-xl"
            >
              <span>헬스메이트 바로가기</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
