import type { Metadata } from "next";
import { Roboto, Assistant } from "next/font/google";
import "./globals.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable + " " + assistant.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
