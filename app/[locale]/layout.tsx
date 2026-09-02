import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {
  Space_Grotesk,
  Public_Sans,
  JetBrains_Mono,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import {routing} from "@/i18n/routing";
import TopBar from "@/components/TopBar";
import AmbientLayer from "@/components/AmbientLayer";
import SmoothScroll from "@/components/SmoothScroll";
import "../globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});
// Fuente japonesa: sin subset (glifos JP completos) y sin preload (archivo grande).
const jp = Zen_Kaku_Gothic_New({
  weight: ["500", "700", "900"],
  variable: "--font-zen-kaku",
  preload: false,
});

// El nonce de la CSP requiere render dinámico (se genera por petición).
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await props.params;
  const t = await getTranslations({locale, namespace: "Meta"});
  return {
    title: t("title"),
    description: t("description"),
    alternates: {languages: {es: "/es", ja: "/ja", en: "/en"}},
  };
}

export default async function LocaleLayout({children, params}: LayoutProps<"/[locale]">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable} ${jp.variable} h-full`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        <AmbientLayer />
        <NextIntlClientProvider>
          <TopBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
