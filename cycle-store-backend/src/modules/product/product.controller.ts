import { Request, Response } from "express";
import { productService } from "./product.service";
import { productZodSchema } from "./product.validation";

// product create or store controller
const productCreateDB = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    const zodParseData = productZodSchema.parse(clientData);

    const createdResult = await productService.createProductDB(zodParseData);

    //   send data
    res.status(200).json({
      success: true,
      message: "Bicycle created successfully",
      data: createdResult,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const getProducts = await productService.getAllProducts(
      searchTerm as string,
    );

    //   send data
    res.status(200).json({
      message: "Bicycles retrieved successfully",
      status: true,
      data: getProducts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

// get all products
const getSpecificProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const getProducts = await productService.getSpecificProducts(productId);

    //   send data
    res.status(200).json({
      message: "Bicycle retrieved successfully",
      status: true,
      data: getProducts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

// get all products
const getSpecificProductUpdate = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const bodyData = req.body;

    const getProductUpdated = await productService.getSpecificProductUpdate(
      productId,
      bodyData,
    );

    //   send data
    res.status(200).json({
      message: "Bicycle updated successfully",
      status: true,
      data: getProductUpdated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

// get all products
const specificProductDelete = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const productDeleted =
      await productService.specificProductDelete(productId);

    //   send data
    res.status(200).json({
      message: "Bicycle deleted successfully",
      status: true,
      data: productDeleted.deletedCount && {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const productController = {
  productCreateDB,
  getAllProducts,
  getSpecificProducts,
  getSpecificProductUpdate,
  specificProductDelete,
};
