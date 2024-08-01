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
import Products from "../pages/Products/Products";
import SingleProduct from "../pages/Products/SingleProduct";
import Cart from "../pages/Cart/Cart";
import Admin from "../Admin/Admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="admin" element={<Admin />} />
      <Route path="home" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route path="cart" element={<Cart />} />
      <Route path="categories" element={<Categories />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

export default router;
