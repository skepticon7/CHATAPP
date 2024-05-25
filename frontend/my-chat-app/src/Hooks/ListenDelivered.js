import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import {toast} from "react-hot-toast";
import ChangeToDelivered from "./ChangeToDelivered";
import { UseAuthContext } from "../Context/AuthContext";
import UseConversations from "../zustand/UseConversations";

const ListenDelivered = ()=>{
    const {socket , onlineUsers} = UseSocketContext();
    const {Messages} = UseConversations();
    const {AuthUser} = UseAuthContext;

    const {toDelivered} = ChangeToDelivered();
        useEffect( ()=>{
        socket?.on("delivered",async ()=>{
            toast.error("hehehe");
            await toDelivered(AuthUser.id);
            
        });

        return () => socket?.off("delivered");
    },[Messages]);

}

export default ListenDelivered;