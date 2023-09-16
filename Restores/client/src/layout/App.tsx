import {useEffect, useState} from 'react';
import { Product } from '../models/product';

import '../App.css';
import Catalog from '../features/catalog/Catalog';
import { Container, CssBaseline, Typography } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../app/context/StoreContext';
import { getCookie } from '../app/util/util';
import agent from '../app/api/agent';
import LoadingComponent from './LoadingComponent';





function App() {
const {setBasket} = useStoreContext();
const [loading, setLoading] = useState(true);

useEffect(() => {
const buyerId = getCookie('buyerId');
if(buyerId){
  agent.Basket.get()
  .then(basket => setBasket(basket))
  .catch(error => console.log(error))
  .finally(() => setLoading(false))
}else {
  setLoading(false);
}
}, [setBasket]);


if(loading) return <LoadingComponent message='Iniitailizing app..'/>
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
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
