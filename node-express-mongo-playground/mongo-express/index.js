const {MongoClient} = require("mongodb")


const print = console.log

const client = new MongoClient("mongodb://localhost:27017",{
  useNewUrlParser:true
})

const insertStudent = async(db, document) => {
  const collection = db.collection("students")
  const result = await collection.insertOne(document)
  return result
}
const searchStudents = async(db, document) =>{
  const collection = db.collection("students")
  const result = await collection.findOne(document)
  return result
}

const student = {
  name:"Arnob",
  age:22,
  city:"Dhaka"
}

const main = async () => {
  try{
    await client.connect()
    print("Connected to mongo")
    //! Add Data To Mongo
    const db = client.db("schooldb")
    // const result = await insertStudent(db, student)
    //! Find Single Data
    // const result = await searchStudents(db, {name:"Arnob"})
    //! Count Document
    // const count = await db.collection("students").countDocuments()

    // print(count)


  }
  catch(err){
    print(err)
  }
  finally{
    await client.close()
  }
}

main()