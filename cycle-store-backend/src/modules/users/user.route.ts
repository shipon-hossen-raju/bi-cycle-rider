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

// all users
router.get("/", userController.findAllUsers);

// single user
router.get("/:userId", userController.findUser);

export const UserRoutes = router;
