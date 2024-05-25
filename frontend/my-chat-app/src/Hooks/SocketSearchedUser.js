import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext"
import UseConversations from "../zustand/UseConversations";

const ListenSearched = ()=>{
    const {socket} = UseSocketContext();
    const {searched,setSearched} = UseConversations();
    useEffect( ()=>{
        socket?.on("searchedUser",(data)=>{
            console.log(data);
            setSearched(data);
        });

        return () => socket?.off("searchedUser");
    },[searched,setSearched,socket])

}

export default ListenSearched;