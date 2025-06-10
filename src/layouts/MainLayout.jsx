import Footer from "./Footer";
import Navber from "./Navber";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
