import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import { HiShoppingCart } from "react-icons/hi";

const Navber = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  const handleNavigateCart = () => {
    navigate("/dashboard/cart");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="font-semibold text-xl" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-xl" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-xl" to={"/products"}>
                Product
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold">PhiMart</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="font-semibold text-xl" to={"/"}>
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link className="font-semibold text-xl" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link className="font-semibold text-xl" to={"/products"}>
              Product
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end mr-5">
        {user ? (
          <div className="flex gap-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <HiShoppingCart
                  onClick={handleNavigateCart}
                  className="text-2xl"
                />
                <span className="badge badge-sm indicator-item">
                  {cart?.items?.length || 0}
                </span>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={logoutUser}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link className="btn btn-primary" to={"register"}>
              Register
            </Link>
            <Link className="btn btn-primary" to={"login"}>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
