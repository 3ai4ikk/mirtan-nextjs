import "@/app/globals.scss";
import "@/app/styles/components/error.scss";
import { useTranslations } from "next-intl";

const NotFoundPage = () => {
  const t = useTranslations("Errors");
  return (
    <main>
      <div className="error">
        <h3 className="error__title">{t("notFound") + " :("}</h3>
      </div>
    </main>
  );
};

export default NotFoundPage;
