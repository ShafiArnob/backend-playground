import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader === null || authHeader === undefined) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    //verify jwt web token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "failed", message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    console.error(e);
  }
};

export default authMiddleware;
