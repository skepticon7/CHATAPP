import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import {toast} from "react-hot-toast";
const ListenRejection = ()=>{
    const {socket} = UseSocketContext();
    useEffect( ()=>{
        socket?.on("inviteRejected",(msg)=>{
            toast.error(msg);
        });

        return () => socket?.off("inviteRejected");
    },[socket])

}

export default ListenRejection;