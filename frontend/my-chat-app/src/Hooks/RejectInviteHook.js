import UseConversations from "../zustand/UseConversations";
import {toast} from "react-hot-toast"
const RejectInviteHook = ()=>{
    const {invites,removeInvite} = UseConversations();
    const reject = async (senderId)=>{
        
        try {
        
            const res = await fetch("/api/rejectInvite",{
                method:"DELETE",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({senderId})
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success(data.msg);
        } catch (error) {
            toast.error(error.message);
        }
    }  
    return reject;
}
export default RejectInviteHook;