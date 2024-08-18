import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@[a-zA]+\.com$/,
    //   "Email must be in the format: user@example.com"
    // )
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  firstname: yup.string().required("firstname is required"),
  image: yup.mixed().required("A file is required"),

  lastname: yup.string().required("lastname is required"),
  address: yup.string().required("address is required"),
  phone: yup.string().required("phone is required"),
});
