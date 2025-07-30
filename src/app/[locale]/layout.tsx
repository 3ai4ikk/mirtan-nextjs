import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {ReactNode} from "react";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import "@/app/globals.scss";
import {Assistant, Roboto} from "next/font/google";
import {Metadata} from "next";
import {cn} from "../lib/utils";
import {Analytics} from "@vercel/analytics/next"

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
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

export default async function RootLayout({children, params}: Props) {
  const {locale} = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) return notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale}>
    <body className={cn(roboto.variable, assistant.variable)}>
    <Analytics />
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
