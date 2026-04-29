import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from ".";


const selectOrdersPage = (state: AppRootState) => state.ordersPage;
export const retrievePausedOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.pausedOrders
);

export const retrievProcessOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.processOrders
);

export const retrieveFinishedOrder = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.finishedOrder
);