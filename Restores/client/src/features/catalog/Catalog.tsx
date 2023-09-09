
import { useState } from 'react';
import { Product } from '../../models/product';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ProductList from './ProductList';


export default function MyCatalog()  {
    
    return (
     <>

        <ProductList/>
      {/* <Button variant='contained' onClick={addProduct}>Add Product </Button> */}
     </>
    )
}