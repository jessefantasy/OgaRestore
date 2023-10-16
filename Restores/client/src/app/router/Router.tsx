import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../layout/App";
import Homepage from "../../features/home/Homepage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import Contact from "../../features/contact/Contact";
import { Product } from "../../models/product";
import MyCatalog from "../../features/catalog/Catalog";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";

interface Props {
    products?: Product[]; // Make products optional by adding "?"
    addProduct?: () => void; // Make addProduct optional by adding "?"
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:  [
                // authenticated routes
                {element: <RequireAuth />, children: [
                    {path: 'checkout', element: <CheckoutWrapper />},
                    {path: 'orders', element: <Orders />},
                ]},
                // admin routes
                {element: <RequireAuth roles={['Admin']} />, children: [
                    // {path: 'inventory', element: <Inventory />},
                ]},
             {path: '', element: <Homepage />},
             {path: 'catalog', element: <MyCatalog />},
             {path: 'catalog/:id', element: <ProductDetails />},
             {path: 'about', element: <AboutPage />},
             {path: 'contact', element: <Contact />},
             {path: 'server-error', element: <ServerError />},
             {path: 'checkout', element: <CheckoutPage/>},

             {path: 'basket', element: <BasketPage/>},
             {path: 'not-found', element: <NotFound />},
             {path: 'login', element: <Login />},
             {path: 'register', element: <Register />},
             {path: '*', element: <Navigate replace to='/not-found'/>} ,



        ]
    }
]);
