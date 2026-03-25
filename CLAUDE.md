@AGENTS.md

# ForGet 랜딩 페이지

AI 기반 일정 리마인더 서비스 **ForGet**의 싱글페이지 랜딩 사이트.
정적 사이트 생성(SSG) 방식으로 빌드되며, 서버 컴포넌트/API 라우트는 사용하지 않는다.

## 기술 스택

| 영역 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 16 (App Router) | `output: "export"` SSG |
| 언어 | React 19 + TypeScript 5 | `strict: true` |
| 스타일 | Tailwind CSS v4 | `@import "tailwindcss"` 방식 |
| 애니메이션 | Framer Motion 12 | 스크롤 기반 + 뷰포트 진입 |
| 폰트 | Pretendard Variable | 로컬 woff2, `--font-pretendard` |

## 프로젝트 구조

```
src/
├── app/                # 페이지, 레이아웃, 글로벌 스타일
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # 랜딩 페이지 섹션 (Hero, Problem, Solution, HowItWorks, Philosophy, FinalCTA)
│   └── ui/             # 재사용 컴포넌트 (CTAButton, ServiceModal)
├── hooks/              # useModal, useMediaQuery, useScrollSpy
└── lib/                # fonts.ts, constants.ts (SITE_CONFIG, ANIMATION 프리셋 등)
```

경로 별칭: `@/*` → `./src/*`

## 핵심 아키텍처 패턴

### Dual Rendering (데스크톱/모바일)

모든 섹션 컴포넌트는 두 가지 모드를 지원한다:

- **데스크톱 (`lg` 이상)**: `scrollYProgress` + `range` props를 받아 `fixed` 레이어 위에서 스크롤 동기화 애니메이션 구동. 2000vh 높이의 스크롤 컨테이너 사용.
- **모바일 (`lg` 미만)**: props 없이 일반 스크롤 레이아웃. `whileInView` 기반 뷰포트 진입 애니메이션.

```typescript
// 섹션 컴포넌트 패턴
interface Props {
  scrollYProgress?: MotionValue<number>;
  range?: readonly [number, number];
  onCTAClick?: (platform: "ios" | "android") => void;
}

export default function SomeSection({ scrollYProgress, range, ...rest }: Props) {
  if (scrollYProgress && range) return <FixedVersion ... />;
  return <MobileVersion ... />;
}
```

새 섹션 추가 시 반드시 이 패턴을 따를 것.

### 섹션 범위 (`SECTION_RANGES`)

`src/lib/constants.ts`에 정의된 `SECTION_RANGES`로 각 섹션의 스크롤 구간(0~1)을 관리한다.
새 섹션 추가 시 기존 범위를 재배분해야 한다.

## 스타일링 규칙

- **테마**: 모노크롬 미니멀 라이트 (`--background: #ffffff`, `--foreground: #0a0a0a`)
- **색상**: `globals.css`의 CSS 변수 사용 (`--gray-*`, `--color-accent`, `--color-border` 등)
- **Tailwind v4**: `tailwind.config` 파일 없음. `globals.css`에서 `@import "tailwindcss"` 후 CSS 변수로 테마 정의
- 커스텀 CSS 최소화, Tailwind 유틸리티 클래스 우선

## 애니메이션 규칙

- `src/lib/constants.ts`의 `ANIMATION` 프리셋을 재사용할 것 (fadeInUp, clipRevealUp, staggerContainer 등)
- 기본 이징 커브: `[0.16, 1, 0.3, 1]` (expo out)
- 새 애니메이션 추가 시 `ANIMATION` 객체에 프리셋으로 등록

## SEO

- `layout.tsx`에 메타데이터, OpenGraph, Twitter Card, JSON-LD 구조화 데이터 정의
- `public/robots.txt`, `public/sitemap.xml` 관리
- `lang="ko"` 설정
- 도메인: `https://forget.app`

## 브랜드

- `ForGet_Brand.md` 참조
- 톤: 미니멀, 신뢰 > 감성, 간결함 > 장황함
- CTA 버튼 클릭 시 `ServiceModal`로 "서비스 준비 중" 안내 (앱 미출시 상태)

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 정적 사이트 빌드 (out/ 디렉토리)
npm run lint     # ESLint 검사
```
