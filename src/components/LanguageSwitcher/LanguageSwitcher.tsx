import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: "uk" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("hlr-language", lang);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        type="button"
        onClick={() => changeLanguage("uk")}
        className={currentLanguage === "uk" ? "font-bold" : ""}
      >
        UA
      </button>

      <span>/</span>

      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={currentLanguage === "en" ? "font-bold" : ""}
      >
        EN
      </button>
    </div>
  );
}