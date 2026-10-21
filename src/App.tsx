import React, { useState, useEffect } from 'react';
import {
  LandingConfig,
  defaultLandingConfig,
} from './data/landingData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ScreenshotsSection } from './components/ScreenshotsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CustomizeModal } from './components/CustomizeModal';
import { KakaoGuideModal } from './components/KakaoGuideModal';
import { KakaoShareButton, KakaoIcon } from './components/KakaoShareButton';
import { initKakaoSDK, ShareResult } from './utils/kakaoShare';
import { ExternalLink, Settings2, CheckCircle2, Info, Key, X } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<LandingConfig>(() => {
    try {
      const saved = localStorage.getItem('healthmate_landing_config');
      return saved ? JSON.parse(saved) : defaultLandingConfig;
    } catch {
      return defaultLandingConfig;
    }
  });

  const [customScreenshots, setCustomScreenshots] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('healthmate_screenshots');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isKakaoGuideOpen, setIsKakaoGuideOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    needKeyGuide?: boolean;
  }>({ show: false, message: '' });

  // Initialize Kakao SDK when key changes or on mount
  useEffect(() => {
    if (config.kakaoJsKey) {
      initKakaoSDK(config.kakaoJsKey);
    }
  }, [config.kakaoJsKey]);

  const showToast = (result: ShareResult) => {
    setToast({
      show: true,
      message: result.message,
      needKeyGuide: result.needKeyGuide,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleSaveConfig = (newConfig: LandingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('healthmate_landing_config', JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  };

  const handleSaveKakaoKey = (newKey: string, newLandingUrl: string) => {
    const updated = {
      ...config,
      kakaoJsKey: newKey,
      landingUrl: newLandingUrl,
    };
    handleSaveConfig(updated);
    if (newKey) {
      initKakaoSDK(newKey);
    }
  };

  const handleUploadScreenshot = (screenId: string, base64Url: string) => {
    setCustomScreenshots((prev) => {
      const updated = { ...prev, [screenId]: base64Url };
      try {
        localStorage.setItem('healthmate_screenshots', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to store screenshot in localStorage', e);
      }
      return updated;
    });
  };

  const handleResetScreenshots = () => {
    setCustomScreenshots({});
    try {
      localStorage.removeItem('healthmate_screenshots');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleResetAll = () => {
    setConfig(defaultLandingConfig);
    setCustomScreenshots({});
    try {
      localStorage.removeItem('healthmate_landing_config');
      localStorage.removeItem('healthmate_screenshots');
    } catch (e) {
      console.warn(e);
    }
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400 relative">
      {/* Global Header */}
      <Header
        config={config}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onShareToast={showToast}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection
          config={config}
          onShareToast={showToast}
        />

        {/* Section 2: Before & After */}
        <BeforeAfterSection />

        {/* Section 3: Core Features */}
        <FeaturesSection />

        {/* Section 4: Real App Screenshots / Interactive Preview */}
        <ScreenshotsSection
          customScreenshots={customScreenshots}
          onUploadScreenshot={handleUploadScreenshot}
          onResetScreenshots={handleResetScreenshots}
        />

        {/* Section 5: Target Audience */}
        <TargetAudienceSection />

        {/* Section 6: Final CTA */}
        <CtaSection
          config={config}
          onShareToast={showToast}
        />
      </main>

      {/* Section 7: Footer */}
      <Footer config={config} />

      {/* Mobile Bottom Fixed Bar (< 15% sticky cap compliance) */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-40 bg-[#070B14]/95 backdrop-blur-md border-t border-neutral-800/80 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold text-white tracking-tight">헬스메이트</span>
          <span className="text-[10px] text-emerald-400">무료 즉시 실행</span>
        </div>
        <div className="flex items-center gap-2">
          <KakaoShareButton
            variant="mobile-bar"
            config={config}
            onShowToast={showToast}
            className="!px-3 !py-1.5 !text-[11px]"
          />
          <a
            href={config.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-950 bg-emerald-400 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95"
          >
            <span>앱 실행</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>

      {/* Floating Settings & Kakao Key buttons on desktop */}
      <div className="fixed bottom-6 right-6 hidden sm:flex items-center gap-2 z-40">
        <button
          onClick={() => setIsKakaoGuideOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-bold text-xs shadow-xl transition-all cursor-pointer hover:scale-105"
          title="카카오 Developers 연동 및 JavaScript 키 안내"
        >
          <KakaoIcon className="w-3.5 h-3.5" />
          <span>카카오 키 설정</span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 shadow-xl backdrop-blur-md transition-all text-xs font-medium cursor-pointer hover:scale-105"
          title="랜딩페이지 텍스트 & 스크린샷 커스텀 설정"
        >
          <Settings2 className="w-4 h-4 text-emerald-400" />
          <span>페이지 설정</span>
        </button>
      </div>

      {/* Toast Notification Alert */}
      {toast.show && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="p-4 bg-neutral-900/95 border border-emerald-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-between gap-3 text-xs text-white">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toast.message}</span>
            </div>

            {toast.needKeyGuide && (
              <button
                onClick={() => {
                  setToast({ show: false, message: '' });
                  setIsKakaoGuideOpen(true);
                }}
                className="px-2.5 py-1 bg-[#FEE500] text-[#191919] font-bold rounded-lg hover:bg-[#FDD800] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Key className="w-3 h-3" />
                <span>키 설정 안내</span>
              </button>
            )}

            <button
              onClick={() => setToast({ show: false, message: '' })}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Kakao Developer Key Guide Modal */}
      <KakaoGuideModal
        isOpen={isKakaoGuideOpen}
        onClose={() => setIsKakaoGuideOpen(false)}
        config={config}
        onSaveKey={handleSaveKakaoKey}
      />

      {/* Customization & Upload Modal */}
      <CustomizeModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        customScreenshots={customScreenshots}
        onUploadScreenshot={handleUploadScreenshot}
        onResetScreenshots={handleResetScreenshots}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
