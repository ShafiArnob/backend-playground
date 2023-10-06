import dotenv from 'dotenv'
import path from 'path'

//accessing .env file from root
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DEFAULT_PASS: process.env.DEFAULT_STUDENT_PASS,
}
