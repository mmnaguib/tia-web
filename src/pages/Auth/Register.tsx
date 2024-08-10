import { useTranslation } from "react-i18next";
import ToggleLang from "../../components/ToggleLang";
import ToggleTheme from "../../components/ToggleTheme";
import "./auth.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterFormData } from "../../interfaces";
import { registerSchema } from "./validation";
import { Col, Row } from "react-bootstrap";
import InputErrorMessage from "../../components/InputErrorMessage";
const Register = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = (data: IRegisterFormData) => console.log(data);
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
          <Row>
            <Col md="6">
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
            </Col>
            <Col md="6">
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
            </Col>
            <Col md="6">
              <label className="formLabel" htmlFor="confirmpasswords">
                {t("confirmpassword")}:
              </label>
              <input
                type="password"
                className="formInput"
                id="confirmpassword"
                {...register("confirmpassword")}
              />
              {errors["confirmpassword"] && (
                <InputErrorMessage msg={errors["confirmpassword"].message} />
              )}
            </Col>
            <Col md="6">
              <label className="formLabel" htmlFor="firstname">
                {t("firstName")}:
              </label>
              <input
                type="text"
                className="formInput"
                id="firstname"
                {...register("firstname")}
              />
              {errors["firstname"] && (
                <InputErrorMessage msg={errors["firstname"].message} />
              )}
            </Col>
            <Col md="6">
              <label className="formLabel" htmlFor="lastName">
                {t("lastName")}:
              </label>
              <input
                type="text"
                className="formInput"
                id="lastName"
                {...register("lastname")}
              />
              {errors["lastname"] && (
                <InputErrorMessage msg={errors["lastname"].message} />
              )}
            </Col>
            <Col md="6">
              <label className="formLabel" htmlFor="address">
                {t("address")}:
              </label>
              <input
                type="text"
                className="formInput"
                id="address"
                {...register("address")}
              />
              {errors["address"] && (
                <InputErrorMessage msg={errors["address"].message} />
              )}
            </Col>
            <Col md="6">
              <label className="formLabel" htmlFor="phone">
                {t("phone")}:
              </label>
              <input
                type="text"
                className="formInput"
                id="phone"
                {...register("phone")}
              />
              {errors["phone"] && (
                <InputErrorMessage msg={errors["phone"].message} />
              )}
            </Col>
            <Col md="6">
              <label className="formLabel" htmlFor="phone">
                {t("image")}:
              </label>
              <input
                type="file"
                className=""
                id="image"
                accept=".jpg, .jpeg, .png"
              />
            </Col>
          </Row>
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
