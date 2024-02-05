import prisma from "../DB/db.config.js";

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

export { createUser };
