import express, { Application } from 'express'
const app : Application = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app