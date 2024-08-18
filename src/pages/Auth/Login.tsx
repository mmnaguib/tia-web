import { useTranslation } from "react-i18next";
import "./auth.scss";
import ToggleLang from "../../components/ToggleLang";
import ToggleTheme from "../../components/ToggleTheme";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import { ILoginFormData } from "../../interfaces";
import InputErrorMessage from "../../components/InputErrorMessage";
import { UseAppDispatch } from "../../app/hooks";
import actAuthLogin from "../../app/act/Auth/actLogin";
import toast from "react-hot-toast";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: ILoginFormData) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("Welcome, You Are Successfully Login !");
      });
  };
  return (
    <>
      <div className="langATheme">
        <ToggleLang />
        <ToggleTheme />
      </div>
      <div className="authForm">
        <i className="fa fa-user"></i>
        <h2>{t("welcomeToOurStore")}</h2>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="formLabel" htmlFor="username">
              {t("email")}:
            </label>
            <input
              type="email"
              className="formInput"
              id="username"
              {...register("email")}
            />
            {errors["email"] && (
              <InputErrorMessage msg={errors["email"].message} />
            )}
          </div>
          <div>
            <label className="formLabel" htmlFor="password">
              {t("password")}:
            </label>
            <input
              type="password"
              className="formInput"
              id="password"
              {...register("password")}
            />
            {errors["password"] && (
              <InputErrorMessage msg={errors["password"].message} />
            )}
          </div>
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
