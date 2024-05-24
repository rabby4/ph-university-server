/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statuscode = 500;
  const message = err.message || 'something went wrong';
  return res.status(statuscode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
