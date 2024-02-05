import prisma from "../DB/db.config.js";

//Fetch all posts
const fetchAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({});

  return res.status(200).json({ status: true, data: posts });
};

//Show single post
const fetchSinglePost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });

  return res.status(200).json({ status: true, data: post });
};

// Create post
const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;
  console.log(user_id);
  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });

  return res
    .status(200)
    .json({ status: true, data: newPost, message: "Post created" });
};

//Update the post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { name, email, password } = req.body;

  const response = await prisma.post.update({
    where: {
      id: Number(postId),
    },
    //update whatever field you want
    data: {
      name: name,
      email: email,
      // password: password,
    },
  });
  console.log(response);
  return res.status(200).json({ status: true, message: "Post updated" });
};

//Delete single post
const deleteSinglePost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });

  return res
    .status(200)
    .json({ status: true, message: "Post deleted successfully" });
};

export {
  createPost,
  updatePost,
  fetchAllPosts,
  fetchSinglePost,
  deleteSinglePost,
};
