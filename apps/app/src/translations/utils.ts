import { useLocales } from "expo-localization";

import { Locale } from "@/enums/locale.enum";

export const codeToLocale = (code: string): Locale => {
  switch (code) {
    case "en":
      return Locale.en;
    case "zh":
      return Locale.zh_tw;
    default:
      return Locale.en;
  }
};

export const useLocale = (): Locale => {
  const locales = useLocales();
  return codeToLocale(locales[0].languageCode ?? "en");
};
