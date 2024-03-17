import { useState } from "react"
import UseConversations from "../zustand/UseConversations";
import {toast} from "react-hot-toast";
import { useEffect } from "react";

const UserGetMessages =  async () => {
    const [loading,SetLoading] = useState(false);
    const {SelectedConversation , Messages,SetMessages} = UseConversations();

    
    useEffect(()=>{
        const GetMessages = async ()=>{
            SetLoading(true);
            try {
                const queries = new URLSearchParams ({friend:SelectedConversation._id});
                const url = "/api/GetMessages?"+queries;
                const res = await fetch(url);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                console.log(data);
                SetMessages(data);
            } catch (error) {
                    toast.error(error.message);
            }finally {
                SetLoading(false);
            }
        }
        if(SelectedConversation?._id) GetMessages();
    },[SelectedConversation._id])
    
    
    return {loading , Messages};
}

export default UserGetMessages; 