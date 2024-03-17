import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UseGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const GetConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/getusers");
                const data = await res.json();
                console.log(data);
                if (data.error) {
                    throw new Error(data.error);
                }

                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        GetConversations();
        
    }, []);

   
    
    return { loading, conversations };
};

export default UseGetConversations;
