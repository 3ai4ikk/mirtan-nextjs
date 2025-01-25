import "@/app/globals.scss";
import { Assistant, Roboto } from "next/font/google";
import "@/app/styles/components/error.scss";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("Errors");
  return (
    <html>
      <body className={roboto.variable + " " + assistant.variable}>
        <main>
          <div className="error">
            <h3 className="error__title">{t("notFound") + " :("}</h3>
          </div>
        </main>
      </body>
    </html>
  );
};

export default NotFoundPage;
