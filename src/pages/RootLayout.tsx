import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  const location = useLocation();

  // Define the paths where the Navbar should not be displayed
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Outlet />
    </>
  );
};

export default RootLayout;
