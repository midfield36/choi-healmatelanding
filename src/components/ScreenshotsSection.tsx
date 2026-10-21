import React, { useState } from 'react';
import {
  Upload,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { screenshotSlides } from '../data/landingData';
import { PhoneMockup } from './PhoneMockup';

interface ScreenshotsSectionProps {
  customScreenshots: Record<string, string>;
  onUploadScreenshot: (screenId: string, base64Url: string) => void;
  onResetScreenshots: () => void;
}

export const ScreenshotsSection: React.FC<ScreenshotsSectionProps> = ({
  customScreenshots,
  onUploadScreenshot,
  onResetScreenshots,
}) => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [zoomedScreenId, setZoomedScreenId] = useState<string | null>(null);

  const screenTypeMap: Record<string, 'routine' | 'workoutLog' | 'dietAi'> = {
    'screen-1': 'routine',
    'screen-2': 'workoutLog',
    'screen-3': 'dietAi',
  };

  const handleFileChange = (screenId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadScreenshot(screenId, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const hasCustomImages = Object.keys(customScreenshots).length > 0;

  return (
    <section id="screenshots" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2">
            APP INTERFACE PREVIEW
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            헬스메이트, 직접 확인해 보세요.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            실제 앱 구조를 정밀하게 재현한 인터랙티브 프리뷰입니다. 보유하신 실제 캡처 이미지가 있다면 언제든 업로드하여 교체할 수 있습니다.
          </p>

          {/* Action Row: Screenshot management */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>실제 스크린샷 등록/교체</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange('screen-1', e)}
              />
            </label>

            {hasCustomImages && (
              <button
                onClick={onResetScreenshots}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-900/50 border border-neutral-800 rounded-xl cursor-pointer transition-colors"
                title="기본 시뮬레이션 UI로 되돌리기"
              >
                <RotateCcw className="w-3 h-3" />
                <span>기본값 복원</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile View: Carousel Controls */}
        <div className="flex lg:hidden items-center justify-between mb-4 px-2">
          <span className="text-xs text-neutral-400 font-medium">
            {activeMobileIndex + 1} / {screenshotSlides.length} · {screenshotSlides[activeMobileIndex].title}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : screenshotSlides.length - 1))}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800 cursor-pointer"
              aria-label="이전 화면"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveMobileIndex((prev) => (prev < screenshotSlides.length - 1 ? prev + 1 : 0))}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800 cursor-pointer"
              aria-label="다음 화면"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop 3-Card Grid & Mobile Selected Item */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {screenshotSlides.map((slide, idx) => {
            const isVisibleOnMobile = idx === activeMobileIndex;
            const customImg = customScreenshots[slide.id];
            const screenType = screenTypeMap[slide.id];

            return (
              <div
                key={slide.id}
                className={`flex flex-col items-center ${
                  isVisibleOnMobile ? 'block' : 'hidden lg:flex'
                } group`}
              >
                {/* Smartphone Device Frame */}
                <div className="relative w-full flex justify-center">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <PhoneMockup
                      screenType={screenType}
                      customImage={customImg}
                      isInteractive={false}
                    />
                  </div>

                  {/* Zoom button on hover */}
                  <button
                    onClick={() => setZoomedScreenId(slide.id)}
                    className="absolute top-4 right-8 p-2 rounded-xl bg-neutral-900/90 text-neutral-300 border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white cursor-pointer shadow-lg z-30"
                    title="화면 확대 보기"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption Card below phone */}
                <div className="mt-6 text-center max-w-sm px-4">
                  <div className="text-xs font-semibold text-emerald-400 mb-1">
                    {slide.category}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1.5">{slide.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Slot-specific file upload trigger */}
                  <label className="inline-block mt-3 text-[11px] text-neutral-500 hover:text-emerald-400 transition-colors cursor-pointer">
                    <span>이 화면에 스크린샷 교체</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(slide.id, e)}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Zoom Modal */}
        {zoomedScreenId && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setZoomedScreenId(null)}
          >
            <div
              className="relative max-w-md w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedScreenId(null)}
                className="absolute -top-12 right-0 p-2 text-neutral-400 hover:text-white cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-6 h-6" />
              </button>

              <PhoneMockup
                screenType={screenTypeMap[zoomedScreenId]}
                customImage={customScreenshots[zoomedScreenId]}
                isInteractive={true}
              />
              <p className="mt-4 text-xs text-neutral-400">
                실제 앱 인터랙션을 클릭으로 테스트해보실 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
