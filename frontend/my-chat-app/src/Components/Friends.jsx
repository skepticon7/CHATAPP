import React, { useEffect } from 'react'
import Conversation from "./conversation";
import UseGetConversations from '../Hooks/GetUserHook';
// import GetNotSeenNumber from '../Hooks/GetNotSeenNumber';

function  Friends() {
  const {loading , conversation} = UseGetConversations();
  console.log("cnv ; "+conversation);
 
  return (
    
           <div className='Friends-container overflow-auto'>
              {
                loading ? <div className='flex items-center h-72 justify-center'><span className="loading loading-spinner loading-md purple-background"></span></div>  : 
                conversation.map((conversation)=>(
                  <Conversation
                    key={conversation._id}
                    conversation ={conversation.friendId}
                      
                  />
                ))
            }
            
           </div> 
    
  )
}

export default Friends