import { useTranslation } from "react-i18next";
import ToggleLang from "../../components/ToggleLang";
import ToggleTheme from "../../components/ToggleTheme";
import "./auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterFormData } from "../../interfaces";
import { registerSchema } from "./validation";
import { Col, Row, Spinner } from "react-bootstrap";
import InputErrorMessage from "../../components/InputErrorMessage";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import actAuthRegister from "../../app/act/Auth/actRegister";
import toast from "react-hot-toast";
import ErrorMsg from "../../components/ErrorMsg";

const Register = () => {
  const { t } = useTranslation();
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = UseAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = (data: IRegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("image", data.image[0]);
      console.log(data.image[0]);
      dispatch(actAuthRegister(formData))
        .then(() => {
          navigate("/login");
          toast.success(t("registrationSuccess"));
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    } catch (err) {
      console.log("Error message: " + err);
    }
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
                autoComplete="new-password"
              />
              {errors["password"] && (
                <InputErrorMessage msg={errors["password"].message} />
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
              <label className="formLabel" htmlFor="image">
                {t("image")}:
              </label>
              <input
                type="file"
                className=""
                id="image"
                accept=".jpg, .jpeg, .png"
                {...register("image")}
              />
              {errors["image"] && (
                <InputErrorMessage msg={errors["image"].message} />
              )}
            </Col>
          </Row>
          <div className="btnContent">
            <button className="formBtn" type="submit">
              {loading === "pending" ? <Spinner /> : t("save")}
            </button>
          </div>
          <div className="haveAcc">
            <span>{t("doHaveAccount")}</span>&nbsp;
            <Link to="/login">{t("login")}</Link>
          </div>
        </form>

        {error && <ErrorMsg error={error} />}
      </div>
    </>
  );
};

export default Register;
