import React, { useEffect, useState } from 'react'
import SideBar from './sidebar';
import ChatBar from './ChatBar';
import ListenAcceptance from '../Hooks/SocketAcceptance';
import ListenRejection from '../Hooks/SocketRejection';
import ListenSocketInvite from "../Hooks/GetInviteSocket";
import DisplayInvites from "../Hooks/DisplayInviteSocket";
import ListenSearched from '../Hooks/SocketSearchedUser';
import ListenNewUsers from '../Hooks/UsersSocket';
// import toZeroSocket from '../Hooks/toZeroSocket';
import ListenUnseen from '../Hooks/ListenUnseen';
import toSeen from '../Hooks/seenSocket';
function chat() {
  
  
  ListenAcceptance();
  ListenRejection();
  ListenSocketInvite();
  DisplayInvites();
  ListenSearched();
  ListenNewUsers();
  ListenUnseen();
  // toZeroSocket();
  toSeen();


  return ( 
    
    <>
     <div className='app-container'  >
        <SideBar/>
        <ChatBar/>
    </div>  

     
   
   
   
    

    </>
  )
}

export default chat