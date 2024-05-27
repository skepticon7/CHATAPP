import { useEffect, useState } from 'react';
import {Navigate , Route , Routes} from "react-router-dom";
import './App.css'
import Home from "./Components/home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Chat from "./Components/chat";
import {Toaster} from "react-hot-toast";
import {UseAuthContext} from "./Context/AuthContext";


function App() {

  const {AuthUser}= UseAuthContext();
  useEffect(()=>{
      const verify = async ()=> {
        const query = new URLSearchParams({UserId : AuthUser.id});
        const URL = "/api/verify?"+query;
        const res = await fetch(URL);
        const data = await res.json(); 
        if(data.error) {
          localStorage.removeItem("chat-user"); 
        }
      
      }
      verify();
  },[]);

  return (
    <div>
      <Routes>
            <Route path='/' element={AuthUser  ? <Navigate to="/Home"/> : <Home/>}/>
            <Route path='/Login' element={AuthUser  ? <Navigate to="/Home"/> : <Login/>}/>
            <Route path='/Signup' element={AuthUser   ? <Navigate to="/Home"/> : <Signup/>}/>
            <Route path='/Home' element={!AuthUser  ? <Navigate to="/Login"/> : <Chat/> }/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
