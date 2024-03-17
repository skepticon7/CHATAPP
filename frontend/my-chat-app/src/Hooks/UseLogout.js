import { useState } from "react";
import { UseAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const LogoutHook =async () =>{
    
    const [loading , setLoading] = useState(false);
    const {setAuthUser} = UseAuthContext();
    console.log("Logout reached")
    const logout = async ()=>{
        
        
        try {
            setLoading(true);
            const res = await fetch("/api/logout" , {
                method:"POST",
                headers :{"content-type ": "application/json"}
            });
            const data = await res.json();
            console.log(res);
            console.log(data);
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
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