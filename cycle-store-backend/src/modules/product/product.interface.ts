import { z } from "zod";
import { productZodSchema } from "./product.validation";

interface IProductType {
  type: string;
  subType: string;
}

interface IPrices {
  regular: number;
  sale: number;
}
export interface IProduct extends Document {
  productName: string;
  brandName: string;
  productTitle: string;
  description: string;
  ProductType: IProductType;
  prices: IPrices;
  thumbnail: string;
  extraImages: string[];
  quantity: number;
  productStatus: "active" | "inActive";
  inStock: {
    type: BooleanConstructor;
  };
}

// TypeScript Type
export type TProduct = z.infer<typeof productZodSchema>;
