import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import {toast} from "react-hot-toast";
const ListenAcceptance = ()=>{
    const {socket} = UseSocketContext();
    useEffect( ()=>{
        socket?.on("inviteAccepted",(msg)=>{
            toast.success(msg);
        });

        return () => socket?.off("inviteAccepted");
    },[socket])

}

export default ListenAcceptance;