import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home/Home";
// import Categories from "../pages/Categories/Categories";
import Login from "../pages/Auth/Login";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Auth/Register";
import Products from "../pages/Products/Products";
import SingleProduct from "../pages/Products/SingleProduct";
import Cart from "../pages/Cart/Cart";
import ProtectedRoute from "../components/ProtectedRoutes";
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import ErrorMsg from "../components/ErrorMsg";
import { UseAppSelector } from "../app/hooks";
import AddCategory from "../pages/Admin/AddCategory";
import AddProduct from "../pages/Admin/AddProduct";
import ProductsTable from "../pages/Admin/Tables/ProductsTable";
import CategoriesTable from "../pages/Admin/Tables/CategoriesTable";

const AppRoute = () => {
  const { token } = UseAppSelector((state) => state.auth);
  const isAllowed = token ? true : false;
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorMsg />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <ProtectedRoute isAllowed={!isAllowed} redirectPath="/login">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute isAllowed={!isAllowed} redirectPath="/login">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="contact"
            element={
              <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="products/:id"
            element={
              <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
                <SingleProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
                <Cart />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="categories"
            element={
              <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
                <Categories />
              </ProtectedRoute>
            }
          /> */}
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesTable />} />
          <Route path="categories/add-category" element={<AddCategory />} />
          <Route path="products" element={<ProductsTable />} />
          <Route path="products/add-product" element={<AddProduct />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );
};

export default AppRoute;
