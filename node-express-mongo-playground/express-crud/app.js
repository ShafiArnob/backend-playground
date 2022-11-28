const express = require("express")
const app = express()


app.use(express.json())

app.use('/',(req,res) => {
  console.log(`Request Received at ${new Date()}`);
  console.log(req.body);
  res.send(`Request Received at ${new Date()}`)
})


module.exports = app