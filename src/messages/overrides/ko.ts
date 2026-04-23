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
      date: "2025.12 – 2026.04",
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
      description:
        "공개 스토어프론트, 스태프/관리, 고객 계정 흐름을 일관된 내비게이션·상태로 묶는 커머스 구현이 중심입니다. 표면이 늘어나도 카탈로그·장바구니·결제·운영이 한 모델로 읽히도록 했고, 인증·결제·프로바이더·실시간·i18n 연동을 ‘나중에 붙이는 작업’이 아니라 제품의 일부로 취급합니다.",
      problem:
        "기능·로케일이 쌓여도 상점, 어드민, 계정 영역이 갈라지지 않는 출시 가능한 커머스를 실제로 돌릴 수 있게 만드는 일.",
      outcome:
        "정적 목업이 아니라, 실제 체크아웃·알림이 동작하는 일관된 고객/운영 경험에 가까운 형태의 제품을 지향한 결과.",
    },
    "rumi-ai": {
      summary: "EN/KO/FA(RTL)와 스트리밍, FastAPI·DB와의 BFF 정합, 세션/계약을 한 제품으로 묶은 사례.",
      whyItMatters: "채팅 UI 뒤에 실제로 붙는 통합·신뢰성 문제를 정면으로 다룬 사례.",
      description:
        "RAG/인용을 전제로 한 대화 제품에서 어려운 점은 입력창이 아니라 로케일(필수 RTL) 전반의 일관성, 스트리밍 응답, Next.js ↔ FastAPI/SQLAlchemy 사이의 안정적 핸드오프에 있습니다. API 키 데모가 아닌, 실제 사용을 전제로 한 신뢰·오류·세션 흐름에 집중했습니다.",
      problem:
        "흥미 있는 로직이 웹·API·모델에 걸쳐 있을 때, 다국어(필수 RTL) 채팅이 ‘한 제품’처럼 느껴지게 만드는 것.",
      outcome:
        "끊기지 않는 스트리밍, 솔직한 오류/로딩 상태, 백엔드와 정합을 맞춘 네비게이션·세션 쪽 경험.",
    },
    fishlinic: {
      summary: "양식/수질·텔레메트리에 가까운 실시간·요약·제어 흐름이 섞인 대시보드 제품.",
      whyItMatters: "센서·서비스·UI가 같이 변할 때도 읽을 수 있는 대시보드/운영 흐름.",
      description:
        "TypeScript/Next.js 대시보드에 센서·브리지 데이터를 실시간으로 시각화하고, 사양(피더·카메라 등)에 맞는 운영자 흐름을 제품 범위 안에 둡니다. 변화가 잦은 텔레메트리를 읽기 쉬운 뷰·조작·분석(데이터 쪽 AI 가공 경로)에 연결하는 쪽이 작업의 중심입니다.",
      problem:
        "하드웨어·서비스·UI가 동시에 움직일 때도, 운영이 결정에 필요한 신호를 놓치지 않게 만드는 것.",
      outcome:
        "지표가 바뀌는 상황에서도 ‘무슨 일이 벌어지는지’를 읽을 수 있게 꾸민 실시간·제어·분석 루프에 가깝다.",
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
