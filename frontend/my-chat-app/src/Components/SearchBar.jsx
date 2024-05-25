import React, { useEffect, useState } from 'react'
import scan from "../assets/scan.png";
import add from "../assets/add.png";
import UseGetConversations from '../Hooks/GetUserHook';
import Conversation from "./conversation";
import GetSearchedUser from '../Hooks/GetSearchedUser';
import SendInviteHook from '../Hooks/SendInviteHook';
import arrowback from "../assets/left.png";
import addinvite from "../assets/sendinvite.png";
import GetInvitesHook from '../Hooks/GetInvitesHook';
import pending from "../assets/pending.png";
import check from  "../assets/check.png";
import cross from  "../assets/cross.png";
import RejectInviteHook from '../Hooks/RejectInviteHook';
import {UseAuthContext} from "../Context/AuthContext";
import acceptInviteHook from '../Hooks/AcceptInviteHook';
import friend from "../assets/friend.png";
import UseConversations from '../zustand/UseConversations';

function SearchBarFriends() {
  const [query , setQuery]  = useState("");
  const [username , setUsername] = useState("");
  const [render , setRender] = useState("friends");
  const [photo , setPhoto] = useState(addinvite);
  const {searched , setSearched} = UseConversations();
  const invites = GetInvitesHook();
  const accept = acceptInviteHook();
  const reject = RejectInviteHook();

  const {AuthUser}= UseAuthContext();
  const handleReject= async(senderId , receiverId)=>{
     await reject(senderId , receiverId);
  }

  const handleAccept =async (senderId , receiverId)=>{
    await accept(senderId , receiverId);
  }

  const ChangeToInvite = ()=>{
    setRender("invite");
  }

  const ChangeToFriends = ()=>{
    setSearched(null);
    setRender("friends");
  }
  
  const {loading , conversation } = UseGetConversations();
  
  const [src , setSrc] = useState(null);
  const search = GetSearchedUser();
  const sendinv = SendInviteHook();
  
  const handleinvites = async()=>{
    const ReceiverId = searched.foundUser._id;
    console.log(ReceiverId);
    await sendinv({ReceiverId});
    setPhoto(pending);
  }
  const HandleSearch = async (e)=>{
    e.preventDefault();
    await search(username);
      // const res = await search(username);
      // setSrc(res);
      setUsername("");
      setPhoto(addinvite);
  }  
  
    const filter = conversation.filter((item)=>{
    return item.friendId.username.toLowerCase().includes(query.toLowerCase());
  })

  return (
    <>
      {render==="friends" ? 
            <>  
               <form className='SearchBar-container flex gap-4'>
                   <input className='search-field poppins-bold' type="text" placeholder='Search for friends' value={query} onChange={e=>setQuery(e.target.value)}/>
                   <img src={add} alt="AddUsers" onClick={ChangeToInvite}/>
               </form>

               <div className='Friends-container overflow-auto'>
               {
                   loading ? <div className='flex items-center h-72 justify-center'><span className="loading loading-spinner loading-md purple-background"></span></div>  : 
                 filter.map((conversation)=>(
                   <Conversation
                     key={conversation._id}
                     conversation ={conversation}
                   />
                 ))
                 }
             
                 </div> 
            </> 
      : 
      <>
      <form className='SearchBar-container'>
        <div className='invitations'>
          <img  src={arrowback} alt="arrowBack" onClick={ChangeToFriends}/>
          <input className='search-field poppins-bold' type="text" placeholder='Search for users' value={username} onChange={e=>setUsername(e.target.value)}/>
          <img src={scan} salt="scan" onClick={HandleSearch}/>   
        </div>  
      </form>
      {searched && searched.length!==0 ?  <div className='conversations flex  justify-between'>
          <div className="avatar flex gap-3">
            
            <div className="w-12 rounded-full">
            <img src={searched.foundUser.profilePicture} alt="Conv"/> 
            </div>
            <p className='poppins-bold text-black self-center'>{searched.foundUser.fullName}</p>
          </div>
         
          {!searched.bool ? 
              searched.invited ? <div className='w-7 '><img src={pending}  alt="pending"/></div> : 
            <div className='w-7'><img src={photo}  alt="" onClick={handleinvites}/></div> : <div className='w-7'><img src={friend}  alt=""/></div> }
      </div> : null}

      <div>
         
         
        {invites ? invites.map((invites)=>(
                <>
                 <h1 className='purple-text poppins-bold'>Friend Requests :</h1>
                <div className='conversations flex justify-between mt-3' key={invites._id}>
                 
                <div className="avatar flex gap-3">
                  <div className="w-12 rounded-full">
                  <img src={invites.senderId.profilePicture} alt="Conv"/> 
                  </div>
                  <p className='poppins-bold text-black self-center'>{invites.senderId.username}</p>
                </div>
                <div className='w-5 flex gap-2 ml-30'>
                  <img src={check} onClick={()=>handleAccept(invites.senderId._id,AuthUser.id)} alt="" />
                  <img src={cross} onClick={()=>handleReject(invites.senderId._id,AuthUser.id)} alt="" />
                 </div>
                
            </div>
            </>
        )) :null} 
      </div>
  </>
      }
              
 </> 
 )
}

export default SearchBarFriends;