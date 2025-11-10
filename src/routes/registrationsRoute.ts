import { Router } from "express";
import {registration, login} from "../controllers/registrations.js";


const registers = Router();

registers.post("/api/auth/signup", registration);

registers.post("/api/auth/login", login);

export default registers;
