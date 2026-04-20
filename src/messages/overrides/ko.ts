import type { LocalizedOverrides } from "./types";

export const koOverrides: LocalizedOverrides = {
  site: {
    headlineRole: "프로덕트 / 풀스택 엔지니어",
    heroSummaryLines: [
      "프론트엔드 비중이 큰 프로덕트 엔지니어: UI, 데이터 흐름, 인증, 신뢰성을 한 전달 표면으로 묶습니다.",
      "브로슈어 사이트가 아니라 다국어·실시간·통합이 많은 제품을 출시해 왔습니다.",
    ],
    headlineFocus:
      "UI·데이터 흐름·인증·신뢰성이 만나는 지점에서 통합 감각이 강한 프론트엔드 중심 전달.",
    positioningParagraph:
      "다국어·실시간 제품 표면, BFF 스타일 통합, 따로 만든 서비스가 하나의 제품처럼 느껴지게 만드는 일에서 강점을 둡니다. 과장된 타이틀보다 프로덕션 지향 실행을 중시합니다.",
    location: "대한민국 서울",
    availability: "선별 지원 — 정규직 또는 상당 규모의 계약",
    heroProofTags: [
      "통합 중심 전달",
      "다국어·RTL",
      "실시간·데이터 집약 UI",
      "AI 워크플로 시스템",
      "프로덕션 실행",
    ],
  },
  bio: {
    build: {
      title: "만드는 것",
      content:
        "대규모 Next.js 제품 — 스토어프론트와 어드민, 다국어·RTL 화면, 대시보드, AI 워크플로 UI 등 통합·인증 경계·신뢰성이 레이아웃만큼 중요한 영역.",
    },
    approach: {
      title: "일하는 방식",
      content:
        "서비스 사이의 이음새를 조입니다: 계약, 세션 동작, 스트리밍·에러 상태, 배포. 쇼보다 정직한 범위와 리뷰 가능한 변경을 선호합니다.",
    },
    context: {
      title: "맥락",
      content:
        "서울 거주. 영어로 타임존을 넘나드는 협업에 익숙합니다. 클라이언트 전달과 제품형 반복 경험이 있습니다.",
    },
  },
  journey: {
    j1: {
      date: "최근",
      title: "풀스택 프로덕트 전달",
      subtitle: "Next.js · TypeScript · API · 배포",
      description:
        "웹 앱의 라우팅·데이터 로딩, 폼·인증 흐름, 통합, Vercel 등 호스트로의 출시까지 엔드투엔드 소유.",
    },
    j2: {
      date: "최근",
      title: "모션을 곁들인 UI 엔지니어링",
      subtitle: "Framer Motion · 반응형 레이아웃",
      description:
        "절제된 모션으로 위계를 돕는 마케팅·앱 표면 — 콘텐츠를 가리지 않습니다.",
    },
  },
  techCategories: {
    frontend: { title: "프론트엔드" },
    backend: { title: "백엔드·데이터" },
    languages: { title: "언어" },
    tools: { title: "도구·운영" },
  },
  achievementCategories: {
    work: { title: "선별 전달 사례" },
  },
  projectsBySlug: {
    trainium: {
      summary:
        "대규모 스토어프론트·어드민: 다국어 UX, 역할 기반 흐름, 계정 영역, 결제, 알림.",
      whyItMatters:
        "브로슈어가 아닌 실제 제품 범위의 증거 — 필터, 상세, 어드민, 통합이 많은 동작.",
    },
    "rumi-ai": {
      summary:
        "영·페르시아(RTL)·한국어 면과 스트리밍 응답, 검색 연동, BFF형 백엔드 결합.",
      whyItMatters:
        "다국어(RTL 포함)·스트리밍 UI, Next.js와 Python 서비스 사이의 이음을 한 제품처럼 다룬 사례.",
    },
    fishlinic: {
      summary:
        "실시간 수질·사료·카메라 제어가 어우러진 IoT 수족관 관리 풀스택 대시보드.",
      whyItMatters:
        "하드웨어 인접 실시간 UI와 풀스택 대시보드가 만나는 통합 제품.",
    },
    patchpilot: {
      summary: "검증·승인 중심의 패치/릴리스 워크플로 UI.",
      whyItMatters: "데이터와 권한이 얽힌 운영자 워크플로를 단순한 폼으로 끝내지 않은 사례.",
    },
    gitguardian: {
      summary: "Git 복구 계획을 제안하는 크로스플랫폼 에이전트·CLI·웹.",
      whyItMatters: "위험한 조작을 게이트하는 검증 지향 개발자 도구.",
    },
    proofboard: {
      summary: "실시간 보드와 협업 증거를 묶는 제품형 협업 표면.",
      whyItMatters: "실시간 UI와 협업 도메인을 함께 다룬 사례.",
    },
    "dr-niaraki-website": {
      summary: "의료 전문가용 신뢰·접근성을 고려한 브랜드 웹.",
      whyItMatters: "전문 서비스에 맞는 톤과 구조의 공개 웹.",
    },
    nestar: {
      summary: "데이터·워크플로가 있는 내부/운영 성격의 웹 제품.",
      whyItMatters: "내부 사용자를 위한 실사용 UI와 흐름.",
    },
  },
};
