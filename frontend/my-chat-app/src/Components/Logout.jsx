import React, { useEffect } from 'react'
import logoutImg from "../assets/leave.png";
import LogoutHook from "../Hooks/UseLogout";
function Logout() {
  const {loading,logout} = LogoutHook();
  console.log(loading);
  const HandleLogout = async ()=>{
    logout();
  }



  return (
    <div>
      <img className='logout-img' src={logoutImg} alt="Logout"  onClick={HandleLogout} />

      </div>
  )
}

export default Logout