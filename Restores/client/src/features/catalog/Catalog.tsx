import React, { useEffect, useState } from 'react';
import { Product } from '../../models/product';

import ProductList from './ProductList';
import LoadingComponent from '../../layout/LoadingComponent';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from './catalogSlice';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import AppPagination from '../../app/components/AppPagination';

const sortOptions = [
  {
  value: 'name', label: 'Alphabetical'

  },
  {
    value: 'priceDesc', label: 'Price - Higher to Low'
  
    }
    ,
  {
    value: 'price', label: 'Price - Low to Higher'
  
    }


];

export default function MyCatalog() {
  const products = useAppSelector(productSelectors.selectAll);
  
  const {productsLoaded, status, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if(!productsLoaded) dispatch(fetchProductsAsync())
    
    // agent.Catalog.list()
    //   .then((products) => {
    //     setProducts(products);
    //     setLoading(false); // Set loading to false when data is loaded
    //   })
    //   .catch((error) => {
    //     console.error('Error loading products:', error);
    //     setLoading(false); // Set loading to false even if there's an error
    //   });
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchFilters())

  }, [dispatch, filtersLoaded])

  if (!filtersLoaded) return <LoadingComponent message='Loading Products' />;
  
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          {/* <TextField label="Search products" variant='outlined' fullWidth/> */}
          <ProductSearch/>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup selectedValue={productParams.orderBy} options={sortOptions} onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}/>
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(checkedItems: string[]) => dispatch(setProductParams({ brands: checkedItems }))}
                    />
                </Paper>
                <Paper sx={{ p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(checkedItems: string[]) => dispatch(setProductParams({ types: checkedItems }))}
                    />
                </Paper>


      </Grid>
      <Grid item xs={9}>
      <ProductList products={products} />
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={9} sx={{ mb: 1 }}>
        
        {metaData &&
                <AppPagination 
                    metaData={metaData} 
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} 
                />}
    
      </Grid>


      
   
    </Grid>
  );
}
