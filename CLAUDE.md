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

---

## Git 워크플로우 (작업 요청 시 자동 수행)

사용자의 작업 요청(섹션 추가/수정, 텍스트 변경, 디자인 개선, 버그 수정 등)을 받으면 아래 절차를 순서대로 수행한다.

### 이슈 타입 매핑

| 타입 | 이모지 | 브랜치 접두사 | 트리거 예시 |
|------|--------|-------------|------------|
| Feature | ✨ | `feature/` | 새 섹션/페이지 추가, 기능 추가 (i18n, 토글 등) |
| Fix | 🔨 | `fix/` | 버그 수정, 텍스트/링크 수정 |
| BugFix | 🐞 | `bugfix/` | 런타임 버그, 빌드 실패 |
| Refactor | ♻️ | `refactor/` | 리팩터링 (Dual rendering 분리 등) |
| Chore | 🧰 | `chore/` | 정리, 의존성 업데이트, README |
| Docs | 📃 | `docs/` | CLAUDE.md / 브랜드 가이드 등 문서 작성 |
| Setting | ⚙️ | `setting/` | 개발 환경 설정 (eslint/tsconfig 등) |
| Deploy | 🌏 | `deploy/` | 배포 |
| Design | 🎨 | `design/` | 디자인/마크업 (애니메이션, 색상, 폰트) |

### 절차

#### 1단계: dev 브랜치 최신화
```bash
git checkout dev && git pull origin dev
```

#### 2단계: GitHub 이슈 생성
- 요청 내용을 분석하여 적절한 이슈 타입 선택
- `gh issue create` 로 이슈 생성 (타이틀에 이모지 포함)
- 생성된 이슈 번호 확인 (예: #5)

#### 3단계: 이슈 브랜치 생성 및 체크아웃
- 형식: `{타입}/#{이슈번호}` (예: `feature/#5`, `fix/#6`)
- `git checkout -b feature/#5`

#### 4단계: 작업 수행
- Dual rendering(데스크톱/모바일) 패턴 준수
- `ANIMATION` / `SECTION_RANGES` 프리셋 재사용
- 텍스트 변경 시 i18n dict (`src/lib/i18n/ko.ts`, `en.ts`) 양쪽 동기 업데이트
- `npm run lint` / `npm run build` 통과 확인

#### 5단계: 사용자 확인 대기
- 작업 완료 후 사용자에게 확인 요청
- 사용자가 "문제 없다"고 할 때까지 수정 반복

#### 6단계: 커밋 및 푸시
- 커밋 메시지 형식: `{타입}: {작업 내용 요약}`
  - 예: `feature: 도움말 페이지 + i18n 토글 추가`
  - 예: `fix: Footer 정책 링크 깨진 거 수정`
- `git push -u origin {브랜치명}`

#### 7단계: PR 생성 (머지는 사용자 명시 지시 후)
- **PR 제목 앞에 반드시 이모지 포함**
- PR 제목 형식: `{이모지} {타입}: {작업 내용}`
  - 예: `✨ Feature: 도움말 페이지 + 한영 토글`
- PR 본문에 `closes #{이슈번호}` 포함 → merge 시 이슈 자동 닫힘
- PR 생성까지만 자동, **squash merge 는 사용자가 "머지해" 지시할 때까지 대기**
- squash merge 시: `gh pr merge --squash --subject "✨ Feature: ..."` 형태로 이모지 포함 제목 명시

#### 8단계: 로컬 정리 (머지 후)
```bash
git checkout dev && git pull origin dev
git branch -d {브랜치명}
```

---

## 작업 시 주의사항

- `output: "export"` SSG 모드 — 서버 컴포넌트/API 라우트 추가 금지
- 외부 링크는 `target="_blank" rel="noopener noreferrer"` 로 보안 처리
- CTA / 마케팅 톤 유지 — 정보성 콘텐츠는 별도 페이지(`/help` 등) 로 분리
- 정책/약관/도움말 등 외부 링크는 Notion 또는 별도 페이지로 분리

