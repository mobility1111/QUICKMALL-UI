
// payment-transaction.model.ts
export interface PaymentTransaction {
    id: string;
    userId: string;
    email: string;
    amount: number;
    transactionReference: string;
    status: boolean;
    createdAt: Date;
    paymentType: string;
    billingAddress:string;
    shippingAddress:string
  }
  