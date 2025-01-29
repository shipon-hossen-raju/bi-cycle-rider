import { AnyZodObject } from "zod";
import catchAsync from "./catchAsync";
import { NextFunction } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next: NextFunction) => {
    // console.log("req.body ", req.body);
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
