import React, { useState } from 'react';
import { X, Save, RotateCcw, Upload, Check, Link2, Type, Image as ImageIcon } from 'lucide-react';
import { LandingConfig, defaultLandingConfig } from '../data/landingData';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LandingConfig;
  onSaveConfig: (newConfig: LandingConfig) => void;
  customScreenshots: Record<string, string>;
  onUploadScreenshot: (screenId: string, base64Url: string) => void;
  onResetScreenshots: () => void;
  onResetAll: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  customScreenshots,
  onUploadScreenshot,
  onResetScreenshots,
  onResetAll,
}) => {
  const [formData, setFormData] = useState<LandingConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'text' | 'screenshots' | 'kakao'>('text');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0C111E] border border-neutral-800 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">랜딩페이지 커스텀 설정</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              앱 주소, 주요 문구, 스크린샷 및 카카오톡 공유 설정을 변경할 수 있습니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/50">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'text'
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-neutral-900/80'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>문구/링크</span>
          </button>
          <button
            onClick={() => setActiveTab('screenshots')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'screenshots'
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-neutral-900/80'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>스크린샷</span>
          </button>
          <button
            onClick={() => setActiveTab('kakao')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'kakao'
                ? 'text-[#FEE500] border-b-2 border-[#FEE500] bg-neutral-900/80'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEE500]" />
            <span>카카오 공유</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-left text-sm">
          {activeTab === 'text' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-emerald-400" /> 실제 앱 연결 주소 (URL)
                </label>
                <input
                  type="url"
                  value={formData.appUrl}
                  onChange={(e) => setFormData({ ...formData, appUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  메인 헤드라인
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  보조 설명 문구
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubheadline}
                  onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  강조 슬로건
                </label>
                <input
                  type="text"
                  value={formData.heroHighlight}
                  onChange={(e) => setFormData({ ...formData, heroHighlight: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  CTA 대형 버튼 문구
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </form>
          ) : activeTab === 'screenshots' ? (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                실제 HealthMate 앱 화면을 스마트폰으로 캡처한 이미지 파일(PNG, JPG)을 업로드하시면 즉시 랜딩페이지 목업에 반영됩니다.
              </p>

              {[
                { id: 'screen-1', label: '1. 메인 홈 대시보드 화면' },
                { id: 'screen-2', label: '2. 운동일지 및 타이머 화면' },
                { id: 'screen-3', label: '3. AI 코치 및 비전 식단 화면' },
              ].map((slot) => {
                const img = customScreenshots[slot.id];
                return (
                  <div
                    key={slot.id}
                    className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden flex items-center justify-center">
                        {img ? (
                          <img src={img} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-neutral-500">기본UI</span>
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{slot.label}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          {img ? '사용자 정의 이미지 등록됨' : '기본 시뮬레이터 동작 중'}
                        </div>
                      </div>
                    </div>

                    <label className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-medium rounded-xl cursor-pointer transition-colors flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{img ? '변경' : '파일 선택'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(slot.id, e)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FEE500]" />
                  카카오 Developers 연동 가이드
                </span>
                <p className="text-neutral-400">
                  <a
                    href="https://developers.kakao.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 underline font-mono"
                  >
                    developers.kakao.com
                  </a>
                  에서 발급받은 <strong>JavaScript 키</strong>를 입력하면 카카오톡 공식 친구/채팅방 공유창이 실행됩니다.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1">
                  카카오 JavaScript 키
                </label>
                <input
                  type="text"
                  value={formData.kakaoJsKey || ''}
                  onChange={(e) => setFormData({ ...formData, kakaoJsKey: e.target.value })}
                  placeholder="예: 32자리 카카오 JavaScript Key"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  키가 없거나 개발 중일 때는 모바일 Web Share API 및 PC 클립보드 복사 모드로 안전하게 자동 전환됩니다.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1">
                  랜딩페이지 배포 주소 (Landing URL)
                </label>
                <input
                  type="url"
                  value={formData.landingUrl || ''}
                  onChange={(e) => setFormData({ ...formData, landingUrl: e.target.value })}
                  placeholder="https://... (비워둘 시 현재 접속 주소 자동 사용)"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  카카오톡 공유 카드 클릭 시 방문자가 이동할 랜딩페이지 배포 URL입니다. (실제 앱 주소와 별도 관리)
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1">
                  공유 카드 제목
                </label>
                <input
                  type="text"
                  value={formData.shareCardTitle || '헬스메이트 | AI 스마트 운동 관리'}
                  onChange={(e) => setFormData({ ...formData, shareCardTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1">
                  공유 카드 설명
                </label>
                <textarea
                  rows={2}
                  value={formData.shareCardDescription || '운동의 시작부터 성장까지! 초보자부터 숙련자까지 모두를 위한 나만의 AI 헬스 파트너.'}
                  onChange={(e) => setFormData({ ...formData, shareCardDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1">
                  공유 카드 버튼 문구
                </label>
                <input
                  type="text"
                  value={formData.shareCardButtonText || '헬스메이트 알아보기'}
                  onChange={(e) => setFormData({ ...formData, shareCardButtonText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="p-5 border-t border-neutral-800 flex items-center justify-between bg-neutral-950">
          <button
            onClick={onResetAll}
            className="px-3 py-2 text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>전체 초기화</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>저장 완료!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>설정 저장하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
