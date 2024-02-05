import { Router } from "express";
import {
  createPost,
  updatePost,
  fetchAllPosts,
  fetchSinglePost,
  deleteSinglePost,
} from "../controller/PostController.js";

const PostRoutes = Router();

PostRoutes.get("/", fetchAllPosts);
PostRoutes.get("/:id", fetchSinglePost);
PostRoutes.put("/:id", updatePost);
PostRoutes.delete("/:id", deleteSinglePost);
PostRoutes.post("/", createPost);

export default PostRoutes;
