import React, { useState } from 'react'
import NavbarLogin from "../Controllers/OpenClose";

function navbar() {
    
    return (
      <div className='purple-background' id='navbar-container'>
          <div className='container'>
           <div className='Navbar-container'>
                <div className='logo'>
                    <h1 className='white-text poppins-black'>Chatify</h1>
                </div>
                <div className='Navitems'>
                    <a className='Nav-a white-text poppins-bold' href="">Home</a>
                    <a className='Nav-a white-text poppins-bold'  href="">Contact</a>
                    <a className='Nav-a white-text poppins-bold'  href="">About</a>
                  <button className='btn-nav poppins-bold' id="LoginBtn" onClick={NavbarLogin}>Login</button>
                </div>
            </div>
          </div>
      </div>
    )
  }
 


export default navbar;