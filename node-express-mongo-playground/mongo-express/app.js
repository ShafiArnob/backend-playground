const express = require('express')
const {insertStudent, searchStudent, getStudentById} = require("./student.service")
const app = express()


const print = console.log

app.use(express.json())

app.get("/api/students/detail/:id", async(req, res)=>{
  print("GET /api/students",req.params)
  const student = await getStudentById(req.params.id)
  res.send(student)
})
app.post("/api/students/search", async(req,res)=>{
  print("POST /api/students/search",req.body)
  const result = await searchStudent(req.body)
  res.send(result)
})
app.post("/api/students/create", async(req, res)=>{
  print("POST /api/students/create", req.body)
  const result = await insertStudent(req.body)
  res.send(result)
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