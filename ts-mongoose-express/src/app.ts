import express, { Application} from 'express'
import cors from 'cors'

///Application Routes
import userRoutes from './app/modules/user/user.route'

const app:Application = express()

app.use(cors())
//parse date
app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1/user",userRoutes)

export default app