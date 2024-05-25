import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import UseConversations from "../zustand/UseConversations";
const DisplayInvites = ()=>{
    const {socket} = UseSocketContext();
    const {setInvites} = UseConversations();
    useEffect( ()=>{
        socket?.on("newInviteData",(data)=>{
            setInvites(data);
        });

        return () => socket?.off("newInviteData");
    },[socket])

}

export default DisplayInvites;