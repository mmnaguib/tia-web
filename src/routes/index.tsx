import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home/Home";
import Categories from "../pages/Categories/Categories";
import Login from "../pages/Auth/Login";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Auth/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={<Home />} />
      <Route path="categories" element={<Categories />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

export default router;
