import { useEffect, useState } from "react"
import {toast} from "react-hot-toast";
import UseConversations from "../zustand/UseConversations";
const GetNotSeenNumber = ()=>{
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        const GetNotSeen = async (SenderId) =>{
            setLoading(true);
            try{
                
                const query = new URLSearchParams ({
                    ReceiverId : SenderId
                });
                const url = "/api/GetNotSeen?"+query;
                const res = await fetch(url);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                console.log(data);
                return data;
            }catch {
                toast.error(data.error);
            }finally {
                setLoading(false);
            }
        }
        GetNotSeen(SenderId);
    },[]);
    
   return {loading , notSeen};
}

export default GetNotSeenNumber;