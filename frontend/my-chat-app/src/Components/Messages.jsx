import React from 'react'
import Message from "./Message";
import UserGetMessages from '../Hooks/GetMessagesHook';
import UseConversations from '../zustand/UseConversations';
 async function  Messages() {
  const {loading,Messages} = UseConversations();
  console.log(loading);
  return (
    <>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>

    </>

   
  )
}

export default Messages