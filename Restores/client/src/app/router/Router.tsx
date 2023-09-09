import { createBrowserRouter } from "react-router-dom";
import App from "../../layout/App";
import Homepage from "../../features/home/Homepage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import Contact from "../../features/contact/Contact";
import { Product } from "../../models/product";
import MyCatalog from "../../features/catalog/Catalog";

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
        ]
    }
]);
