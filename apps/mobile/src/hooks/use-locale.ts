import { useCallback, useMemo, useTransition } from "react";

import { useLocales } from "expo-localization";

import type { Locale } from "@/enums/locale.enum";
import i18n from "@/translations";
import { getLng, setLng, codeToLocale } from "@/translations/utils";

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
