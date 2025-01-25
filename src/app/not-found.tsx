import Header from "@/components/Header/Header";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "@/app/globals.scss";
import Footer from "@/components/Footer/Footer";
import { Assistant, Roboto } from "next/font/google";
import "@/app/styles/components/error.scss";

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

const NotFoundPage = async () => {
  const messages = await getMessages();
  const t = await getTranslations("Errors");
  return (
    <html>
      <body className={roboto.variable + " " + assistant.variable}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            <div className="error">
              <h3 className="error__title">{t("notFound") + " :("}</h3>
            </div>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default NotFoundPage;
