import React from 'react'
import man from "../assets/man1.png";
import UseConversations from '../zustand/UseConversations';

function conversation({conversation}) {
  const {SelectedConversation , SetSelectedConversation} = UseConversations();

  const isSelected = SelectedConversation?._id === conversation._id;
  const SetSelect = (conversation) => {
    SetSelectedConversation(conversation);
  }
  return (

        <div className='conversations ' style={{backgroundColor : isSelected ? "#864AF9" : "" ,  borderRadius: isSelected? "5px" : "" ,  color: isSelected? "white" : ""}} onClick={()=>SetSelect(conversation)}>
            <img src={conversation.profilePicture} alt="Conv" />
            <p className='poppins-bold'>{conversation.fullName}</p>
        </div>

    
  )
}

export default conversation