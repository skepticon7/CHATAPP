import React, {  useState } from 'react'
import SendIcon from  "../assets/send.png"
import UserSendMessages from '../Hooks/SendMessagesHook';
function SendMessage() {
  const [MessageInput , SetMessageInput] = useState("");
  const {loading , SendMSG} = UserSendMessages();
  const HandleSetInput =async  (e)=>{
    SetMessageInput(e.target.value);
  }
  const HandleSubmitMessage = async ()=>{
    
    await SendMSG(MessageInput);
    console.log(MessageInput);
  }


  return (
          <div className='SendMessage-input'>
                <input type="text" placeholder='Send a message' onChange={HandleSetInput} value={MessageInput}/>
                <img src={SendIcon} alt="photosender" onClick={HandleSubmitMessage}/>
          </div>
  )
}

export default SendMessage