import React from 'react'
import UseConversations from '../zustand/UseConversations';
import { UseSocketContext } from '../Context/SocketContext';

function conversation({conversation}) {
  const {SelectedConversation , SetSelectedConversation ,  SetPP ,   } = UseConversations();

  const {onlineUsers} = UseSocketContext();
  const isOnline = onlineUsers.includes(conversation.friendId._id);
  const isSelected = SelectedConversation?._id === conversation.friendId._id;


  const SetSelect = async (conversation) => {
    SetSelectedConversation(conversation.friendId);
  }
  const SetPicture = (conversation)=>{
    if(conversation)
      SetPP(conversation.friendId.profilePicture);
  }



  
  return (

        <div className='conversations ' style={{backgroundColor : isSelected ? "#864AF9" : "" ,  borderRadius: isSelected? "5px" : "" ,  color: isSelected? "white" : "black"}} onClick={()=>{SetSelect(conversation) ;SetPicture(conversation);}}>

                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                  <div className="w-15 rounded-full">
                    <img src={conversation.friendId.profilePicture} alt="Conev" />
                 
                  </div>
                  
                </div>
           
                <p className='poppins-bold'>{conversation.friendId.username}</p> 
                <p className={`poppins-medium absolute right-10 ${!isSelected ? "purple-background text-white" : "white-background purple-text" }  rounded-3xl px-1.5`}>{conversation.unseenMessages===0 ? null : conversation.unseenMessages}</p>

        </div>

    
  )
}

export default conversation;