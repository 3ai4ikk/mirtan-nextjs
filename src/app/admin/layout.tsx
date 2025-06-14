import { ReactNode } from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "@/app/globals.scss";
import { EdgeStoreProvider } from "@/app/lib/edgestore";
import { Metadata } from "next";
import { Assistant, Roboto } from "next/font/google";
import { cn } from "../lib/utils";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Mirtan | Admin Panel",
  description: "Mirtan admin panel",
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

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body className={cn(roboto.variable, assistant.variable)}>
        <SessionProviderWrapper>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
