import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import About from "../pages/About";
import Product from "../pages/Products/Product";
import MainLayout from "../layouts/MainLayout";
import Shop from "../pages/Shop";
import Login from "../pages/login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/AccountActivation";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="product" element={<Product></Product>}></Route>
        <Route path="products" element={<Shop />} />
        <Route path="login" element={<Login></Login>} />
        <Route path="register" element={<Register></Register>} />
        <Route
          path="activate/:uid/:token"
          element={<ActivateAccount></ActivateAccount>}
        ></Route>
        <Route path="products/:id" element = {<ProductDetails></ProductDetails>} />
      </Route>
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard></Dashboard>} />
        <Route path="profile" element={<Profile></Profile>} />
        <Route path="cart" element={<Cart></Cart>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
