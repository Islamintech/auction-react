import React from "react";
import { TabPanel } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { retrieveFinishedOrder} from "./selector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/car";
import { serverApi } from "../../../lib/config";


/** REDUX SLICE & SELECTOR **/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrder,
  (finishedOrder) => ({ finishedOrder })
);


//**HANDLERS**/

export default function FinishedOrders() {
  const {finishedOrder} = useSelector(finishedOrdersRetriever);


  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrder.map((order: Order) => {
          return (
            <Box className="orders-main-box">
              <Box className="orders-box-scroll">
               {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                  (ele: Product)=> item.productId === ele._id
                )[0];
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        className="order-dish-img"
                        alt=""
                      />
                      <p className="title-dish">{product.productName}</p>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>$22</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
                <p>Product price</p>
                <p>${order.orderTotal - order.orderDelivery}</p>
                <img src="/icons/close.svg" alt="" />
                <p>Delivery cost</p>
                <p>${order.orderDelivery}</p>
                <img src="/icons/pause.svg" alt="" />
                <p>Total</p>
                <p>${order.orderTotal}</p>
              </Box>
            </Box>
          );
        })}
        {!finishedOrder || 
        (finishedOrder.length === 0 && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              alt=""
              style={{ width: "300px", height: "auto", marginTop: "100px" }}
            />
          </Box>
        ))}
      </Stack>
    </TabPanel>
  );
}