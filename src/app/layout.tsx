import { ReactNode } from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Assistant, Roboto } from "next/font/google";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.scss";
import { EdgeStoreProvider } from "./lib/edgestore";

type Props = {
  children: ReactNode;
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

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <html className={`${roboto.variable} ${assistant.variable}`}>
      <body>
        <NextIntlClientProvider>
          <SessionProviderWrapper>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </SessionProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
