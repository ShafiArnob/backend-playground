import { Router } from "express";
import { createUser } from "../controller/UserController.js";

const UserRoutes = Router();

UserRoutes.post("/", createUser);

export default UserRoutes;
