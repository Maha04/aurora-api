import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization;
  console.log(token, "ACCESS TOKEN");
  if (!token) return next(errorHandler(401, "Unauthorized"));
  console.log(token?.slice(7, token?.length), "AFTER SLICE");
  jwt.verify(
    token?.slice(7, token?.length),
    process.env.JWT_SECRET,
    (err, user) => {
      if (err) return next(errorHandler(403, "Forbidden"));
      req.user = user;
      next();
    }
  );
};
