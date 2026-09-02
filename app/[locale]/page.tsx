import {setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import Hero from "@/components/Hero";
import Disciplines from "@/components/Disciplines";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({params}: PageProps<"/[locale]">) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="relative z-[1]">
      <Hero />
      <Disciplines />
      <Work />
      <Contact />
    </main>
  );
}
