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
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

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

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

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
