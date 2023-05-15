import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

const app:Application = express()

app.use(cors())
//parse date
app.use(express.json())
app.use(express.urlencoded())


app.get("/",(req:Request, res:Response, next:NextFunction)=>{
  res.send("Hello World")
  next()
})

export default app