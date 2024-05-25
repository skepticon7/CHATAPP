import {toast} from 'react-hot-toast';
const ToZero = ()=>{
    const changeToZero = async (ReceiverId)=>{
        try {
            const res = await fetch("/api/changeToZero" , {
                method : "POST",
                headers:{"content-Type":"application/json"},
                body : JSON.stringify({ReceiverId})
            })
            const data = await res.json();
            
            if(data.error) throw new Error(data.error);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return {changeToZero};
}
export default ToZero;