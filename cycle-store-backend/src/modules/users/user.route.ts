import { Router } from "express";
import validateRequest from "../../utils/validationRequest";
import { userController } from "./user.controller";
import { createUserValidationSchema } from "./user.validation";

const router = Router();

// user registration
router.post(
  "/registration",
  validateRequest(createUserValidationSchema),
  userController.createUser,
);

export const UserRoutes = router;
