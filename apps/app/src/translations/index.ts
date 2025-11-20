import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { storage } from "@/utils/storage";

import * as resources from "./resources";

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[0];

const init = () => {
  let savedLng = storage.getString("lng");
  if (!savedLng) {
    savedLng = getLocales()[0].languageCode ?? "en";
  }
  i18n
    .use(initReactI18next)
    .init({
      ns,
      defaultNS,
      resources: Object.fromEntries(Object.entries(resources)),
      lng: "zh_tw",
      fallbackLng: "zh_tw",
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      compatibilityJSON: "v4",
    })
    .catch(console.error);
};

init();

export default i18n;
