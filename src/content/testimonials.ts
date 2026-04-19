/** Curated credibility quotes — short, recruiter-scannable. Source context preserved. */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  context: string;
  /** Avatar initials (2 chars) */
  initials: string;
  /** Avatar image URL */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Professional, fast execution on a personal business site—stronger than I expected, with clear guidance throughout.",
    name: "Karimov J.",
    context: "Business owner · Website delivery",
    initials: "KJ",
    avatar: "/avatars/karimov.webp",
  },
  {
    id: "2",
    quote:
      "Process was clear end-to-end; the outcome exceeded expectations. I would work with Azizbek again without hesitation.",
    name: "Norkuziev O.",
    context: "Dentist · Digital presence",
    initials: "ON",
    avatar: "/avatars/norkuziev.webp",
    },
];
