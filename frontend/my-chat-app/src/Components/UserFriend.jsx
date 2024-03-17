import React from 'react'
import UseConversations from '../zustand/UseConversations'

function UserFriend() {
  const {SelectedConversation , SetSelectedConversation} = UseConversations();
  return (
    <div className='towho-container purple-background'> 
      <p className='poppins-medium white-text'>To : <span className='white-text poppins-bold'>{SelectedConversation?.fullName}</span></p>
    </div>
  )
}

export default UserFriend