import React, { useState } from 'react';
import UserIcon from "../assets/user.png";
import Lock from "../assets/lock.png";
import UseLogin  from '../Hooks/LoginHook';

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
    <form onSubmit={HandleLoginSubmit} className='test' id="login-container">   
            <div className='login-container white-background ' >
                
                
                <h2 className='purple-text poppins-extrabold login-text'>Login</h2>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold'>Username</label>
                    <input type="text" value={Inputs.username} onChange={(e)=>setInput({...Inputs , username:e.target.value})} className='input-field'autoComplete='off'/>
                    <img src={UserIcon} alt="person" className='UserIcon' />
                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold' >Password</label>
                    <input type="password" value={Inputs.password} onChange={(e)=>setInput({...Inputs , password:e.target.value})}  className='input-field' autoComplete='off'/>
                    <img src={Lock} alt="person" className='LockIcon' />
                </div>
                <button type='submit' className='btn-login poppins-bold white-text purple-background'>Login</button>
                <p className='poppins-bold black-test'>You don't have an account ? <a className='poppins-bold purple-text hover-effect' href="#" >Signup</a></p>
            </div>
      
    </form>
    
   
  )
}

export default Login