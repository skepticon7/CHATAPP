import React, { useEffect, useRef, useState } from 'react'
import ManImage from "../assets/man1.png";
// import UserGetConversations from '../Hooks/GetMessagesHook';
import UserGetMessages from '../Hooks/GetMessagesHook';
import UseConversations from '../zustand/UseConversations';
import ListenSocketMsg from '../Hooks/ListenSocketMessage';
import { UseSocketContext } from '../Context/SocketContext';
import NoMessage from '../Components/NoMessages';
import { UseAuthContext } from '../Context/AuthContext';
import {toast} from "react-hot-toast";
import toZeroSocket from '../Hooks/toZeroSocket';
 function Message() {

  const {socket} = UseSocketContext();
  const {Messages, SelectedConversation , ProfilePicture,SetMessages} =  UseConversations();
  const {loading} = UserGetMessages();
  const {AuthUser} = UseAuthContext();

  
  ListenSocketMsg();
  const MessageRef = useRef();
  const isLast = Messages.length > 0 && Messages[Messages.length - 1].senderId !== AuthUser.id; 

  useEffect(()=>{
    if(isLast) {
      socket.emit("ToBeSeen" , ({
        onlineUserId : AuthUser.id,
        selectedUserId :SelectedConversation._id
      })
      );
  }
      
  },[socket,Messages , SetMessages ]);

  useEffect(()=>{
    if(SelectedConversation){
      socket?.emit("toZero" , ({SenderId : AuthUser.id , ReceiverId : SelectedConversation._id}));
    }
  },[Messages , SetMessages , socket])

  useEffect(()=>{
      setTimeout(()=>{
        MessageRef.current?.scrollIntoView({behavior:"smooth"});
        
      },50);
  },[Messages , SelectedConversation]);
  
  toZeroSocket();
  return (
    <>
       {loading ? 
        
          <div className='flex items-center justify-center h-80'>
            <span className="loading loading-spinner loading-lg purple-background">Loading</span>
          </div>

       :Messages.length ===0  ?<NoMessage/> : Messages.map((message,i) => (
        
        <div key={i}  ref={MessageRef} className='message-container overflow-hidden'>
              <div key={message._id} className={`chat ${message.senderId === SelectedConversation?._id ? 'chat-start' : 'chat-end'} pt-2`}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full ">
                          <img alt="Avatar" src={message.senderId === SelectedConversation?._id ? ProfilePicture : AuthUser.profilePicture} />
                        </div>
                    </div>
                    <div className={`chat-bubble max-w-52 break-words ${message.senderId === SelectedConversation?._id ? 'bg-black text-white' : 'purple-background text-white'} poppins-medium `}>
                          {message.message}
                    </div>
                    <div className="chat-footer opacity-60 mt-1">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}  {message.senderId !== SelectedConversation?._id ? message.status : null}
                    </div>
              </div>
        </div>
      )) }    
      
    
      

    </>
   
    
    
  )
}

export default Message