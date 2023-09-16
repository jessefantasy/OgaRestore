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

interface Props {
    products?: Product[]; // Make products optional by adding "?"
    addProduct?: () => void; // Make addProduct optional by adding "?"
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:  [
             {path: '', element: <Homepage />},
             {path: 'catalog', element: <MyCatalog />},
             {path: 'catalog/:id', element: <ProductDetails />},
             {path: 'about', element: <AboutPage />},
             {path: 'contact', element: <Contact />},
             {path: 'server-error', element: <ServerError />},
             {path: 'checkout', element: <CheckoutPage/>},

             {path: 'basket', element: <BasketPage/>},
             {path: 'not-found', element: <NotFound />},
             {path: '*', element: <Navigate replace to='/not-found'/>} ,



        ]
    }
]);
