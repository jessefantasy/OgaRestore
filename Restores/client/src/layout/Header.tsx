import { ColorLens, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../app/context/StoreContext";
import { useAppSelector } from "../app/store/configureStore";

const midLinks  = [
    {title: 'catalog', path: '/catalog'},
    {title: 'contact', path: '/contact'},
    {title: 'about', path: '/about'}
]

const rightLinks  = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
    
]


export default function Header() {
// const {basket} = useStoreContext();
    const {basket} = useAppSelector(state => state.basket);

const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);


    return (

        <AppBar position="static" sx={{mb: 4  }}>
            <Toolbar  >
                <Typography variant="h6" component={NavLink} to='/'
                sx={{ color: 'inherit', textDecoration: 'none' }} >
                    RESTORE
                </Typography>
                <List sx={{ display: 'flex'}}>
                    { midLinks.map(({title, path}) => (
                        <ListItem component={NavLink} to={path} key={path} sx={{color: 'inherit', typography: 'h6'}}>
                            {title.toUpperCase()}
                        </ListItem>

                    ))  }
                </List>
            
                <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                <List sx={{ display: 'flex'}}>
                    { rightLinks.map(({title, path}) => (
                        <ListItem component={NavLink} to={path} key={path} sx={{color: 'inherit', typography: 'h6'}}>
                            {title.toUpperCase()}
                        </ListItem>

                    ))  }
                </List>
            </Toolbar>
            
        </AppBar>
    )

}