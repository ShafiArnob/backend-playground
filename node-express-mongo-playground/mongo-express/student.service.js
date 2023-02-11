// const {getDb, getCollections} = require('./mongo')
const {ObjectId} = require("mongodb")
const {Student} = require("./student.model")
//CRUD methods
const insertStudent = async (document) => {
  try{
    const result = await Student.insertOne(document)
    return result
  }catch(error){
    if(error.code==121){
      const err = error.errInfo.details.schemaRulesNotSatisfied.find(
        (x) => x.operatorName === "properties"
      ).propertiesNotSatisfied
      
      console.log(JSON.stringify(err))

      const reasons = err.map((e) => {
        return {
          property: e.propertyName,
          errors: e.details.map(d=>d.reason)
        }
      })
      return new Error(JSON.stringify(reasons))
    }
    return error
  }
}
const searchStudent = async (searchObject) => {
  try{
    const result = await Student.find(searchObject).toArray()
    return result
  }catch(error){
    console.log(error)
    return error
  }
}
const getStudentById = async(id) => {
  try{
    const student = await Student.findOne({_id:new ObjectId(id)})
    return student
  }catch(error){
    console.error(error)
    return error
  }
}
const updateStudent = async(id, document) => {
  try{
    const updatedDoc = await Student.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...document } }
    );
    return updatedDoc;
  }
  catch(error){
    console.error(error)
    return error
  }
}
const deleteStudentById = async(id) => {
  try{
    const deleted = await Student.deleteOne({_id: new ObjectId(id),});
  return deleted;
  }catch(error){
    console.error(error)
    return error 
  }

}

//export
module.exports = {
  insertStudent,
  searchStudent,
  getStudentById,
  updateStudent,
  deleteStudentById
}