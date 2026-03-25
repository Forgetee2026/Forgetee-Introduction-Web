export const SITE_CONFIG = {
  name: "ForGet",
  title: "ForGet - AI가 대신 기억합니다 | AI 일정 리마인더",
  description:
    "일정은 잊으세요. 기억은 제가 할게요. ForGet은 AI 기반 스마트 일정 리마인더 서비스입니다.",
  url: "https://forget.app",
  locale: "ko_KR",
} as const;

export const NAV_ITEMS = [
  { id: "problem", label: "문제" },
  { id: "solution", label: "솔루션" },
  { id: "how-it-works", label: "사용법" },
  { id: "philosophy", label: "철학" },
] as const;

export const SECTION_IDS = {
  hero: "hero",
  problem: "problem",
  solution: "solution",
  howItWorks: "how-it-works",
  philosophy: "philosophy",
  cta: "cta",
} as const;

// 섹션 스크롤 범위 (데스크톱 풀페이지 모드)
export const SECTION_RANGES = {
  hero: [0, 0.12] as [number, number],
  problem: [0.12, 0.30] as [number, number],
  solution: [0.30, 0.52] as [number, number],
  howItWorks: [0.52, 0.72] as [number, number],
  philosophy: [0.72, 0.88] as [number, number],
  cta: [0.88, 1.0] as [number, number],
} as const;

export const SCROLL_HEIGHT = "2000vh";

// 공통 이징 커브
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

// 애니메이션 프리셋 — blur 미사용, 브랜드 정체성 반영
export const ANIMATION = {
  // 기본: 오파시티 + Y이동
  fadeInUp: {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: EASE_OUT_QUART },
    },
  },
  // 마스크 리빌: overflow:hidden 부모 안에서 사용
  maskReveal: {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
  },
  // 클립패스 인셋: 아래에서 위로 드러남
  clipRevealUp: {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  // 스케일 세틀: 살짝 큰 상태에서 착지
  scaleSettle: {
    hidden: { opacity: 0, scale: 1.04 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
  },
  // 순차 컨테이너
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  },
  staggerContainerFast: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  },
  // 좌우 슬라이드
  slideFromLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  // 라인 드로우
  drawLine: {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: EASE_OUT_EXPO },
    },
  },
} as const;

// 섹션 전환 설정
export const SECTION_TRANSITION = {
  duration: 0.04, // 전환 구간 (전체 progress의 4%)
  scaleIn: 1.03, // 진입 시 초기 scale
  scaleOut: 0.97, // 퇴장 시 최종 scale
} as const;

// 네비게이션 클릭 시 스크롤 오프셋 (contentOpacity=1 시점으로 보정)
export const NAV_SCROLL_OFFSET = SECTION_TRANSITION.duration;
