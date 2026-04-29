import React from "react";
import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { retrievePausedOrders } from "./selector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/car";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/consultation.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";


/** REDUX SLICE & SELECTOR **/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const {setValue} = props;
  const {pausedOrders} = useSelector(pausedOrdersRetriever);
  const {authMember, setOrderBuilder} =  useGlobals();

//**HANDLERS**/

const deleteOrderHandler = async (e: T) => {
  try{
    if(!authMember) throw new Error(Messages.error2);

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId, 
      orderStatus: OrderStatus.DELETE
    };

    const confirmation = window.confirm("Do you want to delete order?");
    if(confirmation){
      const order = new OrderService();
      await order.updateOrder(input);
      setOrderBuilder(new Date());
      
    }
  }catch(err){  
    console.log(err);
    sweetErrorHandling(err).then();
  }
}


const processOrderHandler = async (e: T) => {
  try{
    if(!authMember) throw new Error(Messages.error2);
    //PAYMENT 

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId, 
      orderStatus: OrderStatus.PROCESS
    };

    const confirmation = window.confirm("Have you recieved your order?");
    if(confirmation){
      const order = new OrderService();
      await order.updateOrder(input);
      setValue("2");
      setOrderBuilder(new Date());      
    }
  }catch(err){  
    console.log(err);
    sweetErrorHandling(err).then();
  }
}

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="orders-main-box">
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
                        <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
  <Stack flexDirection="row" alignItems="center" gap="8px">
    <p>Product price</p>
    <p>${order.orderTotal - order.orderDelivery}</p>
    <img src="/icons/plus.svg" alt="" />
    <p>Delivery</p>
    <p>${order.orderDelivery}</p>
    <img src="/icons/equal.svg" alt="" />
    <p>Total</p>
    <p>${order.orderTotal}</p>
  </Stack>
  <Stack flexDirection="row" gap="8px" mt={1}>
    <Button 
      value={order._id}
      className="cancel-button" 
      variant="contained" 
       color="secondary"
      onClick={deleteOrderHandler}
    >
      CANCEL
    </Button>
    <Button 
        value={order._id}   
        className="pay-button" 
        variant="contained"
        onClick={processOrderHandler}
        >
      PAYMENT
    </Button>
  </Stack>
</Box> 
            </Box>
          );
        })}

        {!pausedOrders || 
        (pausedOrders.length === 0 && (
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