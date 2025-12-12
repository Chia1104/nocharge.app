import { useCallback, useMemo, useTransition } from "react";

import { useLocales } from "expo-localization";

import { Locale } from "@/enums/locale.enum";
import { kv } from "@/libs/storage/kv";
import i18n from "@/translations";

export const getLng = () => kv.getString("lng");

export const setLng = (lng: string) => kv.set("lng", lng);

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
    const savedLng = getLng();
    if (savedLng) {
      return codeToLocale(savedLng);
    }
    return codeToLocale(locales?.[0]?.languageCode ?? "en");
  }, [locales]);

  const setLocale = useCallback((locale: Locale) => {
    startTransition(async () => {
      setLng(locale);
      await i18n.changeLanguage(locale);
    });
  }, []);

  return [locale, setLocale, isPending] as const;
};
