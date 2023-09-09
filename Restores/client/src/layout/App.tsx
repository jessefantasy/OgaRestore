import {useEffect, useState} from 'react';
import { Product } from '../models/product';

import '../App.css';
import Catalog from '../features/catalog/Catalog';
import { Container, CssBaseline, Typography } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';





function App() {


  return (
    <>
    <CssBaseline/>
      <Header/>
      <Container>
      {/* <Catalog products={products} addProduct={addProduct}/> */}
      <Outlet/>

      </Container>


    
     
    </>
  );
}

export default App;
