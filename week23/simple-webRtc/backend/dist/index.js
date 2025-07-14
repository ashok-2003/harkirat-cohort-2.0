"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const port = 8080;
const wss = new ws_1.WebSocketServer({ port: port }, function out() {
    console.log("websocket is running on port 8080");
});
// so until the webRtc connection is made we are tying to send the data throught the websocket 
let senderSocket = null;
let reciverSocket = null; // intially two variable are nulls 
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        try {
            const message = JSON.parse(data);
            if (message.type === 'sender') {
                senderSocket = ws;
            }
            else if (message.type === 'reciver') {
                reciverSocket = ws;
            }
            else if (message.type === 'createOffer') {
                if (ws !== senderSocket) {
                    ws.send("only sender can createOffer");
                    return;
                }
                reciverSocket === null || reciverSocket === void 0 ? void 0 : reciverSocket.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
            }
            else if (message.type === 'createAnswer') {
                if (ws !== reciverSocket) {
                    ws.send("only reciver can create answer");
                    return;
                }
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
            }
            else {
                // no any differnt format is support so return;
            }
        }
        catch (e) {
            console.error(e);
            ws.send(`get the error may be json in not correct`);
        }
    });
});
