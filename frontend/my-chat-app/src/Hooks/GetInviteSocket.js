import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import UseConversations from "../zustand/UseConversations";
import {toast} from "react-hot-toast";
const ListenSocketInvite = ()=>{
    const {socket} = UseSocketContext();

    const {invites , setInvites} = UseConversations();
  
    useEffect( ()=>{
        socket?.on("newInvite",(NewInvite)=>{
            console.log(NewInvite);
            const msg = NewInvite + " Has sent you an invite";
            toast(msg, {
                icon: '💁🏽',
              });
        });
        return () => socket?.off("newInvite");
    },[invites , setInvites , socket])

}

export default ListenSocketInvite;