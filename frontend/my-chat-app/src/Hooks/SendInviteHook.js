import {toast} from "react-hot-toast";
const SendInviteHook = ()=>{
    const sendinv = async (ReceiverId) =>{
        console.log("reached log");
        try {
            const res = await fetch("/api/sendInvites" , {
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(ReceiverId)
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            if(data.success ) toast.success(data.success);
            else toast.error(data.failure);
        } catch (error) {
            console.log("error"+error);
            toast.error(error.message);
        }
    }
    return sendinv;   
}

export default SendInviteHook;