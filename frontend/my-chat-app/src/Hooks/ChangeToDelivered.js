import { useState } from "react"
import {toast} from "react-hot-toast";
const ChangeToDelivered =  () =>{
    const [loading  , setLoading] = useState();
    const toDelivered = async (ReceiverId)=>{
        setLoading(true);
        try {
            const res = await fetch("/api/UpdateToDelivered", {
                method:"PATCH",
                headers:{"content-type" : "application/json"},
                body: JSON.stringify({ReceiverId:ReceiverId})
            });
            const data = await res.json();
            if(data.error) throw new Error(data.error);
        }catch {
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    return {loading ,toDelivered}
}

export default ChangeToDelivered;