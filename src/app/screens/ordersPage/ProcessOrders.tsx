import React from "react";
import moment from "moment";
import { TabPanel } from "@mui/lab";
import { Box, Button, Divider, Stack } from "@mui/material";
import { retrievProcessOrders } from "./selector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/car";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/consultation.enum";

const processOrdersRetriever = createSelector(
  retrievProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrderProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrderProps) {
  const {setValue} = props;
  const {authMember, setOrderBuilder} =  useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

//**HANDLERS**/
const finishOrderHandler = async (e: T) => {
  try{
    if(!authMember) throw new Error(Messages.error2);
    //PAYMENT 

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId, 
      orderStatus: OrderStatus.FINISH
    };

    const confirmation = window.confirm("Do you want to proceed with payment?");
    if(confirmation){
      const order = new OrderService();
      await order.updateOrder(input);
      setValue("3");
      setOrderBuilder(new Date());      
    }
  }catch(err){  
    console.log(err);
    sweetErrorHandling(err).then();
  }
}

  return (
    <TabPanel value="2">
      <Stack gap="24px">
        {processOrders?.map((order: Order) => (
          <Box key={order._id} className="orders-main-box">
            {/* Items scroll area */}
            <Box className="orders-box-scroll">
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id
                )[0];
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Box key={item._id} className="orders-name-price">
                    <img
                      src={imagePath}
                      className="order-dish-img"
                      alt={product.productName}
                    />
                    <p className="title-dish">{product.productName}</p>
                    <Box className="price-box">
                      <p>${item.itemPrice}</p>
                      <img src="/icons/close.svg" alt="x" />
                      <p>{item.itemQuantity}</p>
                      <img src="/icons/pause.svg" alt="=" />
                      <p style={{ marginLeft: "15px" }}>
                        ${item.itemQuantity * item.itemPrice}
                      </p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Divider />

            {/* Order total row */}
            <Box className="total-price-box">
              <Stack
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
                gap="8px"
                mb="8px"
              >
                <span>Product price</span>
                <strong>${order.orderTotal - order.orderDelivery}</strong>
                <img src="/icons/plus.svg" alt="+" />
                <span>Delivery</span>
                <strong>${order.orderDelivery}</strong>
                <img src="/icons/equal.svg" alt="=" />
                <span>Total</span>
                <strong>${order.orderTotal}</strong>
              </Stack>

              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <p style={{ color: "#888", fontSize: "13px" }}>
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button 
                  value={order._id} 
                  className="verify-button" 
                  variant="contained"
                  onClick={finishOrderHandler}
                  >
                  VERIFY TO FULFIL
                </Button>
              </Stack>
            </Box>
          </Box>
        ))}

       
        {(!processOrders || processOrders.length === 0) && (
          <Box display="flex" justifyContent="center">
            <img
              src="/icons/noimage-list.svg"
              alt="No orders"
              style={{ width: "300px", height: "auto", marginTop: "100px" }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}