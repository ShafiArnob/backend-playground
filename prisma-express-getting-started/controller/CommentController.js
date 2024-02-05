import prisma from "../DB/db.config.js";

// get all comments
export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({});
  return res.json({ status: 200, data: comments });
};

// get single comment
export const fetchSingleComment = async (req, res) => {
  const commentId = req.params.id;
  const post = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({ status: 200, data: post });
};

//create a comment
export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  // await prisma.post.update({
  //   where: {
  //     id: Number(post_id),
  //   },
  //   data: {
  //     comment_count: {
  //       increment: 1,
  //     },
  //   },
  // });

  const newComent = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });

  return res.json({
    status: 200,
    data: newComent,
    msg: "Comment created successfully.",
  });
};

// delete comment
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  // await prisma.post.update({
  //   where: {
  //     id: Number(post_id),
  //   },
  //   data: {
  //     comment_count: {
  //       decrement: 1,
  //     },
  //   },
  // });

  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({ status: 200, msg: "Post deleted successfully" });
};
