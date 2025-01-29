import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema: Schema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name cannot be empty"],
      minlength: [1, "Product name cannot be empty"],
    },
    brandName: {
      type: String,
      required: [true, "Brand name cannot be empty"],
      minlength: [1, "Brand name cannot be empty"],
    },
    productTitle: {
      type: String,
      required: [true, "Product title cannot be empty"],
      minlength: [1, "Product title cannot be empty"],
    },
    description: {
      type: String,
      required: [true, "Description cannot be empty"],
      minlength: [1, "Description cannot be empty"],
    },
    ProductType: {
      type: {
        type: String,
        required: [true, "Type cannot be empty"],
        minlength: [1, "Type cannot be empty"],
      },
      subType: {
        type: String,
        required: [true, "SubType cannot be empty"],
        minlength: [1, "SubType cannot be empty"],
      },
    },
    prices: {
      regular: {
        type: Number,
        required: [true, "Regular price is required"],
        min: [0, "Regular price must be a non-negative integer"],
      },
      sale: {
        type: Number,
        required: [true, "Sale price is required"],
        min: [0, "Sale price must be a non-negative integer"],
      },
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      validate: {
        validator: (v: string) => {
          // Simple URL validation (you can use a more robust library if needed)
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid URL!`,
      },
    },
    extraImages: {
      type: [String],
      required: [true, "At least one extra image is required"],
      validate: {
        validator: (v: string[]) => {
          return v.every((url) =>
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url),
          );
        },
        message: (props: { value: string[] }) =>
          `${props.value} contains invalid URLs!`,
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be a non-negative integer"],
    },
    productStatus: {
      type: String,
      required: [true, "Product status is required"],
      enum: {
        values: ["active", "inActive"],
        message: "Product status must be either 'active' or 'inActive'",
      },
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model<IProduct>("product", productSchema);

export default ProductModel;
