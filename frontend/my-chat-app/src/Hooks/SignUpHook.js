import { useState } from "react"
import toast from "react-hot-toast";
const UseSignup  = () =>{
    const [loading , setLoading] = useState();
    const signup = async ({fullname , username , password , confirmedPassword , gender})=>{
        const SuccessFailure = handleErrors({fullname , username , password , confirmedPassword , gender});
        if(!SuccessFailure) return;

        try {
            setLoading(true);
            const res = await fetch("/api/signup" , {
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({fullname,username , password , confirmedPassword, gender})
            })
            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error);
            }
            toast.success("Successfully registered");
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading , signup};
}

function handleErrors({fullname , username , password , confirmedPassword , gender}) {
    if(password !=confirmedPassword){
        toast.error("Passwords do not match");
        return false;
    }
    if(!username || !password || !confirmedPassword || !gender || !fullname){
        toast.error("Please fill in the fields");
        return false;
    }
    if(password.length <6){
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}

export default UseSignup;