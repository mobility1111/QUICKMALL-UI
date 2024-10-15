import { OrderStatus } from "../enums/order-status.enum";
import { Product } from "./Product";


export interface Order {
    orderId: string;
    userId: string;
    totalPrice: number;
    orderDate: Date;
    shippingAddress: string;
    billingAddress: string;
    status: OrderStatus; // Change type to OrderStatus
    orderItems: OrderItem[];
  }
  
  
  export interface OrderItem {
    orderItemId: string;
    orderId: string;
    productId: string;  // Renamed to 'productId' instead of 'medicineId'
    productName: string;  // Renamed to 'productName' instead of 'medicineName'
    quantity: number;
    price: number;
    product: Product;  // Renamed to 'Product' to generalize it
  }