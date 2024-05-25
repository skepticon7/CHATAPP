import React, { useState } from 'react'
import UserIcon from "../assets/user.png";
import Lock from "../assets/lock.png";
import MaleIcon from "../assets/man.png";
import FemaleIcon from "../assets/woman.png";
import CloseIcon from "../assets/close.png";
import UseSignup from '../Hooks/SignUpHook';
import {Link} from "react-router-dom"
function Signup() {
    const [inputs , setInputs] = useState({
        fullname : "",
        username:"",
        password :"",
        confirmedPassword :"",
        gender:""
    });
    
    const [GenButton , setGenBtn] = useState(null);
    const handleGenderButton = (e) => {
            e.preventDefault();
            
            if(!GenButton){
            
                setInputs({...inputs,gender:"male"});
            }else {
                
                setInputs({...inputs,gender:"female"});
            }
            setGenBtn(!GenButton);
            
    }
    

    const HandleSignupSubmit=async  (e)=>{
        e.preventDefault();
        await signup(inputs);
        console.log(inputs);
    }   

    const {loading , signup} = UseSignup();
  return (
      
    <form onSubmit={HandleSignupSubmit} className='bg-black flex items-center justify-center h-screen ' id="signup-container">   
            <div className='flex-col items-center justify-center rounded-3xl py-4 px-9 white-background space-y-7' >
                <h2 className='purple-text poppins-extrabold text-3xl text-center'>Signup</h2>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold '>Full name</label>
                    <input type="text" value={inputs.fullname}  onChange={(e)=>setInputs({...inputs , fullname :e.target.value})} className='white-background purple-border w-full border-3  p-4 rounded-md poppins-bold purple-text' autoComplete='off'/>
                    <img src={UserIcon} alt="person" className='w-5 absolute bottom-5 right-2.5' />

                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold'>Username</label>
                    <input type="text" value={inputs.username}  onChange={(e)=>setInputs({...inputs , username :e.target.value})} className='white-background purple-border w-full border-3  p-4 rounded-md poppins-bold purple-text' autoComplete='off'/>
                    <img src={UserIcon} alt="person" className='w-5 absolute bottom-5 right-2.5' />

                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold' >Password</label>
                    <input type="password"  value={inputs.password}  onChange={(e)=>setInputs({...inputs , password :e.target.value})} className='white-background purple-border w-full border-3  p-4 rounded-md poppins-bold purple-text' autoComplete='off'/>
                    <img src={Lock} alt="person" className='w-6 absolute bottom-5 right-2.5' />
                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold' >Confirmed Password</label>
                    <input type="password"  value={inputs.confirmedPassword} onChange={(e)=>setInputs({...inputs , confirmedPassword :e.target.value})} className='white-background purple-border w-full border-3  p-4 rounded-md poppins-bold purple-text' autoComplete='off'/>
                    <img src={Lock} alt="person" className='w-6 absolute bottom-5 right-2.5' />
                </div>
                <div className='flex justify-between'>
                    <button className='GenderIcon w-6'  style={{backgroundColor : GenButton===true ? "#864AF9" : "transparent"}} onClick={handleGenderButton} > <img src={MaleIcon} alt="MaleIcon" /></button>
                    <button className='GenderIcon' style={{backgroundColor : GenButton===false ? "#864AF9" : "transparent"}}   onClick={handleGenderButton} > <img src={FemaleIcon} alt="FemaleIcon" /></button>
                </div>
                <button type='submit' className='btn-login poppins-bold text-white w-full purple-background'>{loading ? <span className="loading loading-spinner loading-sm purple-background"></span>  : "Signup"}</button>
                <p className='poppins-bold black-text'>You have an account already ? <Link to="/Login" className='poppins-bold purple-text hover-effect' href="#" >Login</Link></p>
            </div>
    </form>

  )
}

export default Signup;