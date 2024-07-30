import { useTranslation } from "react-i18next";

const ToggleLang = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
  };
  return (
    <button className="lang-toggle-button" onClick={toggleLanguage}>
      {currentLanguage === "en" ? "عربي" : "En"}
    </button>
  );
};

export default ToggleLang;
