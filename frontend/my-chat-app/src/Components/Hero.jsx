import React  from 'react'
import ChattingPeople from "../assets/chattingPeople.png";
import {Link} from "react-router-dom"
import Login from "./Login"
function Hero() {
  return(
    <div className='black-background flex items justify-center' id='hero-container'>
        <div className='mx-48 flex items-center justify-center gap-0'>
            {/* <div className='flex items-center justify-center gap-5 '> */}
                <div className='flex-col space-y-10   items-start '>
                    <h1 className='poppins-extrabold white-text text-3xl'>Start Chatting with Friends, Anywhere,Anytime with Chatify</h1>
                    <p className='poppins-bold grey-text text-sm'>Your Gateway to Seamless Communication! Revolutionize the way you connect and collaborate with our intuitive messaging platform </p>
                    {/* <Link to='/Login'> */}
                    <button className='btn-startHere poppins-bold w-full' >Start Chatting here</button>
                    {/* </Link> */}
                </div>
             
                    <img src={ChattingPeople} alt="imgchat" className='w-[800px] relative bottom-[-2.5%] right-[-10%]' />
               
            {/* </div> */}
        </div>
    </div>
  );
}

export default Hero