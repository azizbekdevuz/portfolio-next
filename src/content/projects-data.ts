import type { Project } from "@/models/Project";

const nx = [
  { name: "Next.js", iconId: "nextjs" },
  { name: "React", iconId: "react" },
  { name: "TypeScript", iconId: "typescript" },
] as const;

/**
 * Case-study copy is aligned to local resume materials and shipped repositories.
 * No fabricated metrics, user counts, or performance numbers.
 */
export const projects: Project[] = [
  {
    id: "trainium",
    slug: "trainium",
    title: "Trainium",
    projectType: "E-commerce platform (storefront + admin)",
    summary:
      "End-to-end commerce product: App Router–based customer UX, role-based admin, multilingual routing, auth, catalog-to-checkout flows, and real-time updates.",
    whyItMatters:
      "Flagship work at full product depth—data and roles behind the UI, not a marketing shell.",
    description:
      "A production-aimed monorepo-style delivery: public storefront, staff/admin areas, and customer account flows tied together with consistent navigation and state. Emphasis is on how catalog, cart, checkout, and operations stay coherent as surfaces multiply—integration work (payments, providers, real-time channels, i18n) as part of the product, not an afterthought.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "Prisma", iconId: "prisma" },
      { name: "Next.js", iconId: "nextjs" },
      { name: "Docker", iconId: "docker" },
      { name: "Nginx", iconId: "nginx" },
      { name: "Turborepo", iconId: "turborepo" },
      { name: "Socket.io", iconId: "socketio" },
      { name: "NextAuth.js", iconId: "nextauth" },
    ],
    liveLink: "https://trainium.shop/en",
    githubLink: "https://github.com/azizbekdevuz/trainium",
    codeSnippet: `// Locale- and session-aware product surface (illustrative)
export default async function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const session = await getSession();
  const product = await fetchProduct(params.slug, params.locale);
  return <ProductLayout product={product} role={session?.role} locale={params.locale} />;
}`,
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 1,
    roleTracks: ["fullstack", "frontend"],
    proofTags: [
      "Storefront + admin",
      "Multilingual product",
      "Payments & notifications",
      "Deployment-ready layout",
    ],
    role: "Founder, full-stack / product implementation",
    timeline: "2025–present",
    teamContext: "Independent delivery",
    problem:
      "Ship a shippable commerce system where storefront, admin, and account areas stay aligned as features and locales accumulate.",
    outcome:
      "A coherent customer and operations experience with real checkout and notification behavior—not a static mock.",
    owned:
      "Product implementation across web surfaces: routing and UI, business flows, integration points for auth, payments, and real-time features, and keeping cross-cutting concerns (locales, roles) consistent.",
    architectureNotes:
      "Next.js (App Router) and TypeScript on the web tier; Prisma/PostgreSQL for persistence; services and sockets in support of real-time and operational behavior; deployment-oriented project layout (including Docker) where the repo is structured for operations.",
    challenges: "Balancing feature growth with maintainable boundaries between customer, staff, and system integration code paths.",
  },
  {
    id: "rumi-ai",
    slug: "rumi-ai",
    title: "Rumi AI",
    projectType: "Multilingual AI companion (research product)",
    summary:
      "LLM-powered companion with English, Korean, and Persian (RTL) UI, streaming chat, and Python backend integrated through BFF-style routes and shared contracts.",
    whyItMatters:
      "Shows how frontend delivery, auth/session, and a separate FastAPI service are glued into one product experience.",
    description:
      "A retrieval-oriented, citation-aware chat product where the hard part is not the chat box—it is end-to-end behavior across locales (including RTL), streaming responses, and stable handoffs between the Next.js app and a FastAPI/SQLAlchemy backend with migrations. Work focuses on product-shaped reliability, not a thin demo of an API key.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "FastAPI", iconId: "fastapi" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "SQLAlchemy", iconId: "sqlalchemy" },
      { name: "jwt", iconId: "jwt" },
      { name: "Ollama", iconId: "llm" },
      { name: "RAG", iconId: "rag" },
    ],
    githubLink: "https://github.com/azizbekdevuz/rumi-ai",
    codeSnippet: `// Client boundary: streaming + locale/RTL
"use client";
export function ChatPanel({ locale }: { locale: "en" | "fa" | "ko" }) {
  const { messages, pending } = useStreamingThread(locale);
  return <Thread dir={locale === "fa" ? "rtl" : "ltr"} messages={messages} status={pending} />;
}`,
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 2,
    roleTracks: ["frontend", "ai", "fullstack"],
    proofTags: ["Multilingual + RTL", "SSE / streaming", "BFF integration", "Auth & sessions", "RAG-oriented flows"],
    role: "Frontend and integration on Sejong research lab product",
    timeline: "2025–present",
    teamContext: "Sejong University research lab; integration-heavy delivery",
    problem:
      "Make multilingual (including RTL) chat feel like one product when the interesting logic spans web, API, and model-backed behavior.",
    outcome:
      "A navigable, locale-aware experience with honest streaming and error states, aligned to backend behavior rather than a disconnected UI.",
    owned:
      "UI routes and client experience, BFF-style alignment with the Python service, contract and session stability fixes, and RTL/layout correctness alongside Korean and English.",
    architectureNotes:
      "Next.js app routes as the product shell; FastAPI and PostgreSQL behind explicit API boundaries; streaming where the UX demands incremental output.",
    challenges: "Stream lifecycle, partial failures, and API mismatches that only show up under real product usage—not in isolated components.",
  },
  {
    id: "fishlinic",
    slug: "fishlinic",
    title: "Fishlinic",
    projectType: "Real-time aquaculture operations dashboard",
    summary:
      "Telemetry and control-oriented dashboard: live signals, charts, and operator-facing views with AI-enriched analysis in the loop.",
    whyItMatters:
      "Proof of data-heavy, real-time UI and integration with services and hardware-related bridges—not only charting.",
    description:
      "Smart-aquaculture monitoring: sensor and bridge data feeds a TypeScript/Next.js dashboard with live visualizations, controls (including feeder/camera–related operator flows in product scope), and AI-assisted analysis path on the data side. The work is in making changing telemetry legible, trustworthy in the UI, and tied to what operators need to decide.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "Python", iconId: "python" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "Node.js", iconId: "nodejs" },
      { name: "Arduino", iconId: "arduino" },
      { name: "IoT", iconId: "iot" },
    ],
    liveLink: "https://fishlinic.vercel.app/",
    githubLink: "https://github.com/azizbekdevuz/fishlinic",
    codeSnippet: `export default function DashboardPage() {
  const { series, health } = useTelemetryFeed();
  return (
    <DashboardShell>
      <SummaryStrip metrics={health} />
      <TelemetryCanvas series={series} />
    </DashboardShell>
  );
}`,
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 3,
    roleTracks: ["frontend", "fullstack", "ai"],
    proofTags: ["Real-time dashboard", "Telemetry", "Service integration", "AI-assisted insight"],
    role: "Full-stack and product UI (capstone team context)",
    timeline: "2025",
    teamContext: "Sejong capstone; People's Choice recognition (competition context)",
    problem: "Turn noisy operational telemetry and controls into a dependable operator-facing product.",
    outcome:
      "A deployed dashboard with live elements suitable for real demos and capstone review—not a hand-drawn wireframe.",
    owned:
      "Web product implementation, real-time and summary views, and integration with backend and analysis-related services in the system architecture.",
    architectureNotes: "Evented/real-time patterns on the client; service boundaries to bridge hardware-adjacent and AI services.",
    challenges: "Keeping aggregates honest while feeds update, and not overwhelming operators with undifferentiated charts.",
  },
  {
    id: "gitguardian",
    slug: "gitguardian",
    title: "GitGuard Agent",
    projectType: "Git recovery (CLI + web, verification-oriented)",
    summary:
      "Snapshot-based diagnosis, staged recovery plans, and explicit verification on follow-up state—safety- and review-first, not ad-hoc git suggestions.",
    whyItMatters:
      "A memorable developer-tool narrative: structure, undos, and check steps where mistakes are expensive.",
    description:
      "Cross-platform tool combining CLI snapshot capture with a web experience for classifying common git failure modes (e.g. merge/rebase detours, detached states) and presenting reversible plans. The product intent is to keep humans in control with explicit gating and verification, matching how recovery work is actually done.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "Python", iconId: "python" },
      { name: "Prisma", iconId: "prisma" },
      { name: "Zod", iconId: "zod" },
      { name: "CLI", iconId: "cli" },
      { name: "NPM Package", iconId: "npm" },
    ],
    liveLink: "https://gitguardian.online",
    githubLink: "https://github.com/azizbekdevuz/gitguardian",
    codeSnippet: `export function RecoveryPlan({ incidentId }: { incidentId: string }) {
  const plan = useVerifiedPlan(incidentId);
  return <PlanSteps steps={plan.steps} checks={plan.verification} />;
}`,
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 4,
    roleTracks: ["ai", "fullstack", "frontend"],
    proofTags: ["Recovery workflow", "Verification", "Dev tooling", "Snapshot discipline"],
    role: "End-to-end product implementation (Seoul Bowl / Scoop AI top prize, Dec 2025)",
    timeline: "2025",
    teamContext: "Hackathon delivery",
    problem: "Give developers recoverable, explainable next steps when repositories enter scary states.",
    outcome:
      "Shipped CLI + web workflow with staged plans and a verification mental model, recognized in competition context.",
    owned:
      "Product implementation across the CLI and web surfaces and the overall recovery narrative (diagnosis, plan, check).",
    architectureNotes: "Intentional separation of snapshot capture, classification, plan generation, and follow-up verification.",
    challenges: "Sound UX where overconfidence would be dangerous; keeping automation bounded by explicit user steps.",
  },
  {
    id: "proofboard",
    slug: "proofboard",
    title: "ProofBoard",
    projectType: "World ID–gated Q&A (verification-heavy)",
    summary:
      "Human-verified identity gate for Q&A: wallet auth, unique-human checks, and careful server-side write discipline on top of a Next.js/Prisma stack.",
    whyItMatters:
      "A compact case study in trust constraints—identity, atomic writes, and abuse-resistant flows—not generic CRUD.",
    description:
      "A Next.js/TypeScript product that couples World App wallet sign-in and World ID verification to category, question, answer, and social actions. Work centers on the security-sensitive glue: proof capture, server-side validation, and avoiding replay-style abuse, while still presenting a normal product UI.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "Prisma", iconId: "prisma" },
    ],
    liveLink: "https://proofboard.vercel.app",
    githubLink: "https://github.com/azizbekdevuz/proofboard",
    codeSnippet: `export default function VerifyFlow() {
  return <ProofStep onVerified={(proof) => persistSession(proof)} />;
}`,
    featured: true,
    featuredTier: "secondary",
    status: "live",
    order: 5,
    roleTracks: ["frontend", "fullstack"],
    proofTags: ["World ID", "Auth + trust UX", "Transactional writes", "Prisma/Postgres"],
    role: "Full-stack implementation",
    timeline: "2025",
    teamContext: "Solo / small shipped experiment",
    problem: "Model product flows where identity and integrity constraints are as important as the social graph.",
    outcome:
      "A deployed, reviewable build that demonstrates end-to-end verification handoffs (live demo may require the World App).",
    owned:
      "Web application, verification and write path behavior, and schema-backed features behind the Q&A product.",
    architectureNotes: "BFF and server routes as the place where proofs are validated; Prisma/PostgreSQL for durable state and relationships.",
    challenges: "Clear failure and retry paths when third-party identity or wallet steps fail.",
  },
  {
    id: "patchpilot",
    slug: "patchpilot",
    title: "PatchPilot",
    projectType: "AI bug-analysis pipeline (Next.js + FastAPI)",
    summary:
      "Staged pipeline from rich bug context through analysis, test artifacts, execution feedback, and patch-style suggestions—with tool use (e.g. Playwright) in the loop.",
    whyItMatters:
      "Shows workflow-shaped AI: structured handoffs, not a single unbounded answer.",
    description:
      "A multi-service product (public org repo) that pairs a Next.js client with a FastAPI/Gemini-backed backend to move from recordings and context into spec-like outputs and test execution. I treat it as evidence of working on stepwise, reviewable automation—not claiming sole authorship of the whole upstream tree in this portfolio.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "FastAPI", iconId: "fastapi" },
      { name: "Playwright", iconId: "playwright" },
      { name: "OpenCV", iconId: "opencv" },
      { name: "Decord", iconId: "decord" },
    ],
    liveLink: "https://patchpilot-frontend-beta.vercel.app",
    githubLink: "https://github.com/Prithwis-2023/patchpilot",
    codeSnippet: `type Stage = "intake" | "analyze" | "spec" | "execute" | "patch";
export function WorkflowRunner({ bugId }: { bugId: string }) {
  const { stage, artifacts } = useWorkflow(bugId);
  return <StageView stage={stage} artifacts={artifacts} />;
}`,
    featured: true,
    featuredTier: "secondary",
    status: "live",
    order: 6,
    roleTracks: ["ai", "fullstack", "frontend"],
    proofTags: ["Tool-using AI", "Playwright", "Staged pipeline", "FastAPI + web client"],
    role: "Contributing engineering on the web client and product-shaped workflow (confirm scope in interviews)",
    timeline: "2025",
    teamContext: "Open-source org repository (Prithwis-2023); contribution scope is interview-specific",
    problem: "Channel messy bug context into something engineers can act on, with checks between steps.",
    outcome:
      "A demo-backed pipeline UI aligned to execution-oriented backend stages (verify live availability).",
    owned:
      "Product-side engineering as reflected in the shipped Next.js app and public repository history; exact merge scope is for discussion.",
    architectureNotes: "Explicit pipeline stages; automation bounded by test and execution feedback where configured.",
    challenges: "Trust and transparency when the system touches reproduction and test execution.",
  },
  {
    id: "dr-niaraki",
    slug: "dr-niaraki-website",
    title: "Dr. Niaraki",
    projectType: "Content-backed academic and admin site",
    summary:
      "Next.js/Prisma site where public pages read published content from the database; protected flows support drafts, publish/restore, and a DOCX-based CV import/review path.",
    whyItMatters:
      "Evidence of editorial systems and long-term maintainability, not a one-off static professor page.",
    description:
      "A production site for a research profile: validated content entry, Zod-shaped boundaries, and admin/editor tooling so updates stay safe and repeatable. The implementation prioritizes a stable information architecture, controlled publishing, and defensible data handling over decorative novelty.",
    technologies: [
      ...nx,
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "Prisma", iconId: "prisma" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "Mammoth", iconId: "mammoth" },
    ],
    liveLink: "https://dr-niaraki-new.vercel.app/",
    githubLink: "https://github.com/azizbekdevuz/dr-niaraki-new",
    codeSnippet: `export const metadata = { title: "Research & profile" };
export default function Page() {
  return <ProfileLayout />;
}`,
    featured: true,
    featuredTier: "secondary",
    status: "live",
    order: 7,
    roleTracks: ["frontend", "fullstack"],
    proofTags: ["Editorial workflow", "CMS-style content", "Validation", "Solo build & deploy"],
    role: "Solo: implementation, information architecture, deployment",
    timeline: "2024–present",
    teamContext: "Client: academic profile (single stakeholder)",
    problem: "Keep a research-facing site accurate and easy to update without turning edits into ad-hoc HTML pushes.",
    outcome:
      "A live, database-backed site with an honest separation between public content and protected editing flows.",
    owned:
      "Build and deployment, content model, admin paths, and import/review steps around CV material where implemented in-repo.",
    architectureNotes: "Prisma/PostgreSQL; Zod validation at boundaries; server actions/routes for trusted mutations.",
    challenges: "Balancing simple public reading with safe authoring and recovery from content mistakes.",
  },
  {
    id: "nestar",
    slug: "nestar",
    title: "Nestar",
    projectType: "NestJS + GraphQL API (learning / breadth sample)",
    summary:
      "Modular Node.js service: GraphQL API, auth, and MongoDB persistence—useful as structured backend sample code.",
    whyItMatters: "Background depth when reviewers look past the Next.js entry points.",
    description:
      "A NestJS project organized as modules with GraphQL and JWT-flavored access patterns and MongoDB via Mongoose. It is a concise slice of how I model APIs and persistence when the task is not primarily a single-page app.",
    technologies: [
      { name: "Node.js", iconId: "nodejs" },
      { name: "NestJS", iconId: "nestjs" },
      { name: "GraphQL", iconId: "graphql" },
      { name: "MongoDB", iconId: "mongodb" },
      { name: "TypeScript", iconId: "typescript" },
      { name: "Apollo", iconId: "apollo" },
      { name: "Material UI", iconId: "mui" },
      { name: "CSS/SCSS", iconId: "scss" },
    ],
    githubLink: "https://github.com/azizbekdevuz/nestar",
    codeSnippet: `// Illustrative: Nest module graph
@Module({ imports: [GraphQLModule.forRoot({ autoSchemaFile: true }), MongooseModule.forRoot(process.env.MONGO_URI!)] })
export class AppModule {}`,
    featured: false,
    status: "live",
    order: 50,
    roleTracks: ["fullstack"],
    proofTags: ["NestJS", "GraphQL", "MongoDB"],
    role: "Solo author (reference implementation)",
    owned: "Project structure, schema, and auth-style patterns as in repository.",
    problem: "Provide a clear GraphQL and persistence baseline for extension.",
    outcome: "A working modular server foundation suitable to fork or teach from.",
    architectureNotes: "GraphQL module layout; Mongoose models; auth guards as patterns.",
  },
];
