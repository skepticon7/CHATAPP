import React from 'react'
import SideBar from './sidebar';
import ChatBar from './ChatBar';

function chat() {
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