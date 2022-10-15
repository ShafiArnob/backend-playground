module.exports = (req, res) =>{
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/')+1)
  let id = req.url.split("/")[3]
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  //get all the movie data
  if(req.url==="/api/movies"){
    res.statusCode = 200
    res.setHeader("Content-Type","application/json")
    res.write(JSON.stringify(req.movies))
    res.end()
  }
  //single movie data
  //if the uuid is valid
  else if( baseUrl==="/api/movies/" && regexV4.test(id)){
    res.setHeader("Content-Type","application/json")
    let filteredMovie = req.movies.filter((movie)=>{
      return movie.id === id
    })
    //if the movie is found
    if(filteredMovie.length>0){
      res.statusCode = 200
      res.write(JSON.stringify(filteredMovie))
    }
    //if the movie is not found
    else{
      res.statusCode = 404
      res.write(JSON.stringify({"title":"Not Found","message":"Movie Not Found"}))
    }
    res.end()
  }
  //if the uuid is not valid
  else if(!regexV4.test(id)){
    res.writeHead(400,{"Content-Type":"application/json"})
    res.end(JSON.stringify({"title":"Validation Failed","message":"UUID is not valid"}))
  }
  else{
    res.writeHead(404,{"Content-Type":"application/json"})
    res.end(JSON.stringify({"title":"Not Found","message":"Route Not Found"}))
  }
}