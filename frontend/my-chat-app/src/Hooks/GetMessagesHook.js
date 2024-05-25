import { useState } from "react"
import UseConversations from "../zustand/UseConversations";
import {toast} from "react-hot-toast";
import { useEffect } from "react";
import { UseSocketContext } from "../Context/SocketContext";
import { UseAuthContext } from "../Context/AuthContext";

const UserGetMessages = () => {
    const [loading,SetLoading] = useState(false);
    const {socket} = UseSocketContext();
    const {AuthUser} = UseAuthContext();
    const {SelectedConversation , Messages, SetMessages } = UseConversations();
    useEffect(()=>{
        const GetMessages =async ()=>{
            
            try {
             SetLoading(true);
           
              const queries = new URLSearchParams ({friend:SelectedConversation._id});
              const url = "/api/GetMessages?"+queries;
              const res = await fetch(url);
              const data = await res.json();
              if(data.error) throw new Error(data.error);
              SetMessages(data);
          } catch (error) {
              toast.error(error.message);
          }finally {
              SetLoading(false);
          }
        }
        if(SelectedConversation?._id) {
          
          socket?.emit("toZero" , ({SenderId : AuthUser.id , ReceiverId : SelectedConversation._id}));
          GetMessages();
        }
            
      },[ SelectedConversation?._id]);
      
    return {Messages , loading};
    
}



export default UserGetMessages; 