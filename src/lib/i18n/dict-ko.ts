import type { TranslationDict } from "./types";

export const ko: TranslationDict = {
  common: {
    language: "한국어",
    languageShort: "KO",
  },
  header: {
    nav: {
      problem: "문제",
      solution: "솔루션",
      howItWorks: "사용법",
      philosophy: "철학",
    },
    cta: "시작하기",
  },
  hero: {
    badge: "잊어도 되는 일정 관리",
    title: "일정은 잊으세요.\n기억은 제가 할게요.",
    subtitle: "캘린더 들여다보는 시간도 아깝잖아요.\nForGetee이 필요한 순간에 알려드립니다.",
  },
  about: {
    eyebrow: "About",
    title: "ForGetee는 어떤 앱인가요?",
    description:
      "ForGetee는 AI 기반 일정 리마인더 모바일 앱입니다.\n사용자가 등록한 일정을 자동으로 분석해 가장 적절한 시점에\n푸시 알림과 AI 음성 전화로 알려드립니다.",
    featuresTitle: "주요 기능",
    features: {
      a: "자연어 입력만으로 일정 자동 생성",
      b: "AI가 일정의 중요도·이동 시간을 고려해 리마인드 시점 추천",
      c: "중요한 일정은 AI 음성 전화로 안내",
      d: "Google 캘린더 양방향 동기화로 기존 일정 통합 관리",
    },
    dataUsageTitle: "Google 계정 데이터 사용",
    dataUsage:
      "ForGetee는 사용자가 동의한 경우에만 Google 캘린더 권한을 사용하며,\n오직 일정 조회·생성·동기화 목적에만 사용합니다.\n수집된 데이터는 제3자와 공유되지 않습니다.",
    privacyLink: "개인정보처리방침 자세히 보기",
  },
  problem: {
    eyebrow: "Problem",
    titleDesktop: "캘린더,\n아직도 직접 열고 있나요?",
    titleMobile: "캘린더, 등록만 하고\n확인은 안 하죠?",
    items: {
      a: {
        title: "등록은 했는데",
        body: "일정을 넣어놓고도 깜빡하는 건 여전합니다.",
      },
      b: {
        title: "알림은 울렸는데",
        body: "무심코 넘긴 알림, 결국 놓친 약속.",
      },
      c: {
        title: "확인하려면",
        body: "앱 열고, 날짜 찾고, 스크롤하고... 귀찮죠.",
      },
    },
  },
  solution: {
    eyebrow: "Solution",
    title: "ForGetee은 다릅니다.",
    subtitle: "확인하지 않아도, 필요한 순간에 알려드립니다.",
    items: {
      a: {
        title: "간단하게 등록하세요.",
        body: "일정을 입력하면 AI가 알아서 만듭니다.\n날짜, 시간, 장소까지 자동으로.",
      },
      b: {
        title: "AI가 타이밍을 정해드립니다.",
        body: "일정의 종류, 중요도, 이동 시간까지 고려해\n최적의 리마인드 시점을 추천합니다.",
      },
      c: {
        title: "전화로 알려드립니다.",
        body: "중요한 일정은 AI가 직접 전화합니다.\n놓칠 수 없도록.",
      },
    },
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "3단계면 충분합니다",
    steps: {
      one: {
        title: "일정을 말하세요",
        body: "자연어로 입력하면 끝. 복잡한 양식은 없습니다.",
      },
      two: {
        title: "잊으세요",
        body: "AI가 최적의 타이밍을 계산합니다. 당신은 신경 끄세요.",
      },
      three: {
        title: "알림을 받으세요",
        body: "필요한 순간에, 가장 적절한 방식으로 알려드립니다.",
      },
    },
  },
  philosophy: {
    lineOne: "기억은 AI에게,",
    lineTwo: "여유는 당신에게",
    taglineSub: "당신을 위해, 모든 것을 챙기겠습니다.",
  },
  cta: {
    title: "일정은 맡기고,\n순간을 챙기세요.",
    subtitle: "ForGetee과 함께 여유로운 하루를 시작하세요.",
  },
  footer: {
    tagline: "기억은 AI에게,\n여유는 당신에게.",
    sections: {
      service: "서비스",
      help: "도움말",
      contact: "문의",
    },
    links: {
      privacy: "개인정보처리방침",
      terms: "이용약관",
      calendarSync: "캘린더 연동 안내",
    },
    copyright: "© 2026 ForGetee. All rights reserved.",
  },
  serviceModal: {
    title: "곧 만나요",
    body: "ForGetee {platform} 버전은\n현재 서비스를 준비하고 있습니다.",
    subbody: "조금만 기다려주세요.",
    confirm: "확인",
    closeAria: "닫기",
  },
  help: {
    title: "도움말",
    subtitle: "ForGetee 사용에 도움이 되는 안내입니다.",
    intro:
      "ForGetee 은 기존 Google / Apple 캘린더의 일정을 함께 표시해, 캘린더 앱을 따로 열지 않아도 모든 일정을 한 곳에서 확인할 수 있게 합니다. 외부 캘린더 연동은 선택 기능이며, 사용하지 않으셔도 ForGetee 의 모든 기능을 이용하실 수 있습니다.",
    google: {
      title: "Google 캘린더 연동",
      step1: "ForGetee 앱 설정 화면을 엽니다.",
      step2: '"Google 캘린더 연동" 토글을 켭니다.',
      step3: "Google 계정 선택 화면에서 사용할 계정을 선택합니다.",
      step4: '권한 동의 화면에서 "허용"을 누릅니다.',
      step5: "메인 캘린더 화면에 Google 일정이 함께 표시됩니다.",
    },
    apple: {
      title: "Apple 캘린더 연동",
      step1: "ForGetee 앱 설정 화면을 엽니다.",
      step2: '"Apple 캘린더 연동" 토글을 켭니다.',
      step3: 'iOS 권한 다이얼로그에서 "전체 액세스 허용"을 선택합니다.',
      step4: "메인 캘린더 화면에 iCloud / 구독 캘린더 일정이 함께 표시됩니다.",
    },
    dataUsage: {
      title: "사용하는 데이터 안내",
      summary:
        "ForGetee 은 외부 캘린더에 대해 읽기 전용(read-only) 권한만 사용합니다. 사용자의 캘린더에 일정을 추가하거나 수정하지 않습니다.",
      scopeLabel: "Google OAuth Scope",
      scopeValue: "calendar.readonly (읽기 전용)",
      dataLabel: "가져오는 정보",
      dataValue: "일정 제목 · 시작/종료 시각 · 장소 · 설명",
      purposeLabel: "사용 목적",
      purposeValue:
        "ForGetee 메인 캘린더에 사용자 일정을 통합 표시 + AI 리마인드 시점 분석에 컨텍스트로 참고",
      storageLabel: "데이터 보관",
      storageValue:
        "사용자 디바이스 내에서 사용. 서버에는 일정 ID 와 메타데이터만 캐시되며 일정 본문은 저장하지 않음",
      thirdLabel: "제3자 공유",
      thirdValue: "없음",
      retentionLabel: "보유 기간",
      retentionValue: "사용자가 캘린더 연동을 해제할 때까지",
    },
    disconnect: {
      title: "캘린더 연동 해제",
      body: "설정 화면에서 해당 캘린더 토글을 다시 끄면 즉시 연동이 해제되고 캐시된 모든 일정 정보가 삭제됩니다.",
    },
    contact: {
      label: "추가 문의",
      body: "캘린더 연동 또는 데이터 사용에 대해 더 궁금하신 점이 있으시면 contact@forget.app 또는 kimkeonhwi991231@gmail.com 으로 연락해 주세요.",
    },
    backToHome: "메인으로",
  },
};
