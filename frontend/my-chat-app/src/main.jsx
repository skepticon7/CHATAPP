import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SocketContextProvider } from './Context/SocketContext.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
           <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </>
)
