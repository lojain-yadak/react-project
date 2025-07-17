import { createHashRouter } from "react-router-dom";
import Errorpage from "./pages/error/Errorpage";
import Home from './pages/home/Home';
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import VerifyCode from './component/verifycode/VerifyCode';
import ResetPassword from './component/resetpassword/ResetPassword';
import Forgetpassword from "./component/forgetpassword/Forgetpassword";
import Product from './pages/product/Product';
import MainLayout from "./layout/Mainlayout";
import Checkout from "./pages/checkout/Checkout";
import ProtectedRouter from './component/protectedrouter/ProtectedRouter';
import Products from "./component/products/Products";
import Profile from "./pages/profile/Profile"; 
import Info from "./pages/profile/Info";
import ChangePassword from "./pages/profile/Changepassword";
import Orders from "./pages/profile/Orders";
import CategoryProducts from "./pages/productbycategory/CategoryProducts";

const routes = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <Product />,
        viewTransition: true,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRouter>
            <Checkout />
          </ProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgetpassword",
        element: <Forgetpassword />,
      },
      {
        path: "verify-code",
        element: <VerifyCode />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "category/:categoryId/products",
        element: <CategoryProducts />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        children: [
          {
            index: true,
            element: <Info />,
          },
          {
            path: "info",
            element: <Info />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);
export default routes;
