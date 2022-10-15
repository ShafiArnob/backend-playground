const writeToFile = require("../utils/write-to-file");

module.exports = (req, res) =>{
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/')+1)
  let id = req.url.split("/")[3]
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  //uuid not valid  
  if(!regexV4.test(id)){
    res.writeHead(400,{"Content-Type":"application/json"})
    res.end(JSON.stringify({"title":"Validation Failed","message":"UUID is not valid"}))
  }
  //valid uuid and url
  else if( baseUrl==="/api/movies/" && regexV4.test(id)){
    const index = req.movies.findIndex((movie)=>{
      return movie.id === id
    })
    if(index === -1){
      res.statuscode = 404
      res.write(JSON.stringify({"title":"Not Found","message":"Movie Not Found"}))
      res.end()
    }
    else{
      req.movies.splice(index,1)
      writeToFile(req.movies)
      res.writeHead(400,{"Content-Type":"application/json"})
      res.end(JSON.stringify(req.movies))
    }
  }
}