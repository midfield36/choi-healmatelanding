export interface FeatureItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  details: string[];
  screenKey: 'routine' | 'workoutLog' | 'dietAi';
}

export interface AudienceItem {
  id: string;
  level: string;
  title: string;
  description: string;
  points: string[];
  recommendation: string;
}

export interface ScreenshotSlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  customImage?: string;
}

export interface LandingConfig {
  appName: string;
  brandTagline: string;
  appUrl: string;
  developerName: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroHighlight: string;
  ctaText: string;
  kakaoJsKey?: string;
  landingUrl?: string;
  shareCardTitle?: string;
  shareCardDescription?: string;
  shareCardButtonText?: string;
}

export const defaultLandingConfig: LandingConfig = {
  appName: '헬스메이트 (HealthMate)',
  brandTagline: 'AI와 함께하는 스마트 운동 관리',
  appUrl: 'https://choi-healthmate.vercel.app/',
  developerName: '최윤석',
  heroHeadline: '운동, 이제 AI와 함께 더 스마트하게.',
  heroSubheadline:
    '운동을 처음 시작하는 순간부터 목표를 달성하는 날까지. 헬스메이트와 함께 나에게 맞는 운동 습관을 만들어 보세요.',
  heroHighlight: '초보자부터 숙련자까지, 모두를 위한 스마트 헬스 파트너',
  ctaText: '헬스메이트 바로 실행하기',
  kakaoJsKey: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY || '',
  landingUrl: import.meta.env.VITE_LANDING_URL || '',
  shareCardTitle: '헬스메이트 | AI 스마트 운동 관리',
  shareCardDescription: '운동의 시작부터 성장까지! 초보자부터 숙련자까지 모두를 위한 나만의 AI 헬스 파트너.',
  shareCardButtonText: '헬스메이트 알아보기',
};

export const beforeItems = [
  '무엇부터 운동해야 할지 막막하다.',
  '내 운동을 체계적으로 관리하기 어렵다.',
  '운동 정보가 여러 곳에 흩어져 있다.',
  '꾸준한 운동 습관을 만들기 어렵다.',
];

export const afterItems = [
  '운동 목표와 방향을 쉽게 정리할 수 있다.',
  '운동 계획과 기록을 한곳에서 관리한다.',
  '필요한 운동 정보를 편리하게 확인한다.',
  '운동 과정을 지속적으로 점검하며 성장한다.',
];

export const mainFeatures: FeatureItem[] = [
  {
    id: 'ai-guide',
    badge: 'AI 코칭 & 맞춤 루틴',
    title: 'AI 맞춤 운동 가이드',
    description: '나의 목표와 운동 수준에 맞춰 운동 방향을 찾도록 도와주는 스마트 가이드',
    details: [
      'Gemini AI 기반 질문 해결 (불독 그립, 자세 교정, 손목 부담 완화 등)',
      '초급·중급·상급 수준별 추천 프로그램 (체스트 프레스, 덤벨, 삼두 루틴 등)',
      '사용자 피드백을 실시간 반영한 루틴 강도 자동 조절',
    ],
    screenKey: 'routine',
  },
  {
    id: 'workout-log',
    badge: '운동일지 & 타이머',
    title: '운동 기록 및 통합 관리',
    description: '운동 계획과 기록을 체계적으로 정리하고 나의 운동 과정을 편리하게 관리',
    details: [
      '종목별 세트, 중량(kg), 횟수(Reps) 간편 터치 기록',
      '세트 간 필수 휴식 시간 타이머 자동 카운트다운',
      '주간 총 볼륨, 완료 세트 수, 최고 중량(1RM) 성장 그래프 시각화',
    ],
    screenKey: 'workoutLog',
  },
  {
    id: 'vision-body',
    badge: '비전 분석 & 체성분',
    title: '운동 목표 및 성장 관리',
    description: '운동 목표를 설정하고 꾸준한 성장을 위한 동기를 제공하는 관리 기능',
    details: [
      '음식 사진 한 장으로 탄수화물·단백질·지방 영양소 자동 분석',
      '인바디 체중, 골격근량, 체지방률 변화 추이 기록 및 그래프',
      '내 위치 기반 주변 헬스장 검색 및 오운완 챌린지 커뮤니티',
    ],
    screenKey: 'dietAi',
  },
];

export const screenshotSlides: ScreenshotSlide[] = [
  {
    id: 'screen-1',
    title: '메인 홈 대시보드',
    subtitle: '오늘의 추천 프로그램 & 연속 출석',
    category: '홈 & 루틴',
    description: '수준별 추천 루틴(가슴&삼두 머신 등), 주간 달성률, 오운완 인증 현황을 한눈에 파악합니다.',
  },
  {
    id: 'screen-2',
    title: '스마트 운동일지 & 타이머',
    subtitle: '세트·무게·휴식시간 실시간 기록',
    category: '운동 관리',
    description: '진행 중인 종목의 세트별 무게와 횟수를 기록하고, 휴식 타이머와 최고 중량 추이를 확인합니다.',
  },
  {
    id: 'screen-3',
    title: 'AI 코치 & 비전 식단 분석',
    subtitle: 'Gemini 실시간 상담 & 탄·단·지 자동 계산',
    category: 'AI 코어',
    description: '운동 자세 팁 상담과 식사 사진 한 장으로 칼로리 및 3대 영양소를 정밀 분석합니다.',
  },
];

export const audienceItems: AudienceItem[] = [
  {
    id: 'beginner',
    level: '초급자',
    title: '운동 초보자',
    description: '헬스장에 처음 방문했거나 운동 방법을 배우고 싶은 분',
    points: [
      '머신 사용법 및 올바른 자세 가이드 확인',
      '부담 없는 초보자 맞춤 분할 루틴 제공',
      'AI 코치에게 손목 그립, 호흡법 실시간 질문',
    ],
    recommendation: '기초 머신 루틴 & AI 자세 가이드 추천',
  },
  {
    id: 'intermediate',
    level: '중급자',
    title: '꾸준히 운동하는 사람',
    description: '운동을 체계적으로 기록하고 목표를 관리하고 싶은 분',
    points: [
      '세트 간 정밀 휴식 타이머로 운동 효율 극대화',
      '주간 총 볼륨 및 부위별 운동 빈도 점검',
      '식단 사진 자동 분석으로 일일 단백질 섭취량 체크',
    ],
    recommendation: '운동일지 볼륨 추적 & 비전 식단 추천',
  },
  {
    id: 'advanced',
    level: '상급자',
    title: '숙련된 운동인',
    description: '자신의 운동 경험과 데이터를 바탕으로 더욱 효율적으로 관리하고 싶은 분',
    points: [
      '종목별 1RM 및 중량 발전 추이 데이터 분석',
      '인바디 골격근량 및 체지방률 상관관계 추적',
      '전국 오운완 챌린지와 헬스메이트 매칭 참여',
    ],
    recommendation: '성장 그래프 & 신체 스펙 정밀 분석 추천',
  },
];
