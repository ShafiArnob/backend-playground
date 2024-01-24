const express = require("express");
const zod = require("zod");
const app = express();
const PORT = 4000;

const userSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  country: zod.literal("IN").or(zod.literal("US")),
});

let numOfRequests = 0;
const calculateReqs = (req, res, next) => {
  numOfRequests++;
  console.log(numOfRequests);
  next();
};

app.use(calculateReqs);
app.use(express.json());

app.get("/hit", (req, res) => {
  console.log("Hit");
  res.send(`Requests ${numOfRequests}`);
});

app.post("/user", (req, res) => {
  const userData = req.body;
  const response = userSchema.safeParse(userData);
  // console.log(req.body.kid);
  res.json({ response });
});

// global error catch
app.use(function (err, req, res, next) {
  res.json({ message: "Error in the server" });
});

app.listen(PORT, () => {
  console.log("Listening . . .");
});
