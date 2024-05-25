import React, { useState } from 'react'
import {Link} from "react-router-dom"

function navbar() {
    
    return (
      <div className='purple-background' >
          <div className="mx-48">
           <div className='flex justify-between items-center py-5'>
                <div className='logo'>
                    <h1 className='white-text poppins-black text-3xl'>Chatify</h1>
                </div>
                <div className='flex items-center justify-center gap-10'>
                    <a className=' text-lg white-text poppins-bold' href="">Home</a>
                    <a className=' text-lg white-text poppins-bold'  href="">Contact</a>
                    <a className=' text-lg white-text poppins-bold'  href="">About</a>
                    <Link to="/Login">
                      <button className='btn-nav poppins-bold' id="LoginBtn" >Login</button>
                    </Link>
                  
                </div>
            </div>
          </div>
      </div>
    )
  }
 


export default navbar;