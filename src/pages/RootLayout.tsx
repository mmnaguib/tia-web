import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const location = useLocation();

  // Define the paths where the Navbar should not be displayed
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
