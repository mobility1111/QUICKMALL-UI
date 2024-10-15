import { Product } from "./Product";




export interface CartItem {
    cartItemId: string;
    productId: string;
    quantity: number;
    price: number;
    product: Product; 
    imageData?: string; // Add the imageData property
  }
  
  
  export interface Cart {
    cartId: string;
    userId: number;
    items: CartItem[];
  }