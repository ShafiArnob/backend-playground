//import mongodb client
const {MongoClient} = require("mongodb")

let _db = null
//create a conection
const connect = async () =>{
  const client = new MongoClient("mongodb://localhost:27017",{
    useNewUrlParser:true
  })
  console.log("Connecting to mongodb")
  await client.connect()
  _db = client.db("schooldb")
}
//create getbd
const getDb = async () =>{
  if(!_db){
    await connect()
  }
  return _db
}
//export them
module.exports = {
  connect,
  getDb
}