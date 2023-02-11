const {insertStudent, searchStudent, getStudentById, updateStudent, deleteStudentById} = require("./student.service")
const {validate} = require('./student.request')
const print = console.log

const setupRoutes = (app) => {
  console.log(`Setting up student routes`)
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
    const validationResult = validate(req.body)
    if(!validationResult.error){
      const result = await insertStudent(req.body)
      if(result instanceof Error){
        res.status(400).json(JSON.parse(result.message))
        return
      }
      return res.json(result)
    }
    return res.status(400).json({status:"error", message:validationResult.error})
  })
  
  app.put("/api/students/update/:id", async(req, res)=>{
    print("PUT /api/students/:id", req.params.id)
    const validationResult = validate(req.body)
    if(!validationResult.error){
      const result = await updateStudent(req.params.id,req.body)
      if(result instanceof Error){
        res.status(400).json(JSON.parse(result.message))
        return
      }
      return res.json(result)
    }
    return res.status(400).json({status:"error", message:validationResult.error})
  })
  
  app.delete("/api/students/delete/:id", async(req, res)=>{
    print("DELETE /api/students/:id", req.params.id)
    if(req.params.id){
      const result = await deleteStudentById(req.params.id)
      if(result instanceof Error){
        res.status(400).json(JSON.parse(result.message))
        return
      }
      return res.json(result)
    }
    return res.status(400).json({status:"error", message:"Id required"})
  })
}

module.exports = {setupRoutes}