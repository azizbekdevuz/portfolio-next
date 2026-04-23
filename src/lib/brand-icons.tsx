import type { IconType } from "react-icons";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAmazonwebservices,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiFigma,
  SiFramer,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglechrome,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiOpenjdk,
  SiLinktree,
  SiLinkedin,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiVercel,
  SiTurborepo,
  SiWebauthn,
  SiOllama,
  SiSqlalchemy,
  SiArduino, 
  SiMaterialdesign, 
  SiSocketdotio,
  SiJsonwebtokens, 
  SiZod,
  SiOpencv,
  SiApollographql,
  SiMui,
} from "react-icons/si";
import { TbApi, TbDatabase, TbServer, TbTable, TbTools, TbUser,TbAutomation } from "react-icons/tb";
import { MdOutlineLayers, MdSettingsRemote } from "react-icons/md";
import { AiOutlinePartition, AiOutlineRobot } from "react-icons/ai";
import { HiTerminal } from "react-icons/hi";
import { IoLogoNpm } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { GiMammoth } from "react-icons/gi";
import { BsFiletypeScss } from "react-icons/bs";
/**
 * Single registry: brand / technology icons from react-icons (Simple Icons + Tabler for generic API).
 * Add new tools here only — no public asset paths.
 */
const BRAND_ICONS = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  html5: SiHtml5,
  css3: SiCss3,
  nodejs: SiNodedotjs,
  fastapi: SiFastapi,
  python: SiPython,
  /** REST / HTTP JSON APIs — not a specific vendor logo */
  rest: TbApi,
  graphql: SiGraphql,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  mongodb: SiMongodb,
  javascript: SiJavascript,
  java: SiOpenjdk,
  cpp: SiCplusplus,
  git: SiGit,
  docker: SiDocker,
  github: SiGithub,
  githubactions: SiGithubactions,
  aws: SiAmazonwebservices,
  vercel: SiVercel,
  nginx: SiNginx,
  nestjs: SiNestjs,
  framer: SiFramer,
  figma: SiFigma,
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
  linkedin: SiLinkedin,
  telegram: SiTelegram,
  linktree: SiLinktree,
  system: AiOutlinePartition,
  entityrelationshipdiagram: TbTable,
  datamodeling: TbDatabase,
  user: TbUser,
  maintenanceanddebugging: TbTools,
  deploymentandproduction: TbServer,
  /** Fallback when a stack row needs a “platform / generic web” mark */
  web: SiGooglechrome,
  uiux: MdOutlineLayers,
  materialui: SiMaterialdesign,
  turborepo: SiTurborepo,
  socketio: SiSocketdotio,
  nextauth: SiWebauthn,
  jwt: SiJsonwebtokens ,
  llm: SiOllama,
  rag: AiOutlineRobot ,
  sqlalchemy: SiSqlalchemy,
  arduino: SiArduino,
  iot: MdSettingsRemote,
  zod: SiZod,
  cli: HiTerminal,
  npm: IoLogoNpm,
  playwright: TbAutomation,
  opencv: SiOpencv,
  decord: FaVideo,
  mammoth: GiMammoth,
  apollo: SiApollographql,
  mui: SiMui,
  scss: BsFiletypeScss,
} as const satisfies Record<string, IconType>;

export type BrandIconId = keyof typeof BRAND_ICONS;

/**
 * Theme-aware classes for `currentColor` on vector icons.
 * Tuned for this portfolio’s light page + deep navy dark UI.
 */
