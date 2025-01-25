import express from "express";
import { productController } from "./product.controller";
const route = express.Router();

// product create or store route
route.post("/", productController.productCreateDB);

// get all data
route.get("/", productController.getAllProducts);

// get specific product data
route.get("/:productId", productController.getSpecificProducts);

//  specific product data update
route.put("/:productId", productController.getSpecificProductUpdate);

//  specific product data delete
route.delete("/:productId", productController.specificProductDelete);

export const productRoute = route;
