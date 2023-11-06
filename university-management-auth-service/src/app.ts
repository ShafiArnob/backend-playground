import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', usersRouter)

//Global error handler
app.use(globalErrorHandler)
//testing
app.get('/', (req: Request, res: Response, next:NextFunction) => {
  // res.send('Hello World! GG')
  // throw new ApiError(400,"Error")
  next("Shit!! Error")
})

export default app
