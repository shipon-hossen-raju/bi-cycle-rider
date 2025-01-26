import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  console.log("userData", userData);

  const result = await userService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: statusCode.ok,
    message: "user is created successfully",
    success: true,
    data: result,
  });
});

export const userController = {
  createUser,
};
