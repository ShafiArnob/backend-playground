import { Router } from "express";
import {
  fetchComments,
  fetchSingleComment,
  createComment,
  deleteComment,
} from "../controller/CommentController.js";

const CommentRoutes = Router();

CommentRoutes.get("/", fetchComments);
CommentRoutes.get("/:id", fetchSingleComment);
CommentRoutes.post("/", createComment);
CommentRoutes.delete("/:id", deleteComment);

export default CommentRoutes;
