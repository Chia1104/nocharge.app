import { useCallback, useMemo, useTransition } from "react";

import { useLocales } from "expo-localization";

import { Locale } from "@/enums/locale.enum";
import i18n from "@/translations";
import { storage } from "@/utils/storage";

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
  const [isPending, startTransition] = useTransition();
  const locales = useLocales();

  const locale = useMemo(() => {
    const savedLng = storage.getString("lng");
    if (savedLng) {
      return codeToLocale(savedLng);
    }
    return codeToLocale(locales[0].languageCode ?? "en");
  }, [locales]);

  const setLocale = useCallback((locale: Locale) => {
    startTransition(async () => {
      storage.set("lng", locale);
      await i18n.changeLanguage(locale);
    });
  }, []);

  return [locale, setLocale, isPending] as const;
};
