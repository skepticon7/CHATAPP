import React, { useState } from 'react';
import UserIcon from "../assets/user.png";
import Lock from "../assets/lock.png";
import UseLogin  from '../Hooks/LoginHook';
import {Link} from "react-router-dom"

function Login() {

  const [Inputs , setInput] = useState({
    username:"",
    password:""
  })

  const {loading , login} = UseLogin();

  const HandleLoginSubmit =async (e)=>{
    e.preventDefault();
    await login(Inputs);
  }

  return (
    <form onSubmit={HandleLoginSubmit} className=' bg-black flex items-center justify-center h-screen ' id="login-container">   
            <div className='flex-col items-center justify-center rounded-3xl p-5 white-background space-y-7 ' >
                
                
                <h2 className='purple-text poppins-extrabold text-3xl text-center'>Login</h2>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold '>Username</label>
                    <input type="text" value={Inputs.username} onChange={(e)=>setInput({...Inputs , username:e.target.value})} className= "white-background purple-border w-full border-3  p-4 rounded-md poppins-bold purple-text " autoComplete='off'/>
                    <img src={UserIcon} alt="person" className='w-5 absolute bottom-5 right-2.5' />
                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold' >Password</label>
                    <input type="password" value={Inputs.password} onChange={(e)=>setInput({...Inputs , password:e.target.value})}  className='white-background purple-border w-full border-3  p-4 rounded-md poppins-bold purple-text' autoComplete='off'/>
                    <img src={Lock} alt="person" className="w-6 absolute bottom-5 right-2.5" />
                </div>
                <button type='submit' className='btn-login w-full poppins-bold text-white purple-background'>{loading ? <span className="loading loading-spinner loading-sm purple-background"></span> : "Login"}</button>
                <p className='poppins-bold black-test text-black'>You don't have an account ? <Link to="/signup" className='poppins-bold purple-text hover-effect' href="#" >Signup</Link></p>
            </div>
      
    </form>
    
   
  )
}

export default Login