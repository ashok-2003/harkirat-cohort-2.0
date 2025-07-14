import { useEffect, useState } from "react";

export function Reciver() {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const so = new WebSocket("ws://localhost:8080");
        setSocket(so);
        if (!socket) {
            alert("unable to connect to socket got some error");
            return;
        }
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "reciver"  // this will update the reciver socket in the backend 
            }))
        }

        startReceiving(socket);
    },[]);  // if no dependecy array is provide then infinite loop 

    function startReceiving(socket: WebSocket){
        const video = document.createElement("video");
        document.body.appendChild(video);
        
        const pc = new RTCPeerConnection();
        pc.ontrack = (event) => {
            console.log(event);
            video.srcObject = new MediaStream([event.track]);
            video.play();
        }

        socket.onmessage = async(event) => {
            try{
                const message = await JSON.parse(event.data);
                if(message.type === 'createOffer'){
                    await pc.setRemoteDescription(message.sdp)
                    const asnwer = await pc.createAnswer();
                    await pc.setLocalDescription(asnwer);
                    socket.send(JSON.stringify({
                        type:'createAnswer',
                        sdp: pc.localDescription
                    }))
                }else if (message.type === 'iceCandidate'){
                    await pc.addIceCandidate(message.candidate);
                }
            }catch(e){
                console.error(e);
            }
        }
    }
    return (
        <div>
            hi from reciver
        </div>
    )
}