import QueryBuilder from "../../builder/QueryBuilder";
import { ProductSearchableFields } from "./product.constant";
import { IProduct, IProductUpdate, TProduct } from "./product.interface";
import ProductModel from "./product.model";

// create product
const createProductDB = async (productData: TProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};

// get all product
const getAllProducts = async (query: Record<string, unknown> = {}) => {
  const productsQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productsQuery.modelQuery;
  const meta = await productsQuery.countTotal();

  return { result, meta };
};

// get specific product
const getSpecificProducts = async (id: string) => {
  return await ProductModel.findOne({ _id: id });
};

// get specific product update
const getSpecificProductUpdate = async (
  id: string,
  bodyData: IProductUpdate,
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, bodyData, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
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
