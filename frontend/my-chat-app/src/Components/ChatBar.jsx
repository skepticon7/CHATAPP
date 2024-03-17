import React from 'react'
import UserFriend from "./UserFriend";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import UseConversations from '../zustand/UseConversations';
function ChatBar() {
  const {SelectedConversation} = UseConversations();
  return (
    <>
      {SelectedConversation ?  <div className='chat-wrapper'>
          <UserFriend/>
          <div className='chat-container white-background'>
            <Messages/>
          </div>
          <SendMessage/>
      </div> 
      :null
      }
     
      
        
    </>
  )
}

export default ChatBar;