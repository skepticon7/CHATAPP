import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import UseConversations from "../zustand/UseConversations";
import notif from "../assets/pop.mp3";
import ChangeToDelivered  from "./ChangeToDelivered";
import {toast} from "react-hot-toast";
const ListenSocketMsg = ()=>{
    const {socket , onlineUsers} = UseSocketContext();
    const {toDelivered} = ChangeToDelivered();
    const {conversation , setConversation} = UseConversations();
    const {Messages , SetMessages , SelectedConversation} = UseConversations();
    const isOnline = onlineUsers.includes(SelectedConversation?._id);
    useEffect( ()=>{
        socket?.on("newMessage",(newMessage)=>{
            
            const sound = new Audio(notif);
			sound.play();
            SetMessages([...Messages , newMessage]);
            
        });

        return () => socket?.off("newMessage");
    },[Messages , SetMessages , socket , setConversation , conversation]);

}

export default ListenSocketMsg;