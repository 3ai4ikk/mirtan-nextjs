import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={"1"}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          1
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
