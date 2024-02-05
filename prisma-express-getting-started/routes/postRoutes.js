import { Router } from "express";
import {
  createPost,
  updatePost,
  fetchAllPosts,
  fetchPostsWithComments,
  fetchSinglePost,
  deleteSinglePost,
} from "../controller/PostController.js";

const PostRoutes = Router();

PostRoutes.get("/", fetchAllPosts);
PostRoutes.get("/wcomments", fetchPostsWithComments);
PostRoutes.get("/:id", fetchSinglePost);
PostRoutes.put("/:id", updatePost);
PostRoutes.delete("/:id", deleteSinglePost);
PostRoutes.post("/", createPost);

export default PostRoutes;
