import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeviceDetectionWrapper from "@/components/DeviceDetectionWrapper";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getMessages } from "@/messages/load";

const siteUrl = "https://portfolio-next-silk-two.vercel.app/";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }, { locale: "uz" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale: Locale = isLocale(loc) ? loc : defaultLocale;
  const m = await getMessages(locale);

  return {
    title: m.meta.title,
    description: m.meta.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        ko: `${siteUrl}/ko`,
        uz: `${siteUrl}/uz`,
        "x-default": `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      countryName: "South Korea",
      locale: locale === "ko" ? "ko_KR" : locale === "uz" ? "uz_UZ" : "en_US",
      url: `${siteUrl}/${locale}`,
      title: m.meta.ogTitle,
      description: m.meta.ogDescription,
      siteName: "Azizbek Arzikulov",
      images: [
        {
          url: "/assets/img/og-image.png",
          width: 1200,
          height: 630,
          alt: "Azizbek Arzikulov — portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.meta.twitterTitle,
      description: m.meta.twitterDescription,
      images: ["/assets/img/twitter-image.png"],
    },
    keywords: [
      "full-stack product engineer",
      "Next.js",
      "TypeScript",
      "React",
      "integration",
      "portfolio",
      "Azizbek Arzikulov",
      "Seoul",
    ],
    authors: [{ name: "Azizbek Arzikulov" }],
    creator: "Azizbek Arzikulov",
    publisher: "Azizbek Arzikulov",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) notFound();

  const messages = await getMessages(loc);

  return (
    <I18nProvider locale={loc} messages={messages}>
      <DeviceDetectionWrapper>{children}</DeviceDetectionWrapper>
    </I18nProvider>
  );
}
