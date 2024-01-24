const express = require("express");
const app = express();
const PORT = 4000;

let numOfRequests = 0;
const calculateReqs = (req, res, next) => {
  numOfRequests++;
  console.log(numOfRequests);
  next();
};

app.get("/hit", calculateReqs, (req, res) => {
  console.log("Hit");
});

app.listen(PORT, () => {
  console.log("Listening . . .");
});
