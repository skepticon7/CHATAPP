import { useState } from "react"
import toast from "react-hot-toast";
import { UseAuthContext } from "../Context/AuthContext";
import UseGetConversations from "./GetUserHook";
import UseConversations from "../zustand/UseConversations";

const UseLogin = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = UseAuthContext();
    
    const login = async ({username , password}) => {
        
        try {
            setLoading(true);
            const success = handleErrors({username , password});
            if(!success) return;
            const res = await fetch("/api/login" , {
                method:"POST",
                headers:{"content-type" : "application/json"},
                body:JSON.stringify({username ,password})
            })
        const data = await res.json();
    
        if(data.error){
            throw new Error(data.error);
        }

        toast.success("successfully logged in");
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    return {loading , login};
}

function handleErrors({username , password}){
    if(!username || !password){
        toast.error("please fill in the fields");
        return false;
    } 
    return true;
}

export default UseLogin;
