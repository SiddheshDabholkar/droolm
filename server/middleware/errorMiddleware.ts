import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { formatRes } from "../utils/formatRes";

const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  res.status(500).json(
    formatRes({
      message: err?.message ?? "Internal Server Error",
      isError: true,
      data: null,
    })
  );
};

export { errorMiddleware };
