import React from 'react'
import Conversation from "./conversation";
import UseGetConversations from '../Hooks/GetUserHook';
function  Friends() {
  const {loading , conversations} = UseGetConversations();
  
  
  return (
    
           <div className='Friends-container'>
              {
                conversations.map((conversation)=>(
                  <Conversation
                    key={conversation._id}
                    conversation ={conversation}
                  />
                ))
            }
              <hr/>
           </div> 
    
  )
}

export default Friends