import type { Metadata } from "next";
import { Roboto, Assistant } from "next/font/google";
import "@/app/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-family-base",
  subsets: ["cyrillic", "latin"],
});

const assistant = Assistant({
  weight: ["400", "700"],
  variable: "--font-family-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mirtan",
  description: "Mirtan website",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={roboto.variable + " " + assistant.variable}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
