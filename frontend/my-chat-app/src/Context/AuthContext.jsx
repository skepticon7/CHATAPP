import {React  , useContext , createContext, useState} from 'react';

export const AuthContext = createContext();

export const UseAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const [AuthUser , setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    return <AuthContext.Provider value={{AuthUser , setAuthUser}}>{children}</AuthContext.Provider>;
}