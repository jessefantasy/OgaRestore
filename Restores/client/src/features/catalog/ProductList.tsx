import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from '../../models/product';
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

interface Props {
    products: Product[];
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
  
      fetch("http://localhost:5156/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  
    }, []);
  
    function addProduct() {
      setProducts(prevState => [...prevState, {
         id: prevState.length + 101,
         name: 'product' + (prevState.length + 1),
         price: (prevState.length * 100) + 100,
         brand: 'some brand',
         description: "some description",
         pictureUrl: 'http://picsum.photos/200'
        }])
    }

    
    return (
        <Grid container spacing={4}>
        {products.map((product) => (
            <Grid item xs={4} key={product.id}>
            <ProductCard  product={product}/>

            </Grid>
        
        

        ))}
      </Grid>
    );
}