import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Iuser } from "../models/usersmodel.js";

// Extended request types
export interface AuthRequest extends Request {
  username?: string;
  email?: string;
  role?: "Student" | "Admin" | "Faculty";
}

// Verify JWT
const authorization = async (request: AuthRequest, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  const jwtToken = authHeader?.split(" ")[1];

  if (!jwtToken) {
    return response.status(401).json({ message: "Headers Not Found" });
  }

  try {
    const verifiedToken = jwt.verify(jwtToken, "jwtsecretkey") as {
      username: string;
      email: string;
      role: "Student" | "Admin" | "Faculty";
    };

   

    request.username = verifiedToken.username;
    request.email = verifiedToken.email;
    request.role = verifiedToken.role;

    next();
  } catch (err) {
    return response.status(401).json({ message: "Not Authorized" , err});
  }
};

// Admin-only middleware
const admin = (request: AuthRequest, response: Response, next: NextFunction) => {

  if (request.role === "Admin") {
    next();
  } else {
    response.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { authorization, admin };
