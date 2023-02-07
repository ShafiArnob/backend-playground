const app = require('./app')
const {connect} = require('./mongo')
const {setupRoutes} = require('./student.controller')
const PORT = 5000;

app.listen(PORT, async()=>{
  console.log(`listening to PORT ${PORT}`)
  await connect()
  setupRoutes(app)
  console.log("Application setup completed")
})