import "@/app/styles/components/error.scss";
import { getTranslations } from "next-intl/server";

const NotFoundPage = async () => {
  const t = await getTranslations("Errors");
  return (
    <html>
      <body>
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
