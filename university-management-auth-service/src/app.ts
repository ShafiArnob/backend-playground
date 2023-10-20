import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', usersRouter)

// custom error with status code
class ApiError extends Error{
  statusCode : number

  constructor(statusCode:number, message:string|undefined, stack=""){
    super(message)
    this.statusCode = statusCode
    if(stack){
      this.stack = stack
    } else{
      Error.captureStackTrace(this, this.constuctor)
      
    }
  }
}

//testing
app.get('/', (req: Request, res: Response, next:NextFunction) => {
  // res.send('Hello World! GG')
  // throw new ApiError(400,"Error")
  next("Shit!! Error")
})


// global error handler
app.use((err, req: Request, res: Response, next:NextFunction)=>{
  if(err instanceof Error){
    res.status(400).json({error: err})
  }else{
    res.status(500).json({error:"Something Wrong"})
  }
})

export default app
