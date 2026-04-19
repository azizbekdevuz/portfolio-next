import type { Project } from "@/models/Project";

const nx = [
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
];

/**
 * Source-aligned to stakeholder brief. No fabricated metrics.
 * [Manual] = fill when verified for publishing.
 */
export const projects: Project[] = [
  {
    id: "trainium",
    slug: "trainium",
    title: "Trainium",
    projectType: "Storefront + admin product",
    summary:
      "Large storefront and admin product: multilingual UX, role-aware flows, account areas, checkout, and notifications.",
    whyItMatters:
      "Flagship proof of real product scope—reusable UI, filters, product detail, admin workflows, and integration-heavy behavior beyond brochure sites.",
    description:
      "Non-trivial commerce product spanning customer-facing storefront and operational admin. Work emphasized keeping the UI coherent across locale routing, session-aware areas, payments/checkout surfaces, and real-time notification patterns—i.e. product architecture and flow integrity, not isolated UI slicing.",
    technologies: [
      ...nx,
      { name: "Tailwind", icon: "/icons/tailwind.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Nginx", icon: "/icons/nginx.svg" },
    ],
    liveLink: "https://trainium.shop/en",
    githubLink: "https://github.com/azizbekdevuz/trainium",
    codeSnippet: `// Representative: locale- and session-aware surface
export default async function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const session = await getSession();
  const product = await fetchProduct(params.slug, params.locale);
  return <ProductLayout product={product} role={session?.role} locale={params.locale} />;
}`,
    mockupImage: "",
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 1,
    roleTracks: ["fullstack", "frontend"],
    proofTags: ["Storefront + Admin", "Multilingual UX", "Checkout & notifications", "Product architecture"],
    role: "Full-stack / product engineering, Founder",
    timeline: "[Manual: dates]",
    teamContext: "[Manual if shareable]",
    problem:
      "Deliver a sizeable, shippable product with clear separation between storefront, admin, and account flows while keeping UX consistent across locales and roles.",
    outcome:
      "Production-minded release with coherent navigation, role-appropriate surfaces, and integration across payments, notifications, and multilingual routing.",
    owned:
      "Frontend architecture and product flows across storefront and admin; integration with auth/session, checkout-related UI, and notification experiences. [Manual: narrow to your lane if needed]",
    architectureNotes:
      "Next.js / React / TypeScript product structure; emphasis on route-level concerns, reusable UI, and predictable data flow into business actions.",
    challenges: "Keeping complexity navigable for users while multiple subsystems evolved in parallel.",
    metrics: undefined,
  },
  {
    id: "rumi-ai",
    slug: "rumi-ai",
    title: "Rumi AI",
    projectType: "Multilingual LLM companion product",
    summary:
      "English, Persian (RTL), and Korean surfaces with streaming responses, retrieval-aware behavior, and BFF-style backend integration.",
    whyItMatters:
      "Strong proof of multilingual UX (including RTL), streaming UI state, and tightening seams between Next.js routes and Python services—making separate parts feel like one product.",
    description:
      "LLM-backed companion with emphasis on integration: frontend delivery and product behavior across locales, BFF-style alignment with Python backends, auth/session cleanup, API contract discipline, and reliability-focused fixes—not generic chat chrome.",
    technologies: [...nx, { name: "Tailwind", icon: "/icons/tailwind.svg" }],
    githubLink: "https://github.com/azizbekdevuz/rumi-ai",
    codeSnippet: `// Streaming + locale-aware client boundary
"use client";
export function ChatPanel({ locale }: { locale: "en" | "fa" | "ko" }) {
  const { messages, pending } = useStreamingThread(locale);
  return <Thread dir={locale === "fa" ? "rtl" : "ltr"} messages={messages} status={pending} />;
}`,
    mockupImage: "",
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 2,
    roleTracks: ["frontend", "ai", "fullstack"],
    proofTags: ["Multilingual UX", "RTL", "Streaming UI", "BFF integration", "Reliability"],
    role: "Frontend & integration-focused product engineering",
    timeline: "[Manual: dates]",
    teamContext: "[Manual if shareable]",
    problem:
      "Ship a credible multilingual product where model output is one layer among auth, streaming, retrieval, and stable API contracts.",
    outcome:
      "Coherent UX across EN / FA (RTL) / KO with readable streaming behavior and improved alignment between web app and backend services.",
    owned:
      "Frontend routes and components, streaming UX, multilingual/RTL layout, BFF-facing integration and contract alignment, auth/session hardening. [Manual: adjust]",
    architectureNotes:
      "Separation between presentation and service boundaries; explicit handling of RTL, stream lifecycle, and error states.",
    challenges: "RTL typography and layout, partial failures during streams, and keeping latency perceptible but honest.",
    metrics: undefined,
  },
  {
    id: "fishlinic",
    slug: "fishlinic",
    title: "Fishlinic",
    projectType: "Real-time monitoring dashboard",
    summary:
      "Telemetry-forward dashboard: charts, summary metrics, and live signals with AI-enriched interpretation surfaced in the UI.",
    whyItMatters:
      "Best single proof of data-heavy interface work—clarity under changing data, not just chart decoration.",
    description:
      "Dashboard product for operational insight: real-time or high-churn telemetry, chart-based summaries, and flows oriented toward understanding and action. AI-enriched states sit alongside integration-heavy product behavior.",
    technologies: [...nx, { name: "Tailwind", icon: "/icons/tailwind.svg" }],
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
    mockupImage: "",
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 3,
    roleTracks: ["frontend", "fullstack", "ai"],
    proofTags: ["Dashboard UI", "Real-time signals", "Telemetry", "Data interpretation", "AI-enriched UI"],
    role: "Frontend / product UI on data-heavy surfaces",
    timeline: "[Manual: dates]",
    teamContext: "[Manual if shareable]",
    problem: "Make operational signal legible quickly as data updates and enrichment layers evolve.",
    outcome:
      "Dashboard surfaces tuned for hierarchy, scanability, and stable behavior when underlying feeds move.",
    owned:
      "Dashboard UX, charting and summary layouts, integration with data/AI-backed states. [Manual: adjust]",
    architectureNotes: "Next.js app structure with attention to update frequency and UI stability.",
    challenges: "Balancing density with clarity; avoiding misleading aggregates during partial updates.",
    metrics: undefined,
  },
  {
    id: "patchpilot",
    slug: "patchpilot",
    title: "PatchPilot",
    projectType: "AI workflow / bug-analysis product",
    summary:
      "Multi-step workflow from bug context through structured analysis, specs, execution feedback, and patch suggestions—not a thin chat wrapper.",
    whyItMatters:
      "Demonstrates workflow orchestration, structured outputs, and verification-minded engineering productivity tooling.",
    description:
      "Product shaped around analysis, test/spec artifacts, execution results, and patch proposals. Emphasis on structured pipelines and evaluation loops rather than unconstrained generation.",
    technologies: [...nx],
    liveLink: "https://patchpilot-frontend-beta.vercel.app",
    githubLink: "https://github.com/Prithwis-2023/patchpilot",
    codeSnippet: `type Stage = "intake" | "analyze" | "spec" | "execute" | "patch";
export function WorkflowRunner({ bugId }: { bugId: string }) {
  const { stage, artifacts } = useWorkflow(bugId);
  return <StageView stage={stage} artifacts={artifacts} />;
}`,
    mockupImage: "",
    featured: true,
    featuredTier: "primary",
    status: "live",
    order: 4,
    roleTracks: ["ai", "fullstack", "frontend"],
    proofTags: ["AI workflow", "Structured outputs", "Verification loop", "Engineering productivity"],
    role: "Product engineering on workflow UI & pipeline surfaces",
    timeline: "[Manual: dates]",
    teamContext: "Upstream repository under Prithwis-2023; confirm contribution narrative in interviews.",
    problem: "Turn messy bug context into a trustworthy, staged workflow engineers can follow.",
    outcome:
      "A guided multi-step experience with structured artifacts suitable for review—not only free-form text.",
    owned:
      "Engineering on workflow-oriented UI and product behavior. [Manual: add PR links / scope for public CV]",
    architectureNotes: "Stage-based UX with explicit handoffs between analysis, verification, and patch proposal.",
    challenges: "Keeping trust high when automation touches executable steps.",
    metrics: undefined,
  },
  {
    id: "gitguardian",
    slug: "gitguardian",
    title: "GitGuard Agent",
    projectType: "Recovery / diagnosis workflow",
    summary:
      "High-trust recovery-oriented flow: diagnosis, planning, and verification rather than unconstrained generation.",
    whyItMatters:
      "Secondary proof of structured reasoning and reliability-sensitive workflow design—useful for agentic tooling narratives.",
    description:
      "Workflow system emphasizing trustworthy behavior in recovery scenarios: structured diagnosis, planning steps, and verification. Designed around clarity and reversibility where it matters.",
    technologies: [...nx, { name: "Tailwind", icon: "/icons/tailwind.svg" }],
    liveLink: "https://gitguardian.online",
    githubLink: "https://github.com/azizbekdevuz/gitguardian",
    codeSnippet: `export function RecoveryPlan({ incidentId }: { incidentId: string }) {
  const plan = useVerifiedPlan(incidentId);
  return <PlanSteps steps={plan.steps} checks={plan.verification} />;
}`,
    mockupImage: "",
    featured: true,
    featuredTier: "secondary",
    status: "live",
    order: 5,
    roleTracks: ["ai", "fullstack"],
    proofTags: ["Recovery workflow", "Verification", "High-trust UX", "Agentic systems"],
    role: "Product / workflow engineering",
    timeline: "[Manual: dates]",
    teamContext: "[Manual if shareable]",
    problem: "Make recovery guidance dependable enough to act on.",
    outcome: "Structured stages with explicit verification hooks in the UX.",
    owned: "[Manual: your scope]",
    architectureNotes: "Workflow-first modeling with emphasis on checks, not open-ended output.",
    challenges: "Preventing overconfident automation in sensitive paths.",
    metrics: undefined,
  },
  {
    id: "proofboard",
    slug: "proofboard",
    title: "ProofBoard",
    projectType: "Trust / verification product (World ID–adjacent)",
    summary:
      "Human-verified Q&A context—useful signal for trust-sensitive flows without dominating the homepage narrative.",
    whyItMatters:
      "Differentiated exposure to verification-heavy product constraints; secondary to flagship commerce and AI workflow work.",
    description:
      "Experimentation in trust-sensitive product patterns including World ID–related verification flows. Position as supporting breadth, not primary flagship.",
    technologies: [...nx],
    liveLink: "https://proofboard.vercel.app",
    githubLink: "https://github.com/azizbekdevuz/proofboard",
    codeSnippet: `export default function VerifyFlow() {
  return <ProofStep onVerified={(proof) => persistSession(proof)} />;
}`,
    mockupImage: "",
    featured: true,
    featuredTier: "secondary",
    status: "live",
    order: 6,
    roleTracks: ["frontend", "fullstack"],
    proofTags: ["Verification flow", "Trust-sensitive UX", "World ID"],
    role: "[Manual: role label]",
    timeline: "[Manual: dates]",
    teamContext: "[Manual if shareable]",
    problem: "Explore verifiable identity constraints in a product-shaped UI.",
    outcome: "Shipped exploratory flows suitable for selective reviewer context.",
    owned: "[Manual: scope]",
    architectureNotes: "[Manual]",
    challenges: "Trust UX without hype; clear failure paths.",
    metrics: undefined,
  },
  {
    id: "dr-niaraki",
    slug: "dr-niaraki-website",
    title: "Dr. Niaraki",
    projectType: "Academic / professional site",
    summary: "Full ownership from build to deployment—clarity and maintainability over novelty.",
    whyItMatters: "Supporting proof of disciplined delivery for research stakeholders.",
    description:
      "Professional academic web presence with emphasis on information hierarchy, calm typography, and sustainable content structure.",
    technologies: [...nx],
    liveLink: "https://www.abolghasemniaraki.com",
    githubLink: "https://github.com/azizbekdevuz/dr-niaraki-website",
    codeSnippet: `export const metadata = { title: "Research & profile" };
export default function Page() {
  return <ProfileLayout />;
}`,
    mockupImage: "",
    featured: false,
    status: "live",
    order: 40,
    roleTracks: ["frontend"],
    proofTags: ["Content architecture", "Professional delivery"],
    role: "Solo build & deploy",
    owned: "Implementation, IA, deployment",
    problem: "Present research credentials without clutter.",
    outcome: "Stable, maintainable site for long-term updates.",
    architectureNotes: "Static-first Next.js patterns where appropriate.",
    metrics: undefined,
  },
  {
    id: "nestar",
    slug: "nestar",
    title: "Nestar",
    projectType: "NestJS + GraphQL API",
    summary: "Modular backend with GraphQL, auth, MongoDB—breadth for backend-heavy reviewers.",
    whyItMatters: "Shows structured server-side architecture beyond UI-only narratives.",
    description:
      "Backend-oriented codebase: NestJS modules, GraphQL schema, authentication, MongoDB/Mongoose, JWT. Use when reviewers care about API and service structure.",
    technologies: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "NestJS", icon: "/icons/nestjs.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "GraphQL", icon: "/icons/graphql.svg" },
      { name: "JWT", icon: "/icons/jwt.svg" },
      { name: "Mongoose", icon: "/icons/mongoose.svg" },
    ],
    githubLink: "https://github.com/azizbekdevuz/nestar",
    codeSnippet: `@Module({ imports: [GraphQLModule.forRoot({ autoSchemaFile: true }), MongooseModule.forRoot(process.env.MONGO_URI)] })
export class AppModule {}`,
    mockupImage: "",
    featured: false,
    status: "live",
    order: 50,
    roleTracks: ["fullstack"],
    proofTags: ["NestJS", "GraphQL", "Auth", "MongoDB"],
    role: "[Manual: ownership scope]",
    owned: "[Manual: modules / features owned]",
    problem: "Structured API layer with auth and persistence.",
    outcome: "Modular service foundation suitable for extension.",
    architectureNotes: "NestJS module boundaries, GraphQL schema evolution.",
    metrics: undefined,
  },
];
