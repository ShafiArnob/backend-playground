const {getDb} = require('../../db/mongo')

const collectionName = "videos";

const getCollection = () => {
  console.log(`Get student collection`)
  const db = getDb()
  const collection = db.collection("students")
  // console.log(collection.s.options.validator)
  return collection
}

module.exports = {
  Student:getCollection(),
  name: collectionName,
}