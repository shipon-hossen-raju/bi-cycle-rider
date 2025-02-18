import mongoose, { Schema } from "mongoose";
import { TOrderPayment } from "./payment.type";



const orderPaymentSchema = new Schema<TOrderPayment>(
  {
    userId: {
      type: Schema.Types.String,
      ref: "user",
      required: [true, "User needed"],
    },
    productId: {
      type: Schema.Types.String,
      ref: "product",
      required: [true, "User needed"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    tranId: {
      type: String,
      default: null,
      required: false
    },
    address: {
      type: String,
      required: [true, "Address require"],
    },
    paymentSystem: {
      type: String,
      required: [true, "PaymentSystem require"],
      enum: ["cashOnDelivery", 'online']
    },
    name: {
      type: String,
      required: [true, "Name require"],
    },
    phone: {
      type: String,
      required: [true, "Phone require"],
    },
  },
  {
    timestamps: true,
  },
);


export const paymentOrder = mongoose.model<TOrderPayment>('payment', orderPaymentSchema);