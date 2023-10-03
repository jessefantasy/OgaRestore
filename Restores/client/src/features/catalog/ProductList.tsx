import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { Product } from '../../models/product';
import ProductCard from "./ProductCard";
import agent from "../../app/api/agent";
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductCardSkeleton';

interface Props {
    products: Product[];
}

export default function ProductList(props: Props) {
    const { products: initialProducts } = props;
    const [products, setProducts] = useState<Product[]>(initialProducts);

    useEffect(() => {
        // You don't need to fetch products again in this component
        // agent.Catalog.list().then((products) => setProducts(products));
    }, []);

    function addProduct() {
        setProducts((prevState) => [
            ...prevState,
            {
                id: prevState.length + 101,
                name: 'product' + (prevState.length + 1),
                price: (prevState.length * 100) + 100,
                brand: 'some brand',
                description: "some description",
                pictureUrl: 'http://picsum.photos/200',
            },
        ]);
    }
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={4}>
        {products.map(product => (
            <Grid key={product.id} item xs={4}>
                {!productsLoaded ? (
                    <ProductCardSkeleton />
                ) : (
                    <ProductCard product={product} />
                )}
            </Grid>
        ))}
    </Grid>
    );
}
