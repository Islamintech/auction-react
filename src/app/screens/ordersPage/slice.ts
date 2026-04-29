import {createSlice} from '@reduxjs/toolkit';
import { OrdersPageState } from '../../../lib/types/screen';

const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrder: [],
};

const ordersPageSlice = createSlice({
    name: 'ordersPage',
    initialState,
    reducers: {
        setPausedOrders: (state, action) => {
            state.pausedOrders = action.payload;
        },
        setpProcessOrders: (state, action) => {
            state.processOrders = action.payload;
        }, 
        setFinishedOrders: (state, action) => {
            state.finishedOrder = action.payload;
        },  
    },
});

export const {setPausedOrders, setpProcessOrders, setFinishedOrders} = 
ordersPageSlice.actions;

const OrdersPageReducer =  ordersPageSlice.reducer;
export default OrdersPageReducer;