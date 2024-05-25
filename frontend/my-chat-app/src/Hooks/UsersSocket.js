import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import UseConversations from "../zustand/UseConversations";
const ListenNewUsers = ()=>{
    const {socket} = UseSocketContext();
    const {conversation , setConversation} = UseConversations();
    useEffect( ()=>{
        socket?.on("users",(data)=>{
            setConversation(data);
        });

        return () => socket?.off("users");
    },[setConversation,conversation,socket])

}

export default ListenNewUsers;