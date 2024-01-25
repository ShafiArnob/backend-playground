const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const jwtPassword = "12345";

const users = [
  {
    email: "shafi@gmail.com",
    password: "12345678",
    username: "shafiarnob",
  },
  {
    email: "arnob@gmail.com",
    password: "12345678",
    username: "bigi",
  },
];

const userSchema = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  password: zod.string(),
});

/// Middlewares
// calculate the number of request hit the server
let numOfRequests = 0;
const calculateReqs = (req, res, next) => {
  numOfRequests++;
  console.log(numOfRequests);
  next();
};

///Utils
//checks if user exists or not
const userExists = (username, password) => {
  const foundUser = users.find(
    (user) => user.username == username && user.password == password
  );
  if (foundUser) {
    return true;
  }
  return false;
};

app.use(calculateReqs);
app.use(express.json());

app.post("/signin", (req, res) => {
  const userData = req.body;
  const response = userSchema.safeParse(userData);

  if (!response.success) {
    res.status(404).json({ message: "data not valid" });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const token = jwt.sign({ username: username }, jwtPassword);
  console.log(response, token);
  res.json({ token });
});

app.get("/users", (req, res) => {
  const token = req.headers["authorization"];
  console.log(token);
  try {
    const decoded = jwt.verify(token, jwtPassword);
    console.log(decoded);
    const username = decoded.username;
    console.log(username);
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(404).json({ message: "Invalid token" });
  }
});

// global error catch
app.use(function (err, req, res, next) {
  res.json({ message: "Error in the server" });
});

app.listen(PORT, () => {
  console.log("Listening . . .");
});
