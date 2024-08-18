import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";
import ToggleLang from "../ToggleLang";
import ToggleTheme from "../ToggleTheme";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import { authLogout } from "../../app/slices/AuthSlice";

const Navbar = () => {
  const { items } = UseAppSelector((state) => state.cart);
  const { t } = useTranslation();
  const dispatch = UseAppDispatch();
  const { token } = UseAppSelector((state) => state.auth);
  const isAllowed = token ? true : false;
  console.log(isAllowed);
  return (
    <div className="navbar">
      <div className="right">{t("tia")}</div>
      <div className="middle">
        <ul className="links">
          <li>
            <NavLink to="/">{t("home")}</NavLink>
          </li>
          <li>
            <NavLink to="/admin">{t("admin")}</NavLink>
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
        {!isAllowed ? (
          <>
            <NavLink className="loginBtns" to="/login">
              {t("login")}
            </NavLink>
            <NavLink className="loginBtns" to="/register">
              {t("register")}
            </NavLink>
          </>
        ) : (
          <i className="fa fa-user" onClick={() => dispatch(authLogout())}></i>
        )}

        <ToggleTheme />
        <ToggleLang />
        <Link to="/cart" className="shoppingCartDiv">
          <i className="fa fa-shopping-cart"></i>
          <span>{items.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
