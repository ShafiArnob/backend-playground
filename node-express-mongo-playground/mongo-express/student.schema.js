const {BANGLADESH_CITIES} = require('./constant')

const updateSchema = async(db) => {
  const validator = {
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
          enum:BANGLADESH_CITIES,
          description:"can only be one of the enum values"
        },
      },
    },
  }
  const collections = await db.listCollections({name:"students"}).toArray()
  if(collections.length === 0){
    console.log("creating Students");
    db.createCollection("students",{validator})
  }else{
    console.log("Updating Students");
    db.command({
      collMod:"students",
      validator
    })
  }
}

module.exports = {
  updateSchema
}