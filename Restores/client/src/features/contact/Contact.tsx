import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER} from "./counterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function Contact() {
    const {data, title} = useAppSelector(state => state.counter);
    const dispatch = useAppDispatch();
    



    return (
        <>
     <Typography variant='h2'>          
         {title}
    </Typography>
    
    <Typography variant='h5'>          
         {data}
    </Typography>

    <ButtonGroup>
        <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
        <Button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>

    </ButtonGroup>
        </>

    )
}