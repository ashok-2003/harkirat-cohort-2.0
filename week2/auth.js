// so now here we will learn how to do authentication with the help of zod here 
const express = require("express");
const zod = require("zod");
const app = express();


// const intschema = zod.number();
const intschema = zod.string().min(10).max(15);


app.use(express.json());

app.post("/asd" , function(req , res){
    // so now here we will get the phone number 
    const phone = req.body.phone;
    const response = intschema.safeParse(phone);
    res.send({
        response  
        // sending this as json data here 
    })
});

app.listen(3000);