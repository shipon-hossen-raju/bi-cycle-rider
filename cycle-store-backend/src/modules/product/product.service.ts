import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

// create product
const createProductDB = async (productData: TProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};

// get all product
const getAllProducts = async (searchTerm?: string) => {
  return await ProductModel.find(
    searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            {
              brand: { $regex: searchTerm, $options: "i" },
            },
            {
              type: { $regex: searchTerm, $options: "i" },
            },
          ],
        }
      : {},
  );
};

// get specific product
const getSpecificProducts = async (id: string) => {
  return await ProductModel.findOne({ _id: id });
};

// get specific product update
type TProductUpdated = { price?: number; quantity?: number };
const getSpecificProductUpdate = async (
  id: string,
  bodyData: TProductUpdated,
) => {
  const updateData: TProductUpdated = {};

  if (bodyData.price) {
    updateData.price = bodyData.price;
  }
  if (bodyData.quantity) {
    updateData.quantity = bodyData.quantity;
  }

  // specific product update
  const updated = await ProductModel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  return updated;
};

// get specific product update
const specificProductDelete = async (id: string) => {
  // specific product update
  const deleted = await ProductModel.deleteOne({ _id: id });

  return deleted;
};

export const productService = {
  createProductDB,
  getAllProducts,
  getSpecificProducts,
  getSpecificProductUpdate,
  specificProductDelete,
};
