import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchAllUsers,
  fetchSingleUser,
  deleteSingleUser,
  fetchSingleUserWithPosts,
} from "../controller/UserController.js";

const UserRoutes = Router();

UserRoutes.get("/", fetchAllUsers);
UserRoutes.get("/:id", fetchSingleUser);
UserRoutes.get("/wpost/:id", fetchSingleUserWithPosts);
UserRoutes.put("/:id", updateUser);
UserRoutes.delete("/:id", deleteSingleUser);
UserRoutes.post("/", createUser);

export default UserRoutes;
