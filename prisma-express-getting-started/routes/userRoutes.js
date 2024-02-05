import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchAllUsers,
  fetchSingleUser,
} from "../controller/UserController.js";

const UserRoutes = Router();

UserRoutes.get("/", fetchAllUsers);
UserRoutes.get("/:id", fetchSingleUser);
UserRoutes.post("/", createUser);
UserRoutes.put("/:id", updateUser);

export default UserRoutes;
