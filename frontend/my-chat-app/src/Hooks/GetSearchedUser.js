import {toast} from "react-hot-toast"; 
import UseConversations from "../zustand/UseConversations";
const GetSearchedUser = ()=>{
    const {searched , setSearched} = UseConversations();
    const search = async (username) =>{
        const input = HandleInput(username);
        if(!input) return;
        try {
            const query = new URLSearchParams({searchedUser:username});
            const URL = "/api/searchUser?"+query;
            const res = await fetch(URL);
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            if(data.length===0) toast.error("user not found");
            setSearched(data);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return search;
}
const HandleInput = (username) =>{
    if(!username) {
        toast.error("Please search for a user");
        return false;
    }
    return true;
}
export default GetSearchedUser;