import React, { useState } from 'react';
import { X, Key, ExternalLink, Check, Copy, Info } from 'lucide-react';
import { LandingConfig } from '../data/landingData';
import { KakaoIcon } from './KakaoShareButton';

interface KakaoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LandingConfig;
  onSaveKey: (newKey: string, newLandingUrl: string) => void;
}

export const KakaoGuideModal: React.FC<KakaoGuideModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveKey,
}) => {
  const [inputKey, setInputKey] = useState(config.kakaoJsKey || '');
  const [inputUrl, setInputUrl] = useState(
    config.landingUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  );
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const currentDomain =
    typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyDomain = () => {
    navigator.clipboard.writeText(currentDomain);
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputKey.trim(), inputUrl.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0C111E] border border-neutral-800 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FEE500] flex items-center justify-center">
              <KakaoIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                카카오톡 공유 JavaScript 키 설정 안내
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                카카오 Developers 공식 연동 가이드
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs text-neutral-300">
          {/* Status box */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">현재 카카오 SDK 연동 상태</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  config.kakaoJsKey
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {config.kakaoJsKey ? 'SDK 연동 완료' : '대체 공유 모드 동작 중'}
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              {config.kakaoJsKey
                ? '등록된 JavaScript 키로 카카오톡 공식 공유창이 실행됩니다.'
                : '키가 등록되지 않아도 모바일 기기 기본 공유(Web Share API) 및 PC 링크 복사 기능이 정상 작동합니다.'}
            </p>
          </div>

          {/* Step by step guide */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <Key className="w-4 h-4 text-[#FEE500]" />
              카카오 JavaScript 키 발급 5단계
            </h4>

            <ol className="space-y-3 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center shrink-0 font-bold text-[11px]">
                  1
                </span>
                <div>
                  <span className="font-semibold text-white">카카오 개발자 사이트 접속: </span>
                  <a
                    href="https://developers.kakao.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>developers.kakao.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  에 로그인합니다.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center shrink-0 font-bold text-[11px]">
                  2
                </span>
                <div>
                  <span className="font-semibold text-white">애플리케이션 추가: </span>
                  [내 애플리케이션] &gt; [애플리케이션 추가하기] (앱 이름: 헬스메이트)를 생성합니다.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center shrink-0 font-bold text-[11px]">
                  3
                </span>
                <div>
                  <span className="font-semibold text-white">Web 플랫폼 사이트 도메인 등록: </span>
                  [앱 설정] &gt; [플랫폼] &gt; [Web]에 현재 도메인을 등록합니다.
                  <div className="mt-1.5 flex items-center gap-2">
                    <code className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[11px] text-emerald-300">
                      {currentDomain || 'https://...'}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyDomain}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded cursor-pointer transition-colors"
                    >
                      {copiedDomain ? '복사됨!' : '도메인 복사'}
                    </button>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center shrink-0 font-bold text-[11px]">
                  4
                </span>
                <div>
                  <span className="font-semibold text-white">JavaScript 키 복사: </span>
                  [앱 설정] &gt; [앱 키]에서 <strong className="text-amber-300">JavaScript 키</strong>를 복사합니다.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center shrink-0 font-bold text-[11px]">
                  5
                </span>
                <div>
                  <span className="font-semibold text-white">아래 입력창에 키 입력: </span>
                  복사한 키를 입력하고 [저장하기]를 누르면 즉시 연동됩니다. (또는 `.env`의 `VITE_KAKAO_JAVASCRIPT_KEY`에 설정 가능)
                </div>
              </li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-3 pt-2 border-t border-neutral-800">
            <div>
              <label className="block text-xs font-semibold text-neutral-200 mb-1">
                카카오 JavaScript 키
              </label>
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="예: 32자리 카카오 JavaScript 키 입력"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-200 mb-1">
                공유 랜딩페이지 주소 (URL)
              </label>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
              />
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                카카오톡 카드의 [헬스메이트 알아보기] 버튼 클릭 시 연결될 주소입니다.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-neutral-950 bg-[#FEE500] hover:bg-[#FDD800] rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>저장 완료!</span>
                  </>
                ) : (
                  <span>키 저장 및 활성화</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
