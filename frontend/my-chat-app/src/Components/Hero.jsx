import React  from 'react'
import ChattingPeople from "../assets/chattingPeople.png";
function Hero() {
  return(
    <div className='black-background' id='hero-container'>
        <div className='container'>
            <div className='hero-content'>
            <div className='HeroText'>
                    <h1 className='poppins-extrabold white-text'>Start Chatting with Friends, Anywhere,Anytime with Chatify</h1>
                    <p className='poppins-bold grey-text'>Your Gateway to Seamless Communication! Revolutionize the way you connect and collaborate with our intuitive messaging platform </p>
                    <button className='btn-startHere poppins-bold' >Start Chatting here</button>
                </div>
                <div className='HeroImg'>
                    <img src={ChattingPeople} alt="imgchat" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Hero