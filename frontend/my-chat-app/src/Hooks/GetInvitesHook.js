import { useEffect, useState } from "react"
import UseConversations from "../zustand/UseConversations";
import{toast} from "react-hot-toast";
import { UseSocketContext } from "../Context/SocketContext";
const GetInvitesHook = ()=>{
    const {invites , setInvites} = UseConversations();
    useEffect(()=>{
        const getinv = async ()=>{
            try {
                const res = await fetch("/api/getInvites");
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setInvites(data);
            } catch (error) {
                toast.error(error.message);
            }
        }
        getinv();
    },[]);

    return  invites;
}

export default GetInvitesHook;