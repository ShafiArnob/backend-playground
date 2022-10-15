const crypto = require('crypto')
const requestBodyParser = require('../utils/body-parser')
const writeToFile = require('../utils/write-to-file')

module.exports = async (req, res) =>{
  if(req.url === "/api/movies"){
    try{
      let body = await requestBodyParser(req) 
      body.id = crypto.randomUUID()
      // console.log(body);
      req.movies.push(body)
      writeToFile(req.movies)
      res.writeHead(201,{"Content-Type":"application/json"})
      res.end(JSON.stringify({"title":"Success","message":"Data Added"}))
    }
    catch(err){
      res.writeHead(400,{"Content-Type":"application/json"})
      res.end(JSON.stringify({"title":"Validation Failed","message":"Request Body not Valid"}))
    }
  }
  else{
    res.writeHead(404,{"Content-Type":"application/json"})
    res.end(JSON.stringify({"title":"Not Found","message":"Route Not Found"}))
  }
}