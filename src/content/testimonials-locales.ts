import type { Locale } from "@/i18n/config";
import type { Testimonial } from "./testimonials";

const testimonialsByLocale: Record<Locale, Testimonial[]> = {
  en: [
    {
      id: "1",
      quote:
        "Professional, fast execution on a personal business site—clear guidance throughout, stronger than I expected.",
      name: "Karimov J.",
      context: "Business owner · Website delivery",
      initials: "KJ",
      avatar: "/avatars/karimov.webp",
    },
    {
      id: "2",
      quote:
        "End-to-end process was transparent; the outcome beat expectations. I would work with Azizbek again without hesitation.",
      name: "Norkuziev O.",
      context: "Dentist · Digital presence",
      initials: "ON",
      avatar: "/avatars/norkuziev.webp",
    },
  ],
  ko: [
    {
      id: "1",
      quote:
        "개인 사업 사이트를 빠르고 전문적으로 완성해 주셨고, 과정 내내 방향이 분명했습니다. 기대 이상이었습니다.",
      name: "Karimov J.",
      context: "사업자 · 웹사이트 구축",
      initials: "KJ",
      avatar: "/avatars/karimov.webp",
    },
    {
      id: "2",
      quote:
        "처음부터 끝까지 소통이 명확했고 결과가 기대를 넘었습니다. 기회가 되면 다시 협업하고 싶습니다.",
      name: "Norkuziev O.",
      context: "치과 의사 · 디지털 채널",
      initials: "ON",
      avatar: "/avatars/norkuziev.webp",
    },
  ],
  uz: [
    {
      id: "1",
      quote:
        "Biznes saytimni professional va tez yetkazib berdi, jarayon bo‘yicha yo‘l-yo‘riq aniq edi — kutilganidan ham yaxshi natija.",
      name: "Karimov J.",
      context: "Tadbirkor · veb-sayt",
      initials: "KJ",
      avatar: "/avatars/karimov.webp",
    },
    {
      id: "2",
      quote:
        "Jarayon shaffof, natija kutilganidan yuqori bo‘ldi. Imkoniyat bo‘lsa, yana hamkorlik qilishga tayyorman.",
      name: "Norkuziev O.",
      context: "Stomatolog · raqamli ishtirok",
      initials: "ON",
      avatar: "/avatars/norkuziev.webp",
    },
  ],
};

export function getTestimonialsForLocale(locale: Locale): Testimonial[] {
  return testimonialsByLocale[locale] ?? testimonialsByLocale.en;
}
