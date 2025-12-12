import { Locale } from "@/enums/locale.enum";
import { kv } from "@/libs/storage/kv";

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
