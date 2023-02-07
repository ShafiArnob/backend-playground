const express = require('express')
const app = express()


const print = console.log

app.use(express.json())




app.use("/", (req,res)=>{
  console.log("Default Route")
})
module.exports = app