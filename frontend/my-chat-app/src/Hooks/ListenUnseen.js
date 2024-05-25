import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext";
import UseConversations from "../zustand/UseConversations";


const ListenUnseen = ()=>{
    const {socket} = UseSocketContext();
    const {conversation , setConversation , Messages } = UseConversations();
    useEffect(()=>{
        socket?.on("unseenMessages" , (unseen)=>{
        
            setConversation(unseen);
        })
        return ()=>socket?.off("unseenMessages");
    },[socket, conversation , setConversation]);
}

export default ListenUnseen;