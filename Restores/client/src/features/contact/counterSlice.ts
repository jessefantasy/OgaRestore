import { createSlice } from "@reduxjs/toolkit";


export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 43,
    title: 'Get another reducter counter redux toolkit'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        },

    }
  
});

export const {increment, decrement} = counterSlice.actions;