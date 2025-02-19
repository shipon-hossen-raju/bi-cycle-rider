import { Router } from "express";
import { addToCartController } from "./addToCart.controller";

const route = Router();

route.post("/", addToCartController.addToCart);

export const addToCartRoute = route