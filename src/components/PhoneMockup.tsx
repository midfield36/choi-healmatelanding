import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Dumbbell,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Apple,
  MapPin,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface PhoneMockupProps {
  screenType: 'routine' | 'workoutLog' | 'dietAi';
  customImage?: string;
  isInteractive?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  screenType,
  customImage,
  isInteractive = true,
}) => {
  // Timer state for workout log screen
  const [secondsLeft, setSecondsLeft] = useState(74);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Active tab inside interactive phone
  const [phoneTab, setPhoneTab] = useState<'routine' | 'workoutLog' | 'dietAi'>(
    screenType
  );

  useEffect(() => {
    setPhoneTab(screenType);
  }, [screenType]);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 90));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px] md:w-[340px] aspect-[9/18.5] bg-neutral-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.12)] border-[6px] border-neutral-800 ring-1 ring-white/10 select-none">
      {/* Dynamic Island / Speaker notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-700/50" />
        <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
      </div>

      {/* Screen Inner Container */}
      <div className="relative w-full h-full bg-[#090D16] rounded-[34px] overflow-hidden flex flex-col text-neutral-100 font-sans border border-neutral-800/80">
        {/* Status bar */}
        <div className="pt-2 px-6 pb-2 flex justify-between items-center text-[11px] font-medium text-neutral-400 z-20">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span>5G</span>
            <div className="w-4 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* If user provided a custom uploaded image */}
        {customImage ? (
          <div className="flex-1 relative overflow-hidden bg-neutral-900">
            <img
              src={customImage}
              alt="HealthMate Screen"
              className="w-full h-full object-cover"
              onError={(e) => {
                // If custom image fails, reset to interactive preview
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ) : (
          /* High-Fidelity Verified Screen Content */
          <div className="flex-1 overflow-y-auto px-3.5 pt-1 pb-3 text-left">
            {phoneTab === 'routine' && (
              <div className="space-y-3">
                {/* Header Profile Greeting */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <span>초급자 레벨</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-emerald-400 font-medium">연속 5일 출석</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">반갑습니다! 최윤석님</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-400">
                    YS
                  </div>
                </div>

                {/* Banner: Routine Recommendation */}
                <div className="p-3 bg-gradient-to-br from-neutral-900 to-neutral-900/90 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-medium mb-1">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI 오늘의 추천 프로그램
                    </span>
                    <span className="text-neutral-400">45분 코스</span>
                  </div>
                  <h5 className="text-xs font-bold text-white">가슴 & 삼두 머신 기초 정복</h5>
                  <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                    안전한 궤적의 머신 위주로 대흉근에 올바른 자극 전달
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-neutral-800/80">
                    <div className="flex items-center gap-2 text-[10px] text-neutral-300">
                      <span className="text-neutral-400">4개 종목</span>
                      <span className="text-neutral-600">·</span>
                      <span>16 세트</span>
                    </div>
                    <div className="px-2 py-1 bg-emerald-500 text-neutral-950 font-bold text-[10px] rounded-lg flex items-center gap-1">
                      <span>운동 시작</span>
                      <ChevronRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>

                {/* Exercise List Preview */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-neutral-400 flex items-center justify-between px-1">
                    <span>오늘 진행할 운동</span>
                    <span className="text-[10px] text-emerald-400">루틴 변경</span>
                  </div>

                  {[
                    { name: '시티드 체스트 프레스 머신', part: '가슴 중부', sets: '4세트 · 12-15회', weight: '45kg' },
                    { name: '인클라인 덤벨 프레스', part: '가슴 상부', sets: '4세트 · 12회', weight: '16kg' },
                    { name: '펙덱 플라이 머신', part: '대흉근 모음', sets: '3세트 · 15회', weight: '35kg' },
                    { name: '케이블 푸시다운', part: '삼두 후면', sets: '4세트 · 15회', weight: '25kg' },
                  ].map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-neutral-900/70 border border-neutral-800/80 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-[11px] font-medium text-white">{ex.name}</div>
                          <div className="text-[9px] text-neutral-400">
                            {ex.part} · {ex.sets}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-emerald-400 tabular-nums">
                          {ex.weight}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick AI Coaching Tip */}
                <div className="p-2.5 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[10px] text-neutral-300 leading-tight">
                    <span className="font-semibold text-white">AI 코치 팁: </span>
                    체스트 프레스 시 손목이 꺾이지 않도록 손바닥 아래 도톰한 지지면(척골)에 바를 얹으세요.
                  </div>
                </div>
              </div>
            )}

            {phoneTab === 'workoutLog' && (
              <div className="space-y-3">
                {/* Active Workout Session Header */}
                <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-bold text-white">체스트 프레스 진행 중</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 tabular-nums font-bold">24:18</span>
                </div>

                {/* Rest Timer Widget */}
                <div className="p-3 bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/40 rounded-2xl text-center">
                  <div className="text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>세트 간 권장 휴식 시간</span>
                  </div>
                  <div className="text-2xl font-black font-mono tracking-wider text-emerald-400 my-1 tabular-nums">
                    {formatTimer(secondsLeft)}
                  </div>
                  <div className="flex justify-center gap-2 mt-1">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-2.5 py-0.5 bg-emerald-500 text-neutral-950 rounded-md text-[10px] font-bold cursor-pointer"
                    >
                      {isTimerRunning ? '일시정지' : '계속'}
                    </button>
                    <button
                      onClick={() => setSecondsLeft(90)}
                      className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded-md text-[10px] font-medium cursor-pointer"
                    >
                      +90초
                    </button>
                  </div>
                </div>

                {/* Set Log Table */}
                <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 overflow-hidden">
                  <div className="grid grid-cols-4 px-3 py-2 text-[10px] font-medium text-neutral-400 border-b border-neutral-800 text-center">
                    <span>세트</span>
                    <span>중량(kg)</span>
                    <span>횟수(Reps)</span>
                    <span>완료</span>
                  </div>
                  {[
                    { set: 1, kg: 40, reps: 12, done: true },
                    { set: 2, kg: 45, reps: 10, done: true },
                    { set: 3, kg: 50, reps: 8, done: true },
                    { set: 4, kg: 50, reps: 8, done: false },
                  ].map((row) => (
                    <div
                      key={row.set}
                      className={`grid grid-cols-4 px-3 py-2 text-[11px] items-center text-center tabular-nums border-b border-neutral-800/50 last:border-b-0 ${
                        row.done ? 'text-white' : 'text-neutral-400 bg-neutral-800/20'
                      }`}
                    >
                      <span className="font-semibold text-neutral-300">{row.set}</span>
                      <span>{row.kg} kg</span>
                      <span>{row.reps} 회</span>
                      <div className="flex justify-center">
                        {row.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-neutral-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Weekly Growth Mini Graph */}
                <div className="p-2.5 bg-neutral-900/80 rounded-xl border border-neutral-800">
                  <div className="flex items-center justify-between text-[10px] mb-2">
                    <span className="font-medium text-neutral-300 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" /> 최고 중량 발전선 (1RM)
                    </span>
                    <span className="text-emerald-400 font-bold">+10kg 성장</span>
                  </div>
                  {/* Visual Bar Graph */}
                  <div className="h-10 flex items-end gap-1.5 px-1">
                    {[
                      { week: '1주', h: '35%' },
                      { week: '2주', h: '45%' },
                      { week: '3주', h: '60%' },
                      { week: '4주', h: '75%' },
                      { week: '이번주', h: '95%' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: bar.h }}
                          className={`w-full rounded-t-sm ${
                            i === 4 ? 'bg-emerald-400' : 'bg-neutral-700'
                          }`}
                        />
                        <span className="text-[8px] text-neutral-400">{bar.week}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {phoneTab === 'dietAi' && (
              <div className="space-y-3">
                {/* AI Chat snippet */}
                <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Gemini 맞춤 코치 상담
                  </div>
                  <div className="p-2 bg-neutral-800/80 rounded-xl text-[10px] text-neutral-300">
                    <span className="text-neutral-400">Q: </span>
                    벤치프레스 시 오른쪽 손목이 꺾여서 찌릿합니다.
                  </div>
                  <div className="p-2 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-100 leading-relaxed">
                    <span className="font-bold text-emerald-400">AI: </span>
                    손바닥 아래 도톰한 지지면(척골 라인)에 바벨을 얹는 불독 그립을 적용하면 손목 꺾임이 해소됩니다.
                  </div>
                </div>

                {/* Vision Diet Analysis Card */}
                <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white flex items-center gap-1">
                      <Apple className="w-3 h-3 text-emerald-400" /> 식단 사진 비전 분석
                    </span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      자동 인식됨
                    </span>
                  </div>

                  <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-emerald-400 text-xs font-bold">
                      🥗
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white">닭가슴살 아보카도 샐러드</div>
                      <div className="text-[10px] text-emerald-400 font-mono font-semibold tabular-nums">
                        485 kcal
                      </div>
                    </div>
                  </div>

                  {/* Nutrients Macro Breakdown */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <div className="p-1.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                      <span className="text-neutral-400 text-[9px]">탄수화물</span>
                      <div className="font-bold text-white tabular-nums">24g</div>
                    </div>
                    <div className="p-1.5 bg-neutral-950 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-400 text-[9px] font-semibold">단백질</span>
                      <div className="font-bold text-emerald-400 tabular-nums">42g</div>
                    </div>
                    <div className="p-1.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                      <span className="text-neutral-400 text-[9px]">지방</span>
                      <div className="font-bold text-white tabular-nums">16g</div>
                    </div>
                  </div>
                </div>

                {/* InBody Body Composition Widget */}
                <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between text-[10px]">
                  <div>
                    <span className="text-neutral-400">최근 체성분 변화</span>
                    <div className="text-white font-bold mt-0.5">골격근량 +1.2kg · 체지방 -2.4%</div>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[10px]">상세 보기 →</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Bottom Tab Bar */}
        {isInteractive && (
          <div className="h-12 bg-neutral-950/95 border-t border-neutral-800 px-3 flex items-center justify-around z-20">
            <button
              onClick={() => setPhoneTab('routine')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                phoneTab === 'routine' ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span className="text-[9px] font-medium">루틴</span>
            </button>
            <button
              onClick={() => setPhoneTab('workoutLog')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                phoneTab === 'workoutLog' ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[9px] font-medium">운동일지</span>
            </button>
            <button
              onClick={() => setPhoneTab('dietAi')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                phoneTab === 'dietAi' ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[9px] font-medium">AI & 식단</span>
            </button>
          </div>
        )}

        {/* Home indicator bar */}
        <div className="py-1 flex justify-center bg-neutral-950">
          <div className="w-24 h-1 bg-neutral-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
