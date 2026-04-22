import { notFound } from "next/navigation";
import HomeContent from "@/components/HomeContext";
import { buildHomeDataWithOverrides } from "@/content/merge-localized";
import { isLocale } from "@/i18n/config";
import { getLocalizedOverrides } from "@/messages/load";

export const revalidate = 3600;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }, { locale: "uz" }];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const overrides = await getLocalizedOverrides(locale);
  const data = buildHomeDataWithOverrides(overrides);

  return <HomeContent data={data} />;
}
