import express, { json } from "express";
import { createClient } from "redis";


const app = express();
app.use(express.json());
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));


app.post("/submit" , async (req , res) => {
    const {problemId , code , language } = req.body;
    try{
        await client.lPush("problems" , JSON.stringify({problemId , code , language}));
        res.status(200).json({
            message : "added to the queue"
        })
    }catch(e){
        console.log("failded to push")
    }
})


async function connectToReddis() {
    await client.connect();
    console.log("connect to reddis");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}


connectToReddis();