import type { LocalizedOverrides } from "./types";

export const koOverrides: LocalizedOverrides = {
  site: {
    headlineRole: "풀스택 프로덕트 엔지니어",
    heroSummaryLines: [
      "Next.js 제품을 ‘UI만’이 아니라 API·인증·실시간까지 한 흐름으로 출시한 경험이 중심입니다.",
      "다국어·RTL, 데이터·텔레메트리 UI, 이커머스, 검증(신원) 흐름, Python/FastAPI와 붙는 AI 제품을 다뤘습니다.",
    ],
    headlineFocus:
      "BFF 경계, 세션·계약, 프로덕션 출시 — TypeScript, Node, Python, Prisma/포스트그레SQL 계열을 실제 제품에 맞춰 씁니다.",
    positioningParagraph:
      "따로 만든 서비스가 하나의 제품처럼 보이게 만드는 데 강합니다. 러닝하는 스택 쇼보다, 실행·검토 가능한 시스템을 우선합니다.",
    location: "대한민국 서울",
    availability: "선별 지원 — 정규직 또는 상당 규모 계약(역할·지역·취업 규정에 따름)",
    heroProofTags: [
      "이커머스 + 어드민",
      "다국어 + RTL",
      "실시간·텔레메트리 UI",
      "World ID / 신뢰 흐름",
      "AI + FastAPI 워크플로",
    ],
  },
  bio: {
    build: {
      title: "만드는 것",
      content:
        "경계가 있는 Next.js 제품: 이커머스, 다국어·RTL, 실시간 대시보드, AI·검증 흐름. 통합(인증, API, 세션, 결제, 웹소켓)이 ‘추가 작업’이 아니라 기능의 일부입니다.",
    },
    approach: {
      title: "일하는 방식",
      content:
        "로딩·에러·권한 상태를 솔직히 드러내고, 스트리밍·소켓·배포까지 한 번에 책임질 수 있는 단위로 나눕니다.",
    },
    context: {
      title: "맥락",
      content:
        "서울 거주. 세종대 컴퓨터공학 학사(수료 예정: 2026년 12월). 기술·제품 대화는 영어로 격주 이상이 가능합니다.",
    },
  },
  journey: {
    j1: {
      date: "2025.01 – 현재",
      title: "독립 프로덕트·플랫폼",
      subtitle: "창업/풀스택 기여",
      description:
        "Trainium, Rumi(통합), Fishlinic, GitGuard Agent, ProofBoard 등을 출시 관점에서 구현. 아키텍처부터 배포·반복까지 제품으로 다룹니다.",
    },
    j2: {
      date: "2025.10 – 현재",
      title: "세종대 — 연구실 인턴",
      subtitle: "프론트 + 통합",
      description:
        "Rumi AI에서 BFF, 세션, 다국어·RTL, 스트리밍 UX 정합, 백엔드와의 요청/응답 정리 등 ‘한 경험’으로 묶는 일을 담당.",
    },
    j3: {
      date: "2025.12 – 현재",
      title: "EBIT — AI 트레이너(계약)",
      subtitle: "모델 학습용 과제·품질",
      description:
        "저장소 기반 소프트웨어 과제, 디버깅, 검증자 기반 정합, 유지보수 가능한지를 기준으로 한 기술 피드백.",
    },
    j4: {
      date: "수료 예정(2026.12)",
      title: "세종대학교",
      subtitle: "컴퓨터공학 학사(진행)",
      description:
        "캡스톤(Fishlinic)을 포함한 학업과 병행. 연구실·제품 병행 경험을 중심으로 기술 스택을 정리합니다.",
    },
  },
  techCategories: {
    frontend: { title: "프론트엔드" },
    backend: { title: "백엔드·데이터" },
    languages: { title: "언어" },
    tools: { title: "도구·운영" },
  },
  achievementCategories: {
    work: { title: "수상·강한 근거" },
  },
  projectsBySlug: {
    trainium: {
      summary: "이커머스(고객 + 어드민)와 다국어, 역할, 결제, 알림이 연결된 풀스택 상품.",
      whyItMatters: "한 페이지가 아닌, 운영·고객 흐름이 함께 돌아가는 제품 범위의 증거.",
    },
    "rumi-ai": {
      summary: "EN/KO/FA(RTL)와 스트리밍, FastAPI·DB와의 BFF 정합, 세션/계약을 한 제품으로 묶은 사례.",
      whyItMatters: "채팅 UI 뒤에 실제로 붙는 통합·신뢰성 문제를 정면으로 다룬 사례.",
    },
    fishlinic: {
      summary: "양식/수질·텔레메트리에 가까운 실시간·요약·제어 흐름이 섞인 대시보드 제품.",
      whyItMatters: "센서·서비스·UI가 같이 변할 때도 읽을 수 있는 대시보드/운영 흐름.",
    },
    patchpilot: {
      summary: "버그 맥락을 다단계로 분해하고 테스트·실행·패치로 이어지는 AI 워크플로(공개 org 저장소).",
      whyItMatters: "한 번의 응답이 아니라 단계·검증이 있는 자동화에 가까운 제품 UI.",
    },
    gitguardian: {
      summary: "스냅샷·분류·복구 계획·검증 루프로 묶는 Git 복구용 CLI+웹.",
      whyItMatters: "자동화가 위험할 수 있는 도메인에서 ‘단계+검증’으로 신뢰를 쌓는 사례.",
    },
    proofboard: {
      summary: "World ID·지갑과 연동된, 사람만 참여하는 Q&A(서버 측 검증·쓰기 규율).",
      whyItMatters: "신원·리플레이·원자적 쓰기 같은 제약이 있는 제품에서의 API·DB 설계.",
    },
    "dr-niaraki-website": {
      summary: "DB에서 공개·초안·게시/복원을 다루는 연구자 프로필( DOCX/편집 흐름 포함).",
      whyItMatters: "한 번 쓰는 랜딩이 아니라 운영·콘텐츠 시스템이 있는 사이트.",
    },
    nestar: {
      summary: "NestJS + GraphQL + MongoDB + JWT — 백엔드 구조 샘플.",
      whyItMatters: "UI 너머의 서비스/스키마 경계를 보여주는 짧은 근거.",
    },
  },
};
