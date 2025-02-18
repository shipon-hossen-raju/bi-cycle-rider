import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  console.log("req.body ", req.body);
  const result = await authService.loginUser(req.body);

  console.log("login result ", result);
  
  sendResponse(res, {
    success: true,
    statusCode: statusCode.ok,
    message: "login success",
    data: result,
  });
});

export const authController = { loginUser };
