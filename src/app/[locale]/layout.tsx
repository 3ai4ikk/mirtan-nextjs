import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Assistant, Roboto } from "next/font/google";

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

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${roboto.variable} ${assistant.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
