import { Router } from "express";
import { paymentController } from "./payments.controller";
import validateRequest from "../../utils/validationRequest";
import { paymentValidation } from "./payment.validation";

const route = Router();

// product order payment
route.post(
  "/order",
  validateRequest(paymentValidation),
  paymentController.productOder,
);

route.post("/success/:tranId", paymentController.paymentSuccess);
route.post("/fail/:tranId", paymentController.paymentFailed);
route.post("/cancel/:tranId", paymentController.paymentCancel);

export const paymentRoute = route;
