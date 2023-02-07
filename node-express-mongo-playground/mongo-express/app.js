const express = require('express')
const {getDb} = require("./mongo")

const app = express()


const print = console.log

app.use(express.json())

app.get("/api/students/detail/:id", async(req, res)=>{
  print("GET /api/students",req.query)
  const db = await getDb()
  const count = await db.collection("students").countDocuments()
  res.send(`Result ${count}`)
})
app.post("/api/students/search",(req,res)=>{
  print("POST /api/students/search",req.body)
  res.send("Hello World")
})
app.post("/api/students/create", (req, res)=>{
  print("POST /api/students/create", req.body)
  res.send("Hello World")
})

app.put("/api/students/update/:id", (req, res)=>{
  print("PUT /api/students/:id", req.params.id)
  res.send("Hello World")
})

app.delete("/api/students/delete/:id", (req, res)=>{
  print("DELETE /api/students/:id", req.params.id)
  res.send("Hello World")
})


app.use("/", (req,res)=>{
  console.log("Default Route")
})
module.exports = app