const {getDb} = require('./mongo')
// collection schema
const getCollection = () => {
  console.log(`creating student collection`)
  const db = getDb()
  const collection = db.collection("students", {
    validator: {
      $jsonSchema: {
        title:"Student object validation",
        bsonType: "object",
        required: ["name", "phone", "age", "city"],
        properties: {
          name: {
            bsonType:"string",
            description:"must be a string and is Required"
          },
          phone: {
            bsonType:"string",
            description:"must be a string and is Required"
          },
          age: {
            bsonType:"int",
            minimum:0,
            maximum:200,
            description:"must be a integer in [0, 200] and is required"
          },
          city: {
            // only can give the values below
            enum:["Dhaka", "Khulna", "Sylhet", "Chandpur"],
            description:"can only be one of the enum values"
          },
        },
      },
    },
  })
  // console.log(collection.s.options.validator)
  return collection
}

module.exports = {
  Student:getCollection(),
}