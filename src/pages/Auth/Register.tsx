import { useTranslation } from "react-i18next";
import ToggleLang from "../../components/ToggleLang";
import ToggleTheme from "../../components/ToggleTheme";
import "./auth.scss";
import { Link } from "react-router-dom";
const Register = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
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
          <>
            <label className="formLabel" htmlFor="password">
              {t("password")}:
            </label>
            <input type="password" className="formInput" id="password" />
          </>
          <>
            <label className="formLabel" htmlFor="password">
              {t("confirmpassword")}:
            </label>
            <input type="password" className="formInput" id="password" />
          </>
          <>
            <label className="formLabel" htmlFor="firstname">
              {t("firstName")}:
            </label>
            <input type="text" className="formInput" id="firstname" />
          </>
          <>
            <label className="formLabel" htmlFor="lastName">
              {t("lastName")}:
            </label>
            <input type="text" className="formInput" id="lastName" />
          </>
          <>
            <label className="formLabel" htmlFor="address">
              {t("address")}:
            </label>
            <textarea id="address" rows={5}></textarea>
          </>
          <>
            <label className="formLabel" htmlFor="phone">
              {t("phone")}:
            </label>
            <input type="text" className="formInput" id="phone" />
          </>
          <div className="btnContent">
            <button className="formBtn" type="submit">
              {t("save")}
            </button>
          </div>
          <div className="haveAcc">
            <span>{t("doHaveAccount")}</span>&nbsp;
            <Link to="/">{t("login")}</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
