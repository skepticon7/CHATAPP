import { useEffect, useState } from "react"
import {toast} from 'react-hot-toast'

const CheckCookie = ()=>{
    const [loading , setLoading] = useState(false);
    const [logged , setLogged] = useState(false);
    useEffect(()=>{
        const C_cookie = async ()=>{
            try {
                setLoading(true);
                const res = await fetch("/api/CookieCheck");
                const data = await res.json();
                if(data.error)
                    throw new Error(data.error);
                if(data.success)
                    return setLogged(true);
                return setLogged(false);
            } catch (error) {
                toast.error(error.message);
            }finally {
                setLoading(false);
            }
        }
        C_cookie();
        
    },[]);
    
    return {loading ,  logged}
}

export default CheckCookie;