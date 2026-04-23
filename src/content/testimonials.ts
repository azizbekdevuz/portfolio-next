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
