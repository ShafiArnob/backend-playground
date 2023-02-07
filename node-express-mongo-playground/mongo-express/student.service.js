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
  const db = await getDb()
  const collection = db.collection("students")
}
const deleteStudentById = async(id) => {
  const db = await getDb()
  const collection = db.collection("students")

}
//export
module.exports = {insertStudent, searchStudent, getStudentById}