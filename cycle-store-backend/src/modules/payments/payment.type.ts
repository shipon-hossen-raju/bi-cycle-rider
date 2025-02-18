

export type TOrderPayment = {
  userId: string;
  productId: string;
  tranId: string | null;
  paymentStatus: "pending" | "successful" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  paymentSystem: string;
  name: string;
  phone: string;
  address: string;
};

export type TPaymentSystem = "online" | "cashOnDelivery";
