import { useEffect, useState } from "react"

export function Sender() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);
    useEffect(() => {
        const so = new WebSocket("ws://localhost:8080");
        setSocket(so);
        // so now here we send the message when the socket it open 
        if (!socket) {
            alert("unable to connect to socket got some error");
            return;
        }
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "sender"
            }))
        }

    },[]);

    const intiateConn = async() => {
        // so now for the case we have to create the pc connect 
        const p = new RTCPeerConnection();
        setPc(p);
        if (!socket) {
            alert("no socket is found");
            return;
        }
        if (!pc) {
            alert("rtc connection error");
            return;
        }
        socket.onmessage = async (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'createAnswer') {
                    pc?.setRemoteDescription(message.sdp);
                } else if (message.type === 'iceCandidate') {
                    pc?.addIceCandidate(message.candidate);
                }
            } catch (e) {
                console.error(e);
            }
        }

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.send(JSON.stringify({
                type:"createOffer",
                sdp: pc.localDescription
            })); // pc.locadescpriton contains the offer 
        }

        pc.onicecandidate = (event) =>{
            if(event.candidate){
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        };


        // get camerStream and send
        getcamerStreamSend(pc);
    }

    const getcamerStreamSend = async(pc : RTCPeerConnection) => {
        const track = await navigator.mediaDevices.getUserMedia({video : true})
        pc.addTrack(track.getVideoTracks()[0]);
    }

    return (
        <div>
            <button onClick={intiateConn}>start video</button>
        </div>
    )
}