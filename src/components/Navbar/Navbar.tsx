import { NavLink } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";
import ToggleLang from "../ToggleLang";
import ToggleTheme from "../ToggleTheme";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <div className="navbar">
      <div className="right">{t("tia")}</div>
      <div className="middle">
        <ul className="links">
          <li>
            <NavLink to="/">{t("home")}</NavLink>
          </li>
          <li>
            <NavLink to="/products">{t("products")}</NavLink>
          </li>
          <li>
            <NavLink to="/categories">{t("categories")}</NavLink>
          </li>
          <li>
            <NavLink to="/contact">{t("contact")}</NavLink>
          </li>
        </ul>
      </div>
      <div className="left">
        <i className="fa fa-user"></i>
        <ToggleTheme />
        <ToggleLang />
      </div>
    </div>
  );
};

export default Navbar;
