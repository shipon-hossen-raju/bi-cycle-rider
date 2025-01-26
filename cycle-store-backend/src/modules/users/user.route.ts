import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../utils/validationRequest";
import { createStudentValidationSchema } from "./user.validation";

const router = Router();

// user registration
router.post(
  "/registration",
  validateRequest(createStudentValidationSchema),
  userController.createUser,
);

export const UserRoutes = router;
