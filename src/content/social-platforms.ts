import type { BrandIconId } from "@/lib/brand-icons";
import { siteProfile } from "./site";

/**
 * Canonical social platforms: each `url` is bound to `siteProfile.links` at module load.
 * Desktop (`SocialLinks`) and mobile contact map from this list so targets stay aligned.
 */
export const SOCIAL_PLATFORM_LIST: readonly {
  id: string;
  name: string;
  iconId: BrandIconId;
  url: string;
  cardBlurb: string;
}[] = [
  {
    id: "github",
    name: "GitHub",
    iconId: "github",
    url: siteProfile.links.github,
    cardBlurb: "Code and contributions",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    iconId: "linkedin",
    url: siteProfile.links.linkedin,
    cardBlurb: "Professional profile",
  },
  {
    id: "telegram",
    name: "Telegram",
    iconId: "telegram",
    url: siteProfile.links.telegram,
    cardBlurb: "Direct message",
  },
  {
    id: "linktree",
    name: "Linktree",
    iconId: "linktree",
    url: siteProfile.links.linktree,
    cardBlurb: "Other links",
  },
];
