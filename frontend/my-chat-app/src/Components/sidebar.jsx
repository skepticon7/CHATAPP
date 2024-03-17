import React, { useEffect } from 'react'
import SearchBar from "./SearchBar"
import Friends from "./Friends";
import Logout from "./Logout";
import UseConversations from '../zustand/UseConversations';
function sidebar() {
  const {SelectedConversation , SetSelectedConversation} = UseConversations();

  useEffect(()=>{


  },[])
  return (
    <>
    {!SelectedConversation ?       <div className='white-background SideBar-container' style={{borderRight:"0px", borderRadius:"25px"}}>
        <SearchBar/>
        <Friends/>
        <Logout/>
      </div> : 
        <div className='white-background SideBar-container' style={{animation:"slideIn1 0.7s ease-in" }}>
        <SearchBar/>
        <Friends/>
        <Logout/>
      </div> 
      }




    </>
  )
}

export default sidebar;