import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: statusCode.ok,
    message: "user is created successfully",
    success: true,
    data: result,
  });
});

const findAllUsers = catchAsync(async (req, res) => {
  const getUsers = await userService.getAllUsers(req.query);

  sendResponse(res, {
    message: "User retrieved successfully",
    statusCode: statusCode.ok,
    success: true,
    data: getUsers.result,
    meta: getUsers.meta
  })
})

const findUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const getUser = await userService.getSingleUser(userId);

  sendResponse(res, {
    message: "User retrieved successfully",
    statusCode: statusCode.ok,
    success: true,
    data: getUser,
  });
})

export const userController = {
  createUser,
  findAllUsers,
  findUser,
};
