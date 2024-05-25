
import {  useState } from "react";
import UseConversations from "../zustand/UseConversations";
import toast from "react-hot-toast";
const UserSendMessages = ()=>{
    const {SelectedConversation , Messages , SetMessages} = UseConversations();
    const [loading , setLoading] = useState(false);
    const SendMSG = async (MSG)=>{
        const SuccessFailureMessage = HandleSMErrors(MSG);
        if(!SuccessFailureMessage) return; 
        try {
       
            const ReceiverId = SelectedConversation._id;
            const message = MSG;
            setLoading(true);
            const res= await fetch("/api/SendMessages",{
                method: "POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({message,ReceiverId})
            });
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            SetMessages([...Messages,data.NewMsg]);
        } catch (error) {
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    return {loading,SendMSG};
    
}

const HandleSMErrors =  (MSG) =>{
    if(!MSG)  {
        toast.error("Please write a message before sending");
        return false;
    }
    if(MSG.length>150){
        toast.error("please do no exceed 150 caracters");
        return false;
    }
    return true;
} 
export default  UserSendMessages;

