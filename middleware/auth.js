import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

// Protect route
export const AuthMiddleWare = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized to access this route",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized to access this route",
    });
  }
};
