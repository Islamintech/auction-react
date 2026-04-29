import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setFinishedOrders, setPausedOrders, setpProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/consultation.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/orders.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/**REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setpProcessOrders: (data: Order[])=> dispatch(setpProcessOrders(data)),
  setFinishedOrders: (data: Order[])=> dispatch(setFinishedOrders(data))
});

export default function OrdersPage() {
  const { setPausedOrders, setpProcessOrders, setFinishedOrders } = 
    actionDispatch(useDispatch());
  const {orderBuilder, authMember} = useGlobals();
  const history = useHistory();

  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  })

  useEffect(() => {
    const order = new OrderService();
    
    
    order.getMytOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
    .then((data) => setPausedOrders(data))
    .catch((err) => console.log(err));

    order.getMytOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
    .then((data) => setpProcessOrders(data))
    .catch((err) => console.log(err));

    order.getMytOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
    .then((data) => setFinishedOrders(data))
    .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder])

//**HANDLERS**/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if(!authMember) history.push("/");

  return (
    <div className="orders-page">
      <Container className="orders-container">
        <Stack className="orders-left">
          <TabContext value={value}>
            <Box className="orders-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list">
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="orders-main-content">
              <PausedOrders setValue={setValue}/>
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="orders-right">
          <Box className="orders-info-box">
            <Box className="member-box">
              <div className="user-image">
                <img
                  className="user-avatar"
                  src={authMember?.memberImage 
                          ? `${serverApi}/${authMember.memberImage}` 
                          : "/icons/default-user.svg"}
                  aria-haspopup={"true"}
                  alt=""
                />
                <div className="user-icon-box">
                  <img src={authMember?.memberType === MemberType.RESTAURANT 
                                      ?"/icons/restaurant.svg" 
                                      : "/icons/user-badge.svg"} alt="" />
                </div>
              </div>
              <span className="user-name">{authMember?.memberNick}</span>
              <span className="user-prof">{authMember?.memberType}</span>
            </Box>
            <span className="liner" />
            <Box className="user-address">
              <LocationOnIcon />
              <span className="spec-address-txt">{
              authMember?.memberAddress 
                  ? authMember.memberAddress 
                  : "do not exist"
                  }</span>
            </Box>
          </Box>
          <Box className="orders-info-box">
            <input
              type="text"
              className="card-input"
              placeholder="Card number **** 1234 1234 1234"
            />
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <input
                type="text"
                className="card-half-input"
                placeholder="07/26"
              />
              <input
                type="text"
                className="card-half-input"
                placeholder="CVV: ***"
              />
            </Stack>
            <input
              type="text"
              className="card-input"
              placeholder="Ergashev Islombek"
            />

            <Stack className="cards-box">
              <img src="/icons/western-card.svg" alt="" />
              <img src="/icons/master-card.svg" alt="" />
              <img src="/icons/paypal-card.svg" alt="" />
              <img src="/icons/visa-card.svg" alt="" />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}