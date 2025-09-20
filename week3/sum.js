// so this will basically do the thing that is it will take the 2 number from the querry paramenter and return the sum 
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/" , function(req , res){
    const a = req.query.a;
    const b = req.query.b;
    const sum = parseInt(a) + parseInt(b);
    console.log(sum);

    // Convert the sum to a string when sending it as a response
    // if it is sent directly it will miss print as the status code here 
    res.send(`${sum}`);
});
app.get("/intrest" , function(req , res){
    const a = req.query.a;
    const b = req.query.b;
    const c = req.query.c;
    // so now the for the simple intrest 
    const si = (parseInt(a) * parseInt(b) * parseInt(c))/100;
    console.log(si);
    res.send(`${si}`);
})

app.listen(port);