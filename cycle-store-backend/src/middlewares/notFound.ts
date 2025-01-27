/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import statusCode from "../utils/status.code";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(statusCode.notFound).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};

export default notFound;
