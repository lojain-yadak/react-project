import { createBrowserRouter } from "react-router-dom";
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
import MainLayout from "./layout/MainLayout";
import Checkout from "./pages/checkout/Checkout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Home />
      },
       {
        path: 'home/',
        element: <Home />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/shop',
        element: <Shop />
      },{
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forgetpassword',
        element: <Forgetpassword />
      },
      {
        path: '/verify-code',
        element: <VerifyCode />
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      }
    ]
  }
]);

export default routes;