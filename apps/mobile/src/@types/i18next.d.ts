// import the original type declarations
import "i18next";

import type global from "@/translations/resources/en/global.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "global";
    // custom resources type
    resources: {
      global: typeof global;
    };
  }
}
