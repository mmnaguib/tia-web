import { useTranslation } from "react-i18next";
import "./auth.scss";
import ToggleLang from "../../components/ToggleLang";
import ToggleTheme from "../../components/ToggleTheme";
import { Link } from "react-router-dom";
const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="langATheme">
        <ToggleLang />
        <ToggleTheme />
      </div>
      <div className="authForm">
        <i className="fa fa-user"></i>
        <h2>{t("welcomeToOurStore")}</h2>
        <form autoComplete="off">
          <label className="formLabel" htmlFor="username">
            {t("email")}:
          </label>
          <input type="email" className="formInput" id="username" />
          <label className="formLabel" htmlFor="password">
            {t("password")}:
          </label>
          <input type="password" className="formInput" id="password" />
          <div className="btnContent">
            <button className="formBtn" type="submit">
              {t("save")}
            </button>
          </div>
          <div className="haveAcc">
            <span>{t("don'tHaveAccount")}</span>&nbsp;
            <Link to="/register">{t("register")}</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
