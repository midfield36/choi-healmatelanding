import React, { useState } from 'react';
import {
  Sparkles,
  ClipboardList,
  Target,
  Clock,
  Dumbbell,
  CheckCircle,
  Apple,
  MapPin,
  Flame,
  TrendingUp,
} from 'lucide-react';
import { mainFeatures } from '../data/landingData';

export const FeaturesSection: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#090E1A]/50 border-y border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2">
            CORE CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            운동에 필요한 기능을 하나의 앱에
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            실제 구현된 헬스메이트의 핵심 기능을 통해 초보자부터 상급자까지 스마트한 헬스 라이프를 누리세요.
          </p>
        </div>

        {/* Feature Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature 1: AI 맞춤 운동 가이드 */}
          <div className="p-7 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="text-xs font-semibold text-emerald-400 mb-1">기능 01 · AI 코칭</div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                AI 맞춤 운동 가이드
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                나의 목표와 운동 수준에 맞춰 운동 방향을 찾도록 도와주는 스마트 가이드
              </p>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3 mb-6">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-neutral-800">
                  <span className="text-emerald-400 font-semibold">Gemini AI 코칭 엔진</span>
                  <span>답변 즉시 생성</span>
                </div>
                <div className="p-2.5 bg-neutral-900 rounded-xl text-xs text-neutral-300">
                  <span className="text-neutral-500 font-medium">사용자: </span>
                  덤벨 숄더프레스 시 허리가 꺾입니다.
                </div>
                <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-xs text-emerald-200">
                  <span className="text-emerald-400 font-bold">코치: </span>
                  코어에 복압을 잡고 벤치 각도를 75~80도로 살짝 눕혀 수행해 보세요.
                </div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>수준별 3분할/4분할 맞춤 루틴 추천</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>손목·어깨 관절 부상 방지 팁 실시간 제공</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
              초보자 맞춤 머신 궤적 설명 제공
            </div>
          </div>

          {/* Feature 2: 운동 기록 및 통합 관리 */}
          <div className="p-7 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>

              <div className="text-xs font-semibold text-emerald-400 mb-1">기능 02 · 스마트 일지</div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                운동 기록 및 통합 관리
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                운동 계획과 기록을 체계적으로 정리하고 나의 운동 과정을 편리하게 관리
              </p>

              {/* UI Preview Box: Workout Session with Live Timer */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3 mb-6">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> 세트 간 휴식 카운트다운
                  </span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums">01:30</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center px-2.5 py-1.5 bg-neutral-900 rounded-lg">
                    <span className="text-neutral-400">1세트</span>
                    <span className="text-white font-medium">체스트 프레스 45kg · 12회</span>
                    <span className="text-emerald-400 font-bold">완료</span>
                  </div>
                  <div className="flex justify-between items-center px-2.5 py-1.5 bg-neutral-900 rounded-lg">
                    <span className="text-neutral-400">2세트</span>
                    <span className="text-white font-medium">체스트 프레스 50kg · 10회</span>
                    <span className="text-emerald-400 font-bold">완료</span>
                  </div>
                </div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>세트별 무게·횟수·휴식시간 원터치 기록</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>종목별 최고 중량(1RM) 및 총 볼륨 그래프</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
              주간 출석률 및 총 볼륨 자동 산출
            </div>
          </div>

          {/* Feature 3: 운동 목표 및 성장 관리 */}
          <div className="p-7 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>

              <div className="text-xs font-semibold text-emerald-400 mb-1">기능 03 · 성장 & 식단</div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                운동 목표 및 성장 관리
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                운동 목표를 설정하고 꾸준한 성장을 위한 동기를 제공하는 관리 기능
              </p>

              {/* UI Preview Box: Diet + InBody */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3 mb-6">
                <div className="flex items-center justify-between text-[11px] pb-2 border-b border-neutral-800">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Apple className="w-3.5 h-3.5 text-emerald-400" /> AI 식단 비전 분석
                  </span>
                  <span className="text-emerald-400 text-[10px]">탄단지 자동계출</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="p-2 bg-neutral-900 rounded-lg">
                    <span className="text-[10px] text-neutral-400">탄수화물</span>
                    <div className="font-bold text-white mt-0.5 tabular-nums">28g</div>
                  </div>
                  <div className="p-2 bg-neutral-900 rounded-lg border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400">단백질</span>
                    <div className="font-bold text-emerald-400 mt-0.5 tabular-nums">45g</div>
                  </div>
                  <div className="p-2 bg-neutral-900 rounded-lg">
                    <span className="text-[10px] text-neutral-400">지방</span>
                    <div className="font-bold text-white mt-0.5 tabular-nums">14g</div>
                  </div>
                </div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>인바디 골격근량·체지방률 변화 추적</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>내 주변 헬스장 위치·일일권 검색 지원</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
              오운완 전국 챌린지 및 메이트 매칭
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
