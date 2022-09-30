//get request
fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => console.log(data))

fetch("http://localhost:3000/companies")
.then(res => res.json())
.then(data => console.log(data))