const BRAND_TONE: Record<BrandIconId, string> = {
  react: "text-[#61DAFB] drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(97,218,251,0.28)]",
  nextjs: "text-slate-900 dark:text-white",
  typescript: "text-[#3178C6] dark:text-[#6BA3E6]",
  tailwindcss: "text-[#06B6D4] dark:text-[#22D3EE]",
  html5: "text-[#E34F26] dark:text-[#FB923C]",
  css3: "text-[#1572B6] dark:text-[#5BABF0]",
  nodejs: "text-[#339933] dark:text-[#4ADE80]",
  fastapi: "text-[#009688] dark:text-[#2DD4BF]",
  python: "text-[#3776AB] dark:text-[#7AB8E8]",
  rest: "text-sky-600 dark:text-sky-300",
  graphql: "text-[#E10098] dark:text-[#F0ABFC]",
  postgresql: "text-[#4169E1] dark:text-[#7BA0F7]",
  prisma: "text-[#0C344B] dark:text-[#C4B5FD]",
  mongodb: "text-[#47A248] dark:text-[#86EFAC]",
  javascript: "text-[#C9A700] dark:text-[#F5E12C]",
  java: "text-[#E76F00] dark:text-[#FBBF24]",
  cpp: "text-[#00599C] dark:text-[#5BC0F8]",
  git: "text-[#F05032] dark:text-[#FCA5A5]",
  docker: "text-[#2496ED] dark:text-[#60A5FA]",
  github: "text-slate-900 dark:text-slate-100",
  githubactions: "text-[#2088FF] dark:text-[#7EB8FF]",
  aws: "text-[#FF9900] dark:text-[#FBBF24]",
  vercel: "text-slate-900 dark:text-white",
  nginx: "text-[#009639] dark:text-[#4ADE80]",
  nestjs: "text-[#E0234E] dark:text-[#FB7185]",
  framer: "text-[#0055FF] dark:text-[#6BA3FF]",
  figma: "text-[#F24E1E] dark:text-[#FCA5A5]",
  photoshop: "text-[#31A8FF] dark:text-[#7AC8FF]",
  illustrator: "text-[#FF9A00] dark:text-[#FDBA4A]",
  linkedin: "text-[#0A66C2] dark:text-[#5EB2FF]",
  telegram: "text-[#26A5E4] dark:text-[#5ECFFF]",
  linktree: "text-[#39E09B] dark:text-[#5EE8C4]",
  web: "text-[#4285F4] dark:text-[#93C5FD]",
  system: "text-[#007ACC] dark:text-[#5EB2FF]",
  entityrelationshipdiagram: "text-[#007ACC] dark:text-[#5EB2FF]",
  datamodeling: "text-[#007ACC] dark:text-[#5EB2FF]",
  user: "text-[#007ACC] dark:text-[#5EB2FF]",
  maintenanceanddebugging: "text-[#007ACC] dark:text-[#5EB2FF]",
  deploymentandproduction: "text-[#007ACC] dark:text-[#5EB2FF]",
  uiux: "text-[#007ACC] dark:text-[#5EB2FF]",
  materialui: "text-[#007ACC] dark:text-[#5EB2FF]",
  turborepo: "text-[#007ACC] dark:text-[#5EB2FF]",
  socketio: "text-[#007ACC] dark:text-[#5EB2FF]",
  nextauth: "text-[#007ACC] dark:text-[#5EB2FF]",
  jwt: "text-[#007ACC] dark:text-[#5EB2FF]",
  llm: "text-[#007ACC] dark:text-[#5EB2FF]",
  rag: "text-[#007ACC] dark:text-[#5EB2FF]",
  sqlalchemy: "text-[#007ACC] dark:text-[#5EB2FF]",
  arduino: "text-[#007ACC] dark:text-[#5EB2FF]",
  iot: "text-[#007ACC] dark:text-[#5EB2FF]",
  zod: "text-[#007ACC] dark:text-[#5EB2FF]",
  cli: "text-[#007ACC] dark:text-[#5EB2FF]",
  npm: "text-[#007ACC] dark:text-[#5EB2FF]",
  playwright: "text-[#007ACC] dark:text-[#5EB2FF]",
  opencv: "text-[#007ACC] dark:text-[#5EB2FF]",
  decord: "text-[#007ACC] dark:text-[#5EB2FF]",
  mammoth: "text-[#007ACC] dark:text-[#5EB2FF]",
  apollo: "text-[#007ACC] dark:text-[#5EB2FF]",
  mui: "text-[#007ACC] dark:text-[#5EB2FF]",
  scss: "text-[#007ACC] dark:text-[#5EB2FF]",
};

const NEUTRAL_TONE = "text-slate-700 dark:text-slate-200";
const MUTED_TONE = "text-muted dark:text-slate-400";

export type BrandIconVisualTone = "brand" | "neutral" | "muted";

const PIXEL_BY_SIZE: Record<"xs" | "sm" | "md" | "lg", number> = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 32,
};

function classes(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

function toneClass(id: BrandIconId, visualTone: BrandIconVisualTone): string {
  if (visualTone === "neutral") return NEUTRAL_TONE;
  if (visualTone === "muted") return MUTED_TONE;
  return BRAND_TONE[id];
}

export function BrandIcon({
  id,
  size = "md",
  sizePx,
  visualTone = "brand",
  className = "",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = true,
}: {
  id: BrandIconId;
  size?: keyof typeof PIXEL_BY_SIZE;
  sizePx?: number;
  /** `brand` = official hues; `neutral` / `muted` for exceptions */
  visualTone?: BrandIconVisualTone;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}) {
  const Icon = BRAND_ICONS[id] as IconType;
  const px = sizePx ?? PIXEL_BY_SIZE[size];
  return (
    <Icon
      className={classes(toneClass(id, visualTone), className)}
      size={px}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  );
}

