import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext";
import UseConversations from "../zustand/UseConversations";

const toZeroSocket = ()=>{
    const {socket} = UseSocketContext();
    const {conversation , setConversation } = UseConversations();
    useEffect(()=>{
        socket?.on("toZeroSocket" , (cnv)=>{
            setConversation(cnv);
        })
        return ()=>socket?.off("toZeroSocket");
    },[conversation , socket  , setConversation ]);
}

export default toZeroSocket;