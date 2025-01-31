import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { productService } from "./product.service";

// product create or store controller
const productCreateDB = catchAsync(async (req, res) => {
  const clientData = req.body;
  const newProduct = {
    ...req.body,
  };

  const createdResult = await productService.createProductDB(newProduct);
  // const createdResult = clientData;

  sendResponse(res, {
    statusCode: statusCode.ok,
    success: true,
    message: "Bicycle created successfully",
    data: createdResult || {},
  });
});

// get all products
const getAllProducts = catchAsync(async (req, res) => {
  const getProducts = await productService.getAllProducts(req.query);

  sendResponse(res, {
    message: "Bicycles retrieved successfully",
    statusCode: statusCode.ok,
    data: getProducts.result,
    success: true,
    meta: getProducts.meta,
  });
});

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
const getSpecificProductUpdate = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const bodyData = { ...req.body, ratings: [], reviews: [] };

  const getProductUpdated = await productService.getSpecificProductUpdate(
    productId,
    bodyData,
  );

  //   send data
  sendResponse(res, {
    message: "Bicycle updated successfully",
    statusCode: statusCode.ok,
    success: true,
    data: getProductUpdated,
  });
});

// get all products
const specificProductDelete = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const productDeleted = await productService.specificProductDelete(productId);

  sendResponse(res, {
    message: "Bicycle deleted successfully",
    success: true,
    statusCode: statusCode.ok,
    data: productDeleted && {},
  });
});

export const productController = {
  productCreateDB,
  getAllProducts,
  getSpecificProducts,
  getSpecificProductUpdate,
  specificProductDelete,
};
