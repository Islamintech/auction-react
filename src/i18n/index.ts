import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";
import ko from "./locales/ko.json";

export const SUPPORTED_LANGS = ["en", "ru", "uz", "ko"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
const initialLang = SUPPORTED_LANGS.includes(stored as Lang) ? (stored as Lang) : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
    ko: { translation: ko },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLang;
}

export default i18n;
