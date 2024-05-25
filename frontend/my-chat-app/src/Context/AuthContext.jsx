import {React  , useContext , createContext, useState} from 'react';

export const AuthContext = createContext();

export const UseAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const [AuthUser , setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    const [Messages , SetMessages] = useState([]);
    return <AuthContext.Provider value={{AuthUser , setAuthUser , Messages , SetMessages}}>{children}</AuthContext.Provider>;
}