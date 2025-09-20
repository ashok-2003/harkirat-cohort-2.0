// so this will be our web scocket io code here 
import express from "express"
import WebSocket, { WebSocketServer } from "ws";
const app = express();
app.use(express.json());

const httpserver = app.listen(3001, () => {
    console.log("app is listening on port 3001")
});


app.get("/" , async(req , res) => {
    res.send("hi mf ")
})

const wss = new WebSocketServer({server:httpserver});

wss.on('connection' , function(socket){
    socket.on('error' , console.error)
    socket.on('message', function message(data , isBinary){
        wss.clients.forEach(function each (clients){
            if(clients.readyState === WebSocket.OPEN){
                clients.send(data , {binary:isBinary})
            }
        })
    })
    socket.send("helllo from the socket")
})


