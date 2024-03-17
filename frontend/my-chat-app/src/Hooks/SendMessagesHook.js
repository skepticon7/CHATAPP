
import {  useState } from "react";
import UseConversations from "../zustand/UseConversations";
import toast from "react-hot-toast";
const UserSendMessages = async ()=>{
    const [loading,setLoading] = useState(false);
    const {SelectedConversation} = UseConversations();
    
    const SendMSG = async (MSG)=>{
        console.log("sending reached");
        const SuccessFailureMessage = HandleSMErrors(MSG);
        if(!SuccessFailureMessage) return; 
        

        try {
            setLoading(true);
            const ReceiverId = SelectedConversation._id;
            const message = MSG;
            const res= await fetch("/api/SendMessages",{
                method: "POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({message,ReceiverId})
            });
            const data = await res.json();
            console.log(data);
            if(data.error) throw new Error(data.error);
            toast.success(data);
        } catch (error) {
            toast.error(error.message);
        }finally {
            setLoading(false)
        }
    }
    return {loading , SendMSG};
    
}

const HandleSMErrors =  (MSG) =>{
    if(!MSG)  {
        toast.error("Please write a message before sending");
        return false;
    }
    return true;

} 
export default  UserSendMessages;

