import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { beforeItems, afterItems } from '../data/landingData';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section id="before-after" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2">
            BEFORE & AFTER
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            운동 관리, 아직도 어렵게 하고 계신가요?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            기존의 번거롭고 막막했던 운동 방식을 AI 기반 헬스메이트가 어떻게 혁신하는지 비교해 보세요.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left: Before Card (Muted, neutral-900 surface) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  기존의 운동 방식
                </span>
                <span className="text-xs text-rose-400/90 font-medium">관리의 어려움</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-200 mt-5 mb-6">
                헬스메이트를 사용하기 전
              </h3>

              <ul className="space-y-4">
                {beforeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5 text-rose-400">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base text-neutral-300 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-800/80 text-xs text-neutral-400 flex items-center justify-between">
              <span>흩어진 메모 앱과 주먹구구식 운동</span>
              <span className="text-rose-400/80">정체기 지속</span>
            </div>
          </div>

          {/* Right: After Card (Highlighted Emerald Surface) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#0B1713] border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.08)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-5 border-b border-neutral-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  스마트 피트니스 솔루션
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span>변화 체감</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mt-5 mb-6 flex items-center gap-2">
                <span>헬스메이트와 함께라면</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </h3>

              <ul className="space-y-4">
                {afterItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base text-white font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-emerald-500/20 text-xs text-neutral-300 flex items-center justify-between">
              <span className="text-emerald-300 font-medium">AI 맞춤 루틴과 체계적인 세트 기록</span>
              <span className="text-emerald-400 font-bold">지속 가능한 성장</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
