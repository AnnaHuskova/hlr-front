import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { uk } from "./locales/uk";
import { en } from "./locales/en";

const savedLanguage = localStorage.getItem("hlr-language") || "uk";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uk,
      en,
    },

    lng: savedLanguage,
    fallbackLng: "uk",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;