export const Locale = {
  en: "en",
  zh_tw: "zh_tw",
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];

export const isLocale = (value: unknown): value is Locale => {
  return Object.values(Locale).includes(value as Locale);
};
