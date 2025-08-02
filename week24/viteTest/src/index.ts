import express from "express"
import { number, z } from "zod";

export const app = express();
app.use(express.json());

const sumInput = z.object({
    a : z.number(),
    b : z.number(),
})

app.post("/sum" , (req , res) => {
    const parsedInput = sumInput.safeParse(req.body);

    if(!parsedInput.success){
        res.status(411).json({
            message : "Incorrect Inputs"
        });
        return;
    }
    const answer = parsedInput.data.a + parsedInput.data.b
    res.status(200).json({
        answer
    })
})


app.get("/sum" , (req , res)=>{
    const parsedInput = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b : Number(req.headers["b"])
    })

    if (!parsedInput.success) {
        res.status(411).json({
            message : "invalid inputs"
        });
        return;
    }

    const answer = parsedInput.data.a + parsedInput.data.b;
    res.status(200).json({
        answer
    })
})