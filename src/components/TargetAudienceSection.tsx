import React from 'react';
import { Dumbbell, Activity, Award, CheckCircle2 } from 'lucide-react';
import { audienceItems } from '../data/landingData';

export const TargetAudienceSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    beginner: <Dumbbell className="w-6 h-6" />,
    intermediate: <Activity className="w-6 h-6" />,
    advanced: <Award className="w-6 h-6" />,
  };

  return (
    <section id="audience" className="py-20 lg:py-28 bg-[#090E1A]/40 border-t border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2">
            TARGET AUDIENCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            운동하는 모든 사람을 위한 헬스메이트
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            초보자부터 숙련된 운동인까지, 각자의 수준과 목표에 맞는 최적화된 서포트를 제공합니다.
          </p>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {audienceItems.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    {iconMap[item.id]}
                  </div>
                  <span className="text-xs font-semibold text-neutral-400">
                    {item.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Points */}
                <ul className="space-y-3 pt-4 border-t border-neutral-800/80">
                  {item.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation pill replacement (clean inline tag) */}
              <div className="mt-8 pt-4 border-t border-neutral-800/80 text-xs text-emerald-400 font-medium">
                {item.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
