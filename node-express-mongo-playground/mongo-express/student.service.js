const {getDb} = require('./mongo')
const {ObjectId} = require("mongodb")
//CRUD methods
const insertStudent = async (document) => {
  const db = await getDb()
  const collection = db.collection("students")
  const result = await collection.insertOne(document)
  return result
}
const searchStudent = async (searchObject) => {
  const db = await getDb()
  const collection = db.collection("students")
  const result = await collection.find(searchObject).toArray()
  return result
}
const getStudentById = async(id) => {
  const db = await getDb()
  const collection = db.collection("students")
  const student = await collection.findOne({_id:new ObjectId(id)})
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