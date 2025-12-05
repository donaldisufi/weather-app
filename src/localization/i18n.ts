import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./resources/en.json";
import noTranslations from "./resources/no.json";

const getInitialLanguage = (): string => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      return savedLanguage;
    }
  }
  return "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    no: {
      translation: noTranslations,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
