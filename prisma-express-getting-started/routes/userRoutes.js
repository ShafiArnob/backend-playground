import { Router } from "express";
import { createUser, updateUser } from "../controller/UserController.js";

const UserRoutes = Router();

UserRoutes.post("/", createUser);
UserRoutes.put("/:id", updateUser);

export default UserRoutes;
