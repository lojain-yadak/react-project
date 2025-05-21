import { createBrowserRouter } from "react-router";
import Errorpage from "./pages/error/Errorpage";
import Home from './pages/home/Home';
import Shop from "./pages/shop/Shop";
import Cart from './pages/cart/Cart';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MainLayout from "./layout/MainLayout";

const routes =  createBrowserRouter([{
  path:'/',
  element: <MainLayout />,
  errorElement:<Errorpage />,
  children:[
    {
        path:'/',
        element:<Home />
    },
    {
        path:'/shop',
        element:<Shop />
    },
    {
        path:'/cart',
        element:<Cart />
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    }
  ],
}])
export default routes