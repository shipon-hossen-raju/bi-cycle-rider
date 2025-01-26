import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../utils/validationRequest";
import { createUserLoginValidationSchema } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(createUserLoginValidationSchema),
  authController.loginUser,
);

export const authRoute = router;
