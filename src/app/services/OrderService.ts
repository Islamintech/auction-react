import axios from 'axios';
import { serverApi } from "../../lib/config";
import { Order, OrderInquiry, OrderUpdateInput } from '../../lib/types/order';


class OrderService {
    private readonly path: string;

    constructor(){
        this.path = serverApi;
    }

    public async getMytOrders(input: OrderInquiry): Promise<Order[]>{
        try{    
          axios.defaults.withCredentials = true;
          const url =  `${this.path}/order/all`;
          const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
          const result = await axios.get(url+query, { withCredentials: true});
          console.log("getMyOrders", result);

          return result.data;  
        }catch(err){
            console.log("Error. getMytOrders", err);
            throw err;
        }
    } 

    public async updateOrder(input: OrderUpdateInput): Promise<Order[]>{
        try{    
          const url = `${this.path}/order/update`;
          const result =  await axios.post(url, input, {withCredentials: true});
          
          console.log("UpdateOrder", result);

          return result.data
        }catch(err){
            console.log("Error. updateOrder", err);
            throw err;
        }
    } 
}

export default OrderService;