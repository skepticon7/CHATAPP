import React from 'react'
import ManImage from "../assets/man1.png";
import UserGetConversations from '../Hooks/GetMessagesHook';
function Message() {
  

  return (
    <div className='message-container'>
        <div className='bubble-time'>
            <p className='white-text poppins-semibold purple-background bubble'>Hey whatup G ?  </p>
            <p className='time poppins-medium'>12:30</p>
        </div>
        <img src={ManImage} alt="ManImg" />
    </div>
    
  )
}

export default Message