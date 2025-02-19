import { Document, Schema, model } from "mongoose";
import { TAddToCart } from "./addToCart.type";

interface IAddToCart extends Document, TAddToCart {}

const addToCartSchema = new Schema<IAddToCart>(
  {
    userId: { type: String, required: true },
    quantity: { type: Number, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const AddToCart = model<IAddToCart>("addToCart", addToCartSchema);

export default AddToCart;
