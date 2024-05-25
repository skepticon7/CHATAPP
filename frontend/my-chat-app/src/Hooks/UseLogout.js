import { useState } from "react";
import { UseAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import UseConversations from "../zustand/UseConversations";

const LogoutHook = () =>{
    

    const [loading , setLoading] = useState(false);
    const {setAuthUser} = UseAuthContext();
   const {SetSelectedConversation , setConversation , SetMessages} = UseConversations();
    const logout = async ()=>{
        
        
        try {
            
            setLoading(true);
            const res = await fetch("/api/logout" , {
                method:"POST"
            });
            console.log("arrived here" + res);
            const data = await res.json();
            console.log("data"+data);
            if(data.error){
                console.log(data.error);
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user"); 
            SetSelectedConversation(null); 
            setAuthUser(null);
        } catch (error) {
                toast.error(error.message);
        }finally {
                setLoading(false);
        }
    }
    return {loading , logout};
}

export default LogoutHook;    