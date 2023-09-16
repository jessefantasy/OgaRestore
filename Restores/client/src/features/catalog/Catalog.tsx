import React, { useEffect, useState } from 'react';
import { Product } from '../../models/product';

import ProductList from './ProductList';
import LoadingComponent from '../../layout/LoadingComponent';
import agent from '../../app/api/agent';

export default function MyCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => {
        setProducts(products);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) return <LoadingComponent message='Loading Products' />;
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
