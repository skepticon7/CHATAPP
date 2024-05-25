import React, { useEffect } from 'react'
import logoutImg from "../assets/leave.png";
import LogoutHook from "../Hooks/UseLogout";
function Logout() {
  const {loading,logout} = LogoutHook();
  const HandleLogout = async ()=>{
    await logout();
  }
 


  return (
    <div>
      {loading ? <span className="loading loading-spinner loading-sm"></span>  : 
       <img className='logout-img' src={logoutImg} alt="Logout"  onClick={HandleLogout} />
      }
     

      </div>
  )
}

export default Logout