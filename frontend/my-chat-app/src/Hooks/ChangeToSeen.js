import { useEffect, useState } from "react"
import {toast} from "react-hot-toast";
import UseConversations from "../zustand/UseConversations";
const ChangeToSeen = () =>{
    const [loading  , setLoading] = useState(false);
   
        const toSeen = async (ReceiverId)=>{
            
            setLoading(true);
            try {
                const res = await fetch("/api/UpdateToSeen", {
                    method:"PATCH",
                    headers:{"content-type" : "application/json"},
                    body: JSON.stringify({ReceiverId:ReceiverId})
                });
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                console.log(data);
            }catch(error) {
                toast.error(error.message);
            }finally {
                setLoading(false);
            }
        }
        return {toSeen , loading};

}

export default ChangeToSeen;