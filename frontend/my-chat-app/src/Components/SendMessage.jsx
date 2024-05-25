import React, {  useState } from 'react'
import SendIcon from  "../assets/send.png"
import UserSendMessages from '../Hooks/SendMessagesHook';
import UseConversations from '../zustand/UseConversations';
import ChangeToDelivered from '../Hooks/ChangeToDelivered';
function SendMessage() {
  const [MessageInput , SetMessageInput] = useState("");
  const {SelectedConversation} = UseConversations();


  const {loading,SendMSG} = UserSendMessages();
  const HandleSetInput =async  (e)=>{
    SetMessageInput(e.target.value);
  }

  const HandleSendMessages = async (e)=>{
    e.preventDefault();
    await SendMSG(MessageInput);
    SetMessageInput("");
  }



  return (
          <div className='SendMessage-input'>
       
                <input type="text" className='poppins-bold' placeholder='Send a message' onChange={HandleSetInput} value={MessageInput}/>
                {loading ? <span className="loading loading-spinner loading-md purple-background absolute top-3.5 right-9"></span> : <img src={SendIcon} alt="photosender" onClick={HandleSendMessages}/>}
                
             
          </div>
  )
}

export default SendMessage