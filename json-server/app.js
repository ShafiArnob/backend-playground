//get request
fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => console.log(data))

fetch("http://localhost:3000/companies")
.then(res => res.json())
.then(data => console.log(data))

const newData = {
  email: "khan@gmail.com",
  fname:"Khan"
}

// post 
/*
fetch('http://localhost:3000/users', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newData),
  })
  .then((response) => response.json())
  .then((data) => {console.log('Success:', data);})
  .catch((error) => {
    console.error('Error:', error);
  });
*/

//delete
