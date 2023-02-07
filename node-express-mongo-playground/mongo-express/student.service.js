const {getDb, getCollections} = require('./mongo')
const {ObjectId} = require("mongodb")
//CRUD methods
const insertStudent = async (document) => {
  const result = await getCollections().Student.insertOne(document)
  return result
}
const searchStudent = async (searchObject) => {
  
  const result = await getCollections().Student.find(searchObject).toArray()
  return result
}
const getStudentById = async(id) => {
  const student = await getCollections().Student.findOne({_id:new ObjectId(id)})
  return student
}
const updateStudent = async(id, document) => {
  const updatedDoc = await getCollections().Student.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...document } }
  );
  return updatedDoc;
}
const deleteStudentById = async(id) => {
  const deleted = await getCollections().Student.deleteOne({_id: new ObjectId(id),});
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