const { MongoClient, ServerApiVersion, Collection } = require('mongodb');


const uri = "mongodb+srv://testuser:testuser@cluster0.jcavx.mongodb.net/?retryWrites=true&w=majority";


console.log("Connecting to MongoDb");
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
/*
^ Mongo 
 client.connect(err => {
   const collection = client.db("test").collection("test");
   // perform actions on the collection object
   console.log("DB Connected");
   client.close();
// });
^ Mongo query
query = {
  "name":"John",
  "age":{
    $gt:25 
  }
}
/select all students where name="John" and age>25;
/ lt, eq 
*/

// * Insert
const insertStudent = async (db, collectionName, data) => {
  const collection = db.collection(collectionName)
  const result = await collection.insertOne(data)
  return result
}
// * Search student 
const searchStudent = async (db, collectionName, data) => {
  const collection = db.collection(collectionName)
  const result = await collection.insertOne(data)
  return result
}
const student = {
  name:"John Joe",
  age:72,
  city:"MI"
}

const main = async () =>{
  try{
    await client.connect()
    console.log("Connected to Mongo");
    const db = client.db('test')
    const result = await insertStudent(db,"test",student)
    console.log(result);
  }catch(err){
    console.log(err);
  }finally{
    client.close()
  }
}

main()