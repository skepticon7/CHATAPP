import React, { useState } from 'react'
import UserIcon from "../assets/user.png";
import Lock from "../assets/lock.png";
import MaleIcon from "../assets/man.png";
import FemaleIcon from "../assets/woman.png";
import CloseIcon from "../assets/close.png";
import UseSignup from '../Hooks/SignUpHook';

function Signup() {
    const [inputs , setInputs] = useState({
        fullname : "",
        username:"",
        password :"",
        confirmedPassword :"",
        gender:""
    });
    
    const [GenButton , setGenBtn] = useState(true);
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
      
    <form onSubmit={HandleSignupSubmit} className='test ' id="signup-container">   
            <div className='login-container white-background' >
                <h2 className='purple-text poppins-extrabold login-text'>Signup</h2>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold'>Full name</label>
                    <input type="text" value={inputs.fullname}  onChange={(e)=>setInputs({...inputs , fullname :e.target.value})} className='input-field' autoComplete='off'/>
                    <img src={UserIcon} alt="person" className='UserIcon' />

                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold'>Username</label>
                    <input type="text" value={inputs.username}  onChange={(e)=>setInputs({...inputs , username :e.target.value})} className='input-field' autoComplete='off'/>
                    <img src={UserIcon} alt="person" className='UserIcon' />

                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold' >Password</label>
                    <input type="password"  value={inputs.password}  onChange={(e)=>setInputs({...inputs , password :e.target.value})} className='input-field' autoComplete='off'/>
                    <img src={Lock} alt="person" className='LockIcon' />
                </div>
                <div className='input-container'>
                    <label className='input-label purple-text poppins-bold' >Confirmed Password</label>
                    <input type="password"  value={inputs.confirmedPassword} onChange={(e)=>setInputs({...inputs , confirmedPassword :e.target.value})} className='input-field' autoComplete='off'/>
                    <img src={Lock} alt="person" className='LockIcon' />
                </div>
                <div className='gender'>
                    <button className='GenderIcon'  style={{backgroundColor : GenButton===true ? "#864AF9" : "transparent"}} onClick={handleGenderButton} > <img src={MaleIcon} alt="MaleIcon" /></button>
                    <button className='GenderIcon' style={{backgroundColor : GenButton===false ? "#864AF9" : "transparent"}}   onClick={handleGenderButton} > <img src={FemaleIcon} alt="FemaleIcon" /></button>
                </div>
                <button type='submit' className='btn-login poppins-bold white-text purple-background'>Signup</button>
                <p className='poppins-bold black-test'>You have an account already ? <a className='poppins-bold purple-text hover-effect' href="#" >Login</a></p>
            </div>
    </form>

  )
}

export default Signup;