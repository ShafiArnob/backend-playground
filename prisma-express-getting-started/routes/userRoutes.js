import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
} from "../controller/UserController.js";

const UserRoutes = Router();

UserRoutes.get("/", fetchUsers);
UserRoutes.post("/", createUser);
UserRoutes.put("/:id", updateUser);

export default UserRoutes;
