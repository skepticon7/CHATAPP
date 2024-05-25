import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext";
import UseConversations from "../zustand/UseConversations";

const toSeen = ()=>{
    const {socket} = UseSocketContext();
    const {Messages , SetMessages , SetSelectedConversation} = UseConversations();
    useEffect(()=>{
        socket?.on("MessageSeen" , (cnv)=>{
            SetMessages(cnv);
        })
        return ()=>socket?.off("MessageSeen");
    },[socket , SetMessages , Messages , SetSelectedConversation]);
}
export default toSeen;