import {toast} from "react-hot-toast"
import UseConversations from "../zustand/UseConversations"
const acceptInviteHook = ()=>{
    const {invites,removeInvite} = UseConversations();
    const accept = async(senderId , receiverId)=>{
        try {
            console.log("acceptence hook reached");
            console.log("sender : " + senderId);
            console.log("receiver : " + receiverId);
            const res = await fetch("/api/acceptInvite",{
                method:"DELETE",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({senderId})
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error); 
            toast.success(data.msg);
            console.log(invites);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return accept;
}
export default acceptInviteHook;