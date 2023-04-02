const app = require('./app')
const {connect} = require('./modules/db/mongo')
const PORT = 5000;

const setup = () => {
  const {setupRoutes} = require('./modules/models/video/student.controller')
  setupRoutes(app)
}

app.listen(PORT, async()=>{
  console.log(`listening to PORT ${PORT}`)
  await connect()
  
  setup()

  app.use("/", (req,res)=>{
    console.log("Default Route")
    res.send("Default Route Hit")
  })

  console.log("Application setup completed")
})