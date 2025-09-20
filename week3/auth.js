const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  { 
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // so now here we have to write the logic whic return the true or false based on the data if we have user then 
  // so this is array of object in which username is present 
  var present = false;
  for(let i = 0; i < ALL_USERS.length; i++){
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
      present =  true;
    }
  }
  return present;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  console.log("Received Username:", username);  // Debugging line
  console.log("Received Password:", password);  // Debugging line

  if (!userExists(username, password)) {
    console.log("User not found or password incorrect!");  // Debugging line
    return res.status(403).json({
      msg: "User doesn't exist in our in-memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});


app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username

    res.json({
      users:ALL_USERS
    })
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)