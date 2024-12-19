import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

//authenticating user
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read token from cookie
  token = req.cookies.token;
  if (token) {
    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //find user by id
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401).send("Not authorized, no token");
  }
});

//admin authentication
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, admin };
