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
import useProducts from '../../app/hooks/useProducts';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
  const {products, brands, types, filtersLoaded, metaData} = useProducts();
  const {productParams} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <LoadingComponent message='Loading products...' />

  return (
      <Grid container columnSpacing={4}>
          <Grid item xs={3}>
              <Paper sx={{ mb: 2 }}>
                  <ProductSearch />
              </Paper>
              <Paper sx={{ p: 2, mb: 2 }}>
                  <RadioButtonGroup
                      selectedValue={productParams.orderBy}
                      options={sortOptions}
                      onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                  />
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
          <Grid item xs={3} />
          <Grid item xs={9} sx={{mb: 2}}>
              {metaData &&
              <AppPagination 
                  metaData={metaData} 
                  onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} 
              />}
          </Grid>
      </Grid>
  )
}