const app = require('./app')
const {connect} = require('./mongo')

const PORT = 5000;

app.listen(PORT, async()=>{
  console.log(`listening to PORT ${PORT}`)
  await connect()
  console.log("Connected to Mongo")
})