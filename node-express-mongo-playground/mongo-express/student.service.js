// const {getDb, getCollections} = require('./mongo')
const {ObjectId} = require("mongodb")
const {Student} = require("./student.model")
//CRUD methods
const insertStudent = async (document) => {
  const result = await Student.insertOne(document)
  return result
}
const searchStudent = async (searchObject) => {
  
  const result = await Student.find(searchObject).toArray()
  return result
}
const getStudentById = async(id) => {
  const student = await Student.findOne({_id:new ObjectId(id)})
  return student
}
const updateStudent = async(id, document) => {
  const updatedDoc = await Student.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...document } }
  );
  return updatedDoc;
}
const deleteStudentById = async(id) => {
  const deleted = await Student.deleteOne({_id: new ObjectId(id),});
  return deleted;

}

//export
module.exports = {
  insertStudent,
  searchStudent,
  getStudentById,
  updateStudent,
  deleteStudentById
}