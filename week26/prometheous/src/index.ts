import express from "express";
import client from "prom-client"
import { requestCounter } from "./monitoring/requestCounter";
import { ActiveRequestGauge } from "./monitoring/activeRequest";
const app = express();

app.use(requestCounter);
app.use(ActiveRequestGauge)

app.get('/user' , (req , res) => {
    res.json({
        name : "ashok"
    })
})

app.get('/wait' , async(req , res) => {
    const promise = new Promise(resolve => setTimeout(resolve , 8000));
    await promise;
    res.json({
        name : "ashok gupta"
    })
})

app.get("/metrics" , async(req , res)=> {
    const metrics = await client.register.metrics();
    res.set('Content-Type' , client.register.contentType);
    res.end(metrics)
})

app.listen(3000 , ()=>{
    console.log("app is listening on 3000")
});