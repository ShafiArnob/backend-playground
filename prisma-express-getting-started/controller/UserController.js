import prisma from "../DB/db.config.js";

//Fetch all users
const fetchAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({});

  return res.status(200).json({ status: true, data: users });
};

//Show single user
const fetchSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.status(200).json({ status: true, data: user });
};

// Create User
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res
      .status(400)
      .json({ status: false, message: "Email already taken" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res
    .status(200)
    .json({ status: true, data: newUser, message: "User created" });
};

//Update the user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const response = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    //update whatever field you want
    data: {
      name: name,
      email: email,
      // password: password,
    },
  });
  console.log(response);
  return res.status(200).json({ status: true, message: "User updated" });
};

export { createUser, updateUser, fetchAllUsers, fetchSingleUser };
