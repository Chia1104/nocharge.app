import { useCallback, useMemo } from "react";

import { useLocales } from "expo-localization";
import * as SecureStore from "expo-secure-store";

import { Locale } from "@/enums/locale.enum";
import i18n from "@/translations";

export const codeToLocale = (code: string): Locale => {
  switch (code) {
    case Locale.en:
    case "en":
      return Locale.en;
    case Locale.zh_tw:
    case "zh":
      return Locale.zh_tw;
    default:
      return Locale.en;
  }
};

export const useLocale = () => {
  const locales = useLocales();
  const locale = useMemo(() => {
    const savedLng = SecureStore.getItem("lng");
    if (savedLng) {
      return codeToLocale(savedLng);
    }
    return codeToLocale(locales[0].languageCode ?? "en");
  }, [locales]);
  const setLocale = useCallback((locale: Locale) => {
    SecureStore.setItem("lng", locale);
    i18n.changeLanguage(locale);
  }, []);
  return [locale, setLocale] as const;
};
