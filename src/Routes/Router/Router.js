import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import AllBuyers from "../../Pages/AllBuyers/AllBuyers";
import AllProducts from "../../Pages/AllProducts/AllProducts/AllProducts";
import AllSeller from "../../Pages/AllSeller/AllSeller";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import Payment from "../../Pages/MyOrders/Payment/Payment";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";
import ReportedItems from "../../Pages/ReportedItems/ReportedItems";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>,
                loader: ({ params }) => fetch(`https://phone-garage-server-bay.vercel.app/products/${params.id}`)
            },
            {
                path: '/allseller',
                element: <AllSeller></AllSeller>
            },
            {
                path: 'allbuyers',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/myorders/payment/:id',
                element: <Payment></Payment>,
                loader: async ({ params }) => fetch(`https://phone-garage-server-bay.vercel.app/bookings/${params.id}`)
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '*',
                element: <NotFoundPage></NotFoundPage>
            },
            {
                path: 'reported',
                element: <ReportedItems></ReportedItems>
            }
        ]
    }
])