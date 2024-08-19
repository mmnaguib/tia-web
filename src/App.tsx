import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loadLanguageStyles from "./utils/loadLanguageStyles";
import { useEffect } from "react";
import "./assets/styles/publicStyle.scss";
import AppRoute from "./routes";
const App = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    loadLanguageStyles(currentLanguage);
  }, [currentLanguage]);
  return (
    <div className={`app-container`}>
      <RouterProvider router={AppRoute()} />
    </div>
  );
};

export default App;
