import { createClient } from "redis";
const client = createClient();


var i = 0;
async function startServer(){
    await client.connect();
    console.log("connect to client");
    

    while(true){
        
        const submission = await client.brPop("problems", 0);

        await processsubmmion(submission.element);

        console.log(`finished processing the item ${i++}`);
        
    }
}

async function processsubmmion(submission : string){
    
    const {problemId , code , language } = JSON.parse(submission);

    console.log(problemId);
    console.log(code);
    console.log(language);

    // fake the submmit delay 
    await new Promise(resolve => setTimeout(resolve , 2000)); // 1 sec delay
}


startServer();