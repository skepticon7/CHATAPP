import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseConversations from "../zustand/UseConversations";


const UseGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const {conversation, setConversation} = UseConversations();
    
    useEffect(() => {
        const GetConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/getusers");
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                    
                }
                console.log("data :" + data);
                setConversation(data);
                
            } catch (error) {
                
                toast.error(error.message);
                
            } finally {
                setLoading(false);
            }
        }
        
        GetConversations();
        
    }, []);

   
    
    return { loading, conversation };
};

export default UseGetConversations;
